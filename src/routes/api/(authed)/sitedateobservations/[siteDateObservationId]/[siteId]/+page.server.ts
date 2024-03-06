import {
	getSiteDateObservationBySiteDateObservation, createSiteDateObservation,
	reviewSiteDateObservation, updateSiteDateObservation, deleteSiteDateObservation,
	nextOrLastSiteDateObservationByCommon, nextOrLastSiteDateObservationByLatin, prevOrFirstSiteDateObservationByLatin,
} from '$lib/database/sitedateobservations.js';
import { getChecklistsBySiteDateId } from '$lib/database/checklists.js';
import { getSites } from '$lib/database/sites.js';
import { getSiteDates } from '$lib/database/sitedates.js';
import { isNullOrWhiteSpace } from '$lib/utils.js';
import type { SiteDateObservationChecklist, SiteCounty, SiteDateYear, ChecklistScientificName } from '$lib/types.js';

export async function load({ params }) {
	console.log('.....', params);
	const [siteDateObservation, sites, siteDates,] = await Promise.all([
		getSiteDateObservationBySiteDateObservation(Number(params.siteDateObservationId)),
		getSites(null),
		getSiteDates(Number(params.siteId)),
		//getChecklistsBySiteDateId(Number(params.siteDateId))
	]);

	const jsonO = JSON.stringify(siteDateObservation);
	const jsonResultO: SiteDateObservationChecklist = JSON.parse(jsonO);

	const jsonS = JSON.stringify(sites);
	const jsonResultS: SiteCounty[] = JSON.parse(jsonS);

	const jsonD = JSON.stringify(siteDates);
	const jsonResultD: SiteDateYear[] = JSON.parse(jsonD);

	return { siteDateObservation: jsonResultO, sites: jsonResultS, siteDates: jsonResultD }
}

export const actions = {
	saveSiteDateObservation: async ({ request, locals }) => {
		//console.log('aaa');
		const formData: any = await request.formData();
		//console.log(formData);

		const siteDateObservationId = Number(formData.get('siteDateObservationId'));
		const originalSdo = await getSiteDateObservationBySiteDateObservation(siteDateObservationId);
		const userId = locals.user.id;

		if (originalSdo && userId) {

			const inboundEdits: any = {};
			const inboundEditsCheck: any = {};
			Array.from(formData).forEach((d: any) => {
				if (d[0].startsWith('section')) {
					if (d[0].indexOf('_') < 0) {
						//console.log('rrr>>', d);
						let idx: string = d[0];
						inboundEdits[idx] = isNullOrWhiteSpace(d[1]) ? null : Number(d[1]);
					} else {
						//console.log('sss>>', d);
						let idx: string = d[0];
						inboundEditsCheck[idx] = isNullOrWhiteSpace(d[1]) ? null : Number(d[1]);
					}
				}
				return true;
			});

			//console.log('aaa - aaa', inboundEdits);
			//console.log('bbb - bbb', inboundEditsCheck);

			/*
			Object.keys(originalSdo).forEach((k: any) => {
				if (k.startsWith('section')) {
					originalSdo[k] = 3;
				}
			})
			*/

			//console.log('>>', originalSdo.section1, inboundEditsCheck.section1_orig, inboundEdits.section1);
			if (originalSdo.section1 === inboundEditsCheck.section1_orig) { originalSdo.section1 = inboundEdits.section1; } else { throw 'Data integrity error'; }
			if (originalSdo.section2 === inboundEditsCheck.section2_orig) { originalSdo.section2 = inboundEdits.section2; } else { throw 'Data integrity error'; }
			if (originalSdo.section3 === inboundEditsCheck.section3_orig) { originalSdo.section3 = inboundEdits.section3; } else { throw 'Data integrity error'; }
			if (originalSdo.section4 === inboundEditsCheck.section4_orig) { originalSdo.section4 = inboundEdits.section4; } else { throw 'Data integrity error'; }
			if (originalSdo.section5 === inboundEditsCheck.section5_orig) { originalSdo.section5 = inboundEdits.section5; } else { throw 'Data integrity error'; }
			if (originalSdo.section6 === inboundEditsCheck.section6_orig) { originalSdo.section6 = inboundEdits.section6; } else { throw 'Data integrity error'; }
			if (originalSdo.section7 === inboundEditsCheck.section7_orig) { originalSdo.section7 = inboundEdits.section7; } else { throw 'Data integrity error'; }
			if (originalSdo.section8 === inboundEditsCheck.section8_orig) { originalSdo.section8 = inboundEdits.section8; } else { throw 'Data integrity error'; }
			if (originalSdo.section9 === inboundEditsCheck.section9_orig) { originalSdo.section9 = inboundEdits.section9; } else { throw 'Data integrity error'; }
			if (originalSdo.section10 === inboundEditsCheck.section10_orig) { originalSdo.section10 = inboundEdits.section10; } else { throw 'Data integrity error'; }
			if (originalSdo.section11 === inboundEditsCheck.section11_orig) { originalSdo.section11 = inboundEdits.section11; } else { throw 'Data integrity error'; }
			if (originalSdo.section12 === inboundEditsCheck.section12_orig) { originalSdo.section12 = inboundEdits.section12; } else { throw 'Data integrity error'; }
			if (originalSdo.section13 === inboundEditsCheck.section13_orig) { originalSdo.section13 = inboundEdits.section13; } else { throw 'Data integrity error'; }
			if (originalSdo.section14 === inboundEditsCheck.section14_orig) { originalSdo.section14 = inboundEdits.section14; } else { throw 'Data integrity error'; }
			if (originalSdo.section15 === inboundEditsCheck.section15_orig) { originalSdo.section15 = inboundEdits.section15; } else { throw 'Data integrity error'; }
			/*
			 */

			originalSdo.updatedById = userId;
			originalSdo.updatedAt = new Date();

			const updatedSdo = await updateSiteDateObservation(originalSdo);
			//console.log('aaa - aaa - aaa');

			const json = JSON.stringify(updatedSdo);
			const jsonResult: SiteDateObservationChecklist = JSON.parse(json);
			return { action: 'save', success: true, siteDateObservation: jsonResult }
		}

		return { success: false }
	},

	undoRedoSiteDateObservation: async ({ request, locals }) => {
		//console.log('bbb');
		const formData: any = await request.formData();
		//console.log(formData);
		return { success: true }
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
			return { action: (deleteOn ? 'delete' : 'undelete'), success: true, siteDateObservation: jsonResult }

		} else {

			// Stay on deleted record
			const dc = await Promise.all(doit);
			const json = JSON.stringify(dc);
			const jsonResult: SiteDateObservationChecklist = JSON.parse(json);
			return { action: (deleteOn ? 'delete' : 'undelete'), success: true, siteDateObservation: jsonResult }
		}
	},

	addSiteDateObservation: async ({ request, locals }) => {
		//console.log('ddd');
		const formData: any = await request.formData();
		//console.log(formData);
		// hodges checklistId siteDateId createdById createdAt
		return { action: 'create', success: true }
	},

	reviewSiteDateObservation: async ({ request, locals }) => {
		//console.log('eee');
		const formData: any = await request.formData();
		//console.log(formData);

		const siteDateObservationId = Number(formData.get('siteDateObservationId'));
		const confirm = formData.get('confirm') === 'true';
		const userId = locals.user.id;

		console.log(siteDateObservationId, confirm, userId);

		const siteDateObservation =
			await reviewSiteDateObservation(siteDateObservationId, confirm, userId) as SiteDateObservationChecklist;

		const json = JSON.stringify(siteDateObservation);
		const jsonResult: SiteDateObservationChecklist = JSON.parse(json);
		return { action: 'review', success: true, siteDateObservation: jsonResult }
	}
}
