import { ROLE } from "$lib/types.js";
import {
  getSiteDateObservation,
  getSiteDateObservationsBySiteDate,
  reviewSiteDateObservation,
  updateSiteDateObservation,
  deleteSiteDateObservation,
  nextOrLastSiteDateObservationByCommon,
  nextOrLastSiteDateObservationByLatin,
  prevOrFirstSiteDateObservationByLatin,
  createSiteDateObservation,
} from "$lib/database/sitedateobservations.js";
import { getSites } from "$lib/database/sites.js";
import { getSiteDates } from "$lib/database/sitedates.js";
import type {
  SiteDateObservationChecklist,
  SiteCounty,
  SiteDateYear,
} from "$lib/types.js";
import type { Actions } from "@sveltejs/kit";
import {
  getChecklistsBySiteId,
  getChecklists,
} from "$lib/database/checklists.js";
import type { SiteDateObservation } from "@prisma/client";

// params: siteDateObservationId and siteId
export async function sdoLoad(siteId: number, siteDateId: number) {

  const [sites, siteDates, siteDateObservations, checklistsForSite, checklistsAll] =
    await Promise.all([
      getSites(null),
      getSiteDates(siteId),
      getSiteDateObservationsBySiteDate(siteDateId),
      getChecklistsBySiteId(siteId),
      getChecklists(),
    ]);

  // need 3 lists of checklists
  // 1. all seen by this current siteDateObs
  // 2. all seen by the site of this siteDateObs
  // 3. all possible

  // 1. SiteDateObservations by current siteDate - this gets all checklist species for this siteDate
  // 2. All checklists for site overall
  // 3. All checklist items

  return {
    sites: sites,
    siteDates: siteDates,
    checklistsSiteDateObs: siteDateObservations,
    checklistsSite: checklistsForSite, // jsonResultT,
    checklistsAll: checklistsAll, // jsonResultA,
  };
}

export const siteDateObservationActions: Actions = {
  updateSiteDateObservation: async ({ request, locals }) => {
    console.log("updateSiteDateObservation");
    if (
      locals.user.role !== ROLE.SUPER &&
      locals.user.role !== ROLE.ADMIN &&
      locals.user.role !== ROLE.ENTRY
    ) {
      return; // TODO: log this and throw some kind of error
    }

    const userId = locals.user.id;

    const getDbData = async (
      sdoId: number,
    ): Promise<{ sdoId: number; sdo: SiteDateObservation }> => {
      //console.log("getDbData");
      const dbSdo: any = await getSiteDateObservation(sdoId);
      return { sdoId: sdoId, sdo: dbSdo };
    };

    // Add form data
    const formData: any = await request.formData();
    //console.log(formData);

    const sdoIds: number[] = [
      ...new Set(
        Array.from(formData).map((x: any) => {
          let us = x[0].indexOf("_");
          return Number(x[0].substring(0, us) ?? -1);
        }),
      ),
    ];
    console.log('sdoIds', sdoIds);

    const promises: Promise<any>[] = [];
    sdoIds.forEach((sdoId) => {
      promises.push(getDbData(sdoId));
    });
    //console.log('promises');

    const dbData = await Promise.all(promises);
    console.log('dbData', dbData);

    const preparedData: any = {};
    dbData.forEach((item) => {
      preparedData[item.sdoId] = {
        db: item.sdo,
        edit: {},
        orig: {},
      };
    });
    console.log('preparedData', preparedData);

    Array.from(formData).forEach(([k, v]: any) => {
      const parts = k.split("_");
      preparedData[parts[0]][parts.length < 3 ? "edit" : "orig"][parts[1]] = v;
    });
    // console.log('formData', formData);

    promises.length = 0;
    sdoIds.forEach((sdoId) => {
      const sdo = preparedData[sdoId].db;
      let saveThis = false;

      for (const [k, v] of Object.entries(
        preparedData[sdoId].edit as [string, string],
      )) {
        // console.log(`${sdoId} - k: ${k}, sdo[k]: '${sdo[k]}', v: '${v}', typeof(sdo[k]): ${typeof sdo[k]}, typeof(v): ${typeof v}`);

        // TODO: if _orig <> _db then throw
        //       this indicates data has changed on the server
        //       maybe find a better way then throw, e.g. return { action: 'save', sucess: false }
        // { throw 'Data integrity error'; }

        if (k.startsWith("section")) {
          if (v.length) {
            if (sdo[k] !== v) {
              saveThis = true;
              sdo[k] = Number(v);
            }
          } else if ((sdo[k] ?? "").length) {
            saveThis = true;
            sdo[k] = null;
          }
        } else {
          // TODO see if this block jives with above, 20240628

          // console.log('sdo[k]', sdo[k], 'vv', vv);
          if (!sdo[k] && v) {
            saveThis = true;
            sdo[k] = v;
          } else if (sdo[k] && !v) {
            saveThis = true;
            sdo[k] = null;
          } else if (sdo[k] !== v) {
            saveThis = true;
            sdo[k] = v;
          }
        }
      }

      if (saveThis) {
        // console.log('sdo to save', sdo);
        sdo.updatedById = userId;
        sdo.updatedAt = new Date();
        promises.push(updateSiteDateObservation(sdo));
      }
    });

    if (promises.length === 0) {
      return { action: "save", success: false, message: "No changes to save" };
    }

    await Promise.all(promises);

    // TODO: if any promise fails ... should rollback or at least report something

    return { action: "save", success: true };
  },

  undoRedoSiteDateObservation: async ({ request, locals }) => {
    console.log(locals.user.id);
    const formData: any = await request.formData();
    console.log(formData);
    return { success: true };
  },

  deleteSiteDateObservation: async ({ request, locals }) => {
    const formData: any = await request.formData();
    const deleteOn = formData.get("deleteOn") === "true";
    const siteDateObservationId = Number(formData.get("siteDateObservationId"));
    const siteDateId = Number(formData.get("siteDateId"));
    const checklistId = Number(formData.get("checklistId"));
    const useLatinSort = Boolean(formData.get("useLatinSort"));
    const sortDirection = formData.get("sortDirection");
    const advanceRecord = Boolean(formData.get("advanceRecord"));
    const userId = locals.user.id;

    const doit: any[] = [
      deleteSiteDateObservation(siteDateObservationId, deleteOn, userId),
    ];

    if (advanceRecord) {
      if (useLatinSort) {
        if (sortDirection === "asc") {
          doit.push(
            nextOrLastSiteDateObservationByLatin(siteDateId, checklistId),
          );
        } else {
          doit.push(
            prevOrFirstSiteDateObservationByLatin(siteDateId, checklistId),
          );
        }
      } else {
        if (sortDirection === "asc") {
          doit.push(
            nextOrLastSiteDateObservationByCommon(siteDateId, checklistId),
          );
        } else {
          doit.push(
            prevOrFirstSiteDateObservationByLatin(siteDateId, checklistId),
          );
        }
      }

      // Advance to next or previous record based on latin or common name sort per above
      const [, sdo] = await Promise.all(doit);
      const json = JSON.stringify(sdo);
      const jsonResult: SiteDateObservationChecklist = JSON.parse(json);
      return {
        action: deleteOn ? "delete" : "undelete",
        success: true,
        siteDateObservation: jsonResult,
      };
    } else {
      // Stay on deleted record
      const dc = await Promise.all(doit);
      const json = JSON.stringify(dc);
      const jsonResult: SiteDateObservationChecklist = JSON.parse(json);
      return {
        action: deleteOn ? "delete" : "undelete",
        success: true,
        siteDateObservation: jsonResult,
      };
    }
  },

  createSiteDateObservation: async ({ request, locals }) => {
    console.log("createSiteDateObservation");
    if (
      locals.user.role !== ROLE.SUPER &&
      locals.user.role !== ROLE.ADMIN &&
      locals.user.role !== ROLE.ENTRY
    ) {
      return; // TODO: log this and throw some kind of error
    }

    const formData: any = await request.formData();
    console.log();
    console.log("formData:", formData);

    const sdo = {
      id: -1,
      siteDateId: Number(formData.get("siteDateId")),
      checklistId: Number(formData.get("checklistId")),
      seqId: -1,
      idCode: String(formData.get("idCode")),
      section1: AsNullableNumber(formData.get("section1")),
      section2: AsNullableNumber(formData.get("section2")),
      section3: AsNullableNumber(formData.get("section3")),
      section4: AsNullableNumber(formData.get("section4")),
      section5: AsNullableNumber(formData.get("section5")),
      section6: AsNullableNumber(formData.get("section6")),
      section7: AsNullableNumber(formData.get("section7")),
      section8: AsNullableNumber(formData.get("section8")),
      section9: AsNullableNumber(formData.get("section9")),
      section10: AsNullableNumber(formData.get("section10")),
      section11: AsNullableNumber(formData.get("section11")),
      section12: AsNullableNumber(formData.get("section12")),
      section13: AsNullableNumber(formData.get("section13")),
      section14: AsNullableNumber(formData.get("section14")),
      section15: AsNullableNumber(formData.get("section15")),
      createdAt: new Date(),
      createdById: locals.user.id,
    } as SiteDateObservation;
    console.log();
    console.log("sdo after:", sdo);
    const result = await createSiteDateObservation(sdo);
    return { action: "create", success: true, id: result.id };
  },

  reviewSiteDateObservation: async ({ request, locals }) => {
    //console.log('eee');
    const formData: any = await request.formData();
    //console.log(formData);

    const siteDateObservationId = Number(formData.get("siteDateObservationId"));
    const confirm = formData.get("confirm") === "true";
    const userId = locals.user.id;

    // console.log(siteDateObservationId, confirm, userId);

    const siteDateObservation = await reviewSiteDateObservation(
      siteDateObservationId,
      confirm,
      userId,
    );

    return { action: "review", success: true, siteDateObservation: siteDateObservation };
  },
};

function AsNullableNumber(val: FormDataEntryValue): Number | null {
  let x = String(val);
  if (x === "null") return null;
  return Number(x);
}
