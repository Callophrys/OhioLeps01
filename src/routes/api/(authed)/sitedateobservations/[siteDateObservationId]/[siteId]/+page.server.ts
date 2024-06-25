import { getSiteDateObservation, getSiteDateObservationBySiteDateObservation, getSiteDateObservationsBySiteDate, reviewSiteDateObservation, updateSiteDateObservation, deleteSiteDateObservation, nextOrLastSiteDateObservationByCommon, nextOrLastSiteDateObservationByLatin, prevOrFirstSiteDateObservationByLatin, createSiteDateObservation } from '$lib/database/sitedateobservations.js';
import { getSites } from '$lib/database/sites.js';
import { getSiteDates } from '$lib/database/sitedates.js';
import { isNullOrWhiteSpace } from '$lib/utils.js';
import type { SiteDateObservationChecklist, SiteCounty, SiteDateYear, ChecklistScientificName } from '$lib/types.js';
import type { Actions } from '@sveltejs/kit';
import { getChecklistsBySiteId, getChecklists } from '$lib/database/checklists.js';

// params: siteDateObservationId and siteId
export async function load({ params }: { params: any }) {
    console.log('.....', params);

    let siteId = Number(params.siteId);

    // need 3 lists of checklists
    // 1. all seen by this current siteDateObs
    // 2. all seen by the site of this siteDateObs
    // 3. all possible

    // Get current siteDateObs, list of sites, and list of siteDates
    const [siteDateObservation, sites, siteDates] = await Promise.all([getSiteDateObservationBySiteDateObservation(Number(params.siteDateObservationId)), getSites(null), getSiteDates(siteId)]);

    const jsonO = JSON.stringify(siteDateObservation);
    const jsonResultO: SiteDateObservationChecklist = JSON.parse(jsonO);

    const jsonS = JSON.stringify(sites);
    const jsonResultS: SiteCounty[] = JSON.parse(jsonS);

    const jsonD = JSON.stringify(siteDates);
    const jsonResultD: SiteDateYear[] = JSON.parse(jsonD);

    if (siteDateObservation?.siteDateId) {

		const [siteDateObservations, checklistsForSite, checklistsAll,] = await Promise.all([
			getSiteDateObservationsBySiteDate(siteDateObservation?.siteDateId),
			getChecklistsBySiteId(siteId),
			getChecklists()
		]);

        // 1. SiteDateObservations by current siteDate - this gets all checklist species for this siteDate
        const jsonC = JSON.stringify(siteDateObservations);
        const jsonResultC: SiteDateObservationChecklist[] = JSON.parse(jsonC);

        // 2. All checklists for site overall
        const jsonT = JSON.stringify(checklistsForSite);
        const jsonResultT: SiteDateObservationChecklist[] = JSON.parse(jsonT);

        // 3. All checklist items
        const jsonA = JSON.stringify(checklistsAll);
        const jsonResultA: SiteDateObservationChecklist[] = JSON.parse(jsonA);

        // console.log('sdo > ', siteDateObservation);
        // console.log('sdoS > ', siteDateObservations);

        return {
            siteDateObservation: jsonResultO,
            sites: jsonResultS,
            siteDates: jsonResultD,
            checklistsSiteDateObs: jsonResultC,
            checklistsSite: jsonResultT,
            checklistsAll: jsonResultA,
        };
    }

    return {
        siteDateObservation: jsonResultO,
        sites: jsonResultS,
        siteDates: jsonResultD,
        checklistsSiteDateObs: [],
        checklistsSite: [],
        checklistsAll: [],
    };
}

export const actions: Actions = {
    saveSiteDateObservation: async ({ request, locals }) => {
        const userId = locals.user.id;

        const getDbData = async (sdoId: number): Promise<T> => {
            const dbSdo: any = await getSiteDateObservation(sdoId);
            return { sdoId: sdoId, sdo: dbSdo };
            //return {[sdoId]: dbSdo};
        };

        //console.log('aaa');

        // Add form data
        const formData: any = await request.formData();
        //console.log(formData);

        const sdoIds: number[] = [
            ...new Set(
                Array.from(formData).map((x: any) => {
                    let us = x[0].indexOf('_');
                    return Number(x[0].substring(0, us) ?? -1);
                })
            ),
        ];

        const promises: Promise<any>[] = [];
        sdoIds.forEach((sdoId) => {
            promises.push(getDbData(sdoId));
        });

        const dbData = await Promise.all(promises);

        const preparedData = {};
        dbData.forEach((item) => {
            preparedData[item.sdoId] = {
                db: item.sdo,
                edit: {},
                orig: {},
            };
        });
        //console.log(preparedData);

        Array.from(formData).forEach(([k, v]) => {
            const parts = k.split('_');
            preparedData[parts[0]][parts.length < 3 ? 'edit' : 'orig'][parts[1]] = v;
        });

        console.log(preparedData);
        //console.log(dbData);

        promises.length = 0;
        sdoIds.forEach((sdoId) => {
            const sdo = preparedData[sdoId].db;
            let saveThis = false;
            Object.entries(preparedData[sdoId].edit).forEach(([k, v]) => {
                //console.log(`${sdoId} - k: ${k}, sdo[k]: ${sdo[k]}, v: '${v}', typeof(sdo[k]): ${typeof sdo[k]}, typeof(v): ${typeof v}`);

                // TODO: if _orig <> _db then throw
                //       this indicates data has changed on the server
                //       maybe find a better way then throw, e.g. return { action: 'save', sucess: false }
                // { throw 'Data integrity error'; }

                if (k.startsWith('section')) {
                    let vv = Number(v);
                    if (vv >= 0) {
                        if (sdo[k] == null && vv > 0) {
                            saveThis = true;
                            sdo[k] = vv;
                        } else if (sdo[k] != null && vv === 0) {
                            saveThis = true;
                            sdo[k] = null;
                        }
                    }
                } else {
                    let vv = String(v);
                    if (typeof sdo[k] === 'undefined') {
                        if (vv.length > 0) {
                            saveThis = true;
                            sdo[k] = vv;
                        }
                    } else {
                        if (sdo[k] !== vv) {
                            saveThis = true;
                            sdo[k] = null;
                        }
                    }
                }
            });

            if (saveThis) {
                sdo.updatedById = userId;
                sdo.updatedAt = new Date();
                promises.push(updateSiteDateObservation(sdo));
            }
        });

        if (promises.length === 0) {
            return { action: 'save', success: false, message: 'No changes to save' };
        }

        const savedData = await Promise.all(promises);

        // TODO: if any promise fails ... should rollback or at least report something

        return { action: 'save', success: true };
    },

    undoRedoSiteDateObservation: async ({ request, locals }) => {
        //console.log('bbb');
        const formData: any = await request.formData();
        //console.log(formData);
        return { success: true };
    },

    deleteSiteDateObservation: async ({ request, locals }) => {
        //console.log('ccc');
        const formData: any = await request.formData();
        //console.log(formData);

        const deleteOn = formData.get('deleteOn') === 'true';
        const siteDateObservationId = Number(formData.get('siteDateObservationId'));
        const siteDateId = Number(formData.get('siteDateId'));
        const checklistId = Number(formData.get('checklistId'));
        const useLatinSort = Boolean(formData.get('useLatinSort'));
        const sortDirection = formData.get('sortDirection');
        const advanceRecord = Boolean(formData.get('advanceRecord'));
        const userId = locals.user.id;

        const doit: any[] = [deleteSiteDateObservation(siteDateObservationId, deleteOn, userId)];

        if (advanceRecord) {
            if (useLatinSort) {
                if (sortDirection === 'asc') {
                    doit.push(nextOrLastSiteDateObservationByLatin(siteDateId, checklistId));
                } else {
                    doit.push(prevOrFirstSiteDateObservationByLatin(siteDateId, checklistId));
                }
            } else {
                if (sortDirection === 'asc') {
                    doit.push(nextOrLastSiteDateObservationByCommon(siteDateId, checklistId));
                } else {
                    doit.push(prevOrFirstSiteDateObservationByLatin(siteDateId, checklistId));
                }
            }

            // Advance to next or previous record based on latin or common name sort per above
            const [, sdo] = await Promise.all(doit);
            const json = JSON.stringify(sdo);
            const jsonResult: SiteDateObservationChecklist = JSON.parse(json);
            return { action: deleteOn ? 'delete' : 'undelete', success: true, siteDateObservation: jsonResult };
        } else {
            // Stay on deleted record
            const dc = await Promise.all(doit);
            const json = JSON.stringify(dc);
            const jsonResult: SiteDateObservationChecklist = JSON.parse(json);
            return { action: deleteOn ? 'delete' : 'undelete', success: true, siteDateObservation: jsonResult };
        }
    },

    addSiteDateObservation: async ({ request, locals }) => {
		//console.log('ddd');
        const formData: any = await request.formData();
        console.log(formData);
        // hodges checklistId siteDateId createdById createdAt
        await createSiteDateObservation(formData);
        return { action: 'create', success: true };
    },

    reviewSiteDateObservation: async ({ request, locals }) => {
        //console.log('eee');
        const formData: any = await request.formData();
        //console.log(formData);

        const siteDateObservationId = Number(formData.get('siteDateObservationId'));
        const confirm = formData.get('confirm') === 'true';
        const userId = locals.user.id;

        console.log(siteDateObservationId, confirm, userId);

        const siteDateObservation = (await reviewSiteDateObservation(siteDateObservationId, confirm, userId)) as SiteDateObservationChecklist;

        const json = JSON.stringify(siteDateObservation);
        const jsonResult: SiteDateObservationChecklist = JSON.parse(json);
        return { action: 'review', success: true, siteDateObservation: jsonResult };
    },
};
