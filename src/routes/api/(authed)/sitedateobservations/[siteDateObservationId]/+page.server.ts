import { getSiteDateObservationBySiteDateObservation, createSiteDateObservation, reviewSiteDateObservation, updateSiteDateObservation } from '$lib/database/sitedateobservations.js';
import type { SiteDateObservationChecklist } from '$lib/types.js';
import type { SiteDateObservation } from '@prisma/client';

export async function load({ params }) {
	const siteDateObservation = await getSiteDateObservationBySiteDateObservation(Number(params.siteDateObservationId)) as SiteDateObservationChecklist;
	const json = JSON.stringify(siteDateObservation);
	const jsonResult: SiteDateObservationChecklist = JSON.parse(json);
	return { siteDateObservation: jsonResult }
}

export const actions = {
	saveSiteDateObservation: async ({ request, locals }) => {
		console.log('aaa');
		const formData: any = await request.formData();
		//console.log(formData);

		const siteDateObservationId = Number(formData.get('siteDateObservationId'));
		const originalSdo = await getSiteDateObservationBySiteDateObservation(siteDateObservationId) as SiteDateObservation;
		const userId = locals.user.id;

		if (originalSdo && userId) {

			const inboundEdits: any = {};
			const inboundEditsCheck: any = {};
			Array.from(formData).forEach((d: any) => {
				if (d[0].startsWith('section')) {
					if (d[0].indexOf('_') < 0) {
						console.log(d);
						let idx: string = d[0];
						inboundEdits[idx] = d[1];
					} else {
						console.log(d);
						let idx: string = d[0];
						inboundEditsCheck[idx] = d[1];
					}
				}
				return true;
			});

			console.log('aaa - aaa', inboundEdits);

			/*
			Object.keys(originalSdo).forEach((k: any) => {
				if (k.startsWith('section')) {
					originalSdo[k] = 3;
				}
			})
			*/

			/*
			 if (originalSdo.section1 === inboundEditsCheck.section1) { originalSdo.section1 = inboundEdits.section1; } else { throw 'Data integrity error'; }
			 if (originalSdo.section2 === inboundEditsCheck.section2) { originalSdo.section2 = inboundEdits.section2; } else { throw 'Data integrity error'; }
			 if (originalSdo.section3 === inboundEditsCheck.section3) { originalSdo.section3 = inboundEdits.section3; } else { throw 'Data integrity error'; }
			 if (originalSdo.section4 === inboundEditsCheck.section4) { originalSdo.section4 = inboundEdits.section4; } else { throw 'Data integrity error'; }
			 if (originalSdo.section5 === inboundEditsCheck.section5) { originalSdo.section5 = inboundEdits.section5; } else { throw 'Data integrity error'; }
			 if (originalSdo.section6 === inboundEditsCheck.section6) { originalSdo.section6 = inboundEdits.section6; } else { throw 'Data integrity error'; }
			 if (originalSdo.section7 === inboundEditsCheck.section7) { originalSdo.section7 = inboundEdits.section7; } else { throw 'Data integrity error'; }
			 if (originalSdo.section8 === inboundEditsCheck.section8) { originalSdo.section8 = inboundEdits.section8; } else { throw 'Data integrity error'; }
			 if (originalSdo.section9 === inboundEditsCheck.section9) { originalSdo.section9 = inboundEdits.section9; } else { throw 'Data integrity error'; }
			 if (originalSdo.section10 === inboundEditsCheck.section10) { originalSdo.section10 = inboundEdits.section10; } else { throw 'Data integrity error'; }
			 if (originalSdo.section11 === inboundEditsCheck.section11) { originalSdo.section11 = inboundEdits.section11; } else { throw 'Data integrity error'; }
			 if (originalSdo.section12 === inboundEditsCheck.section12) { originalSdo.section12 = inboundEdits.section12; } else { throw 'Data integrity error'; }
			 if (originalSdo.section13 === inboundEditsCheck.section13) { originalSdo.section13 = inboundEdits.section13; } else { throw 'Data integrity error'; }
			 if (originalSdo.section14 === inboundEditsCheck.section14) { originalSdo.section14 = inboundEdits.section14; } else { throw 'Data integrity error'; }
			 if (originalSdo.section15 === inboundEditsCheck.section15) { originalSdo.section15 = inboundEdits.section15; } else { throw 'Data integrity error'; }
			 */

			originalSdo.updatedById = userId;
			originalSdo.updatedAt = new Date();

			const updatedSdo = await updateSiteDateObservation(originalSdo);
			console.log('aaa - aaa - aaa');

			const json = JSON.stringify(updatedSdo);
			const jsonResult: SiteDateObservationChecklist = JSON.parse(json);
			return { success: true, siteDateObservation: jsonResult }
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
		return { success: true }
	},

	addSiteDateObservation: async ({ request, locals }) => {
		//console.log('ddd');
		const formData: any = await request.formData();
		//console.log(formData);
		// hodges checklistId siteDateId createdById createdAt
		return { success: true }
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
		return { success: true, siteDateObservation: jsonResult }
	}
}
