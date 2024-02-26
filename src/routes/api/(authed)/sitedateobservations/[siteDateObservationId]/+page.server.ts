import { getSiteDateObservationBySiteDateObservation, reviewSiteDateObservation } from '$lib/database/sitedateobservations.js';
import type { SiteDateObservationChecklist } from '$lib/types.js';

export async function load({ params }) {
	const siteDateObservation = await getSiteDateObservationBySiteDateObservation(Number(params.siteDateObservationId)) as SiteDateObservationChecklist;
	const json = JSON.stringify(siteDateObservation);
	const jsonResult: SiteDateObservationChecklist = JSON.parse(json);
	return { siteDateObservation: jsonResult }
}

export const actions = {
    editSiteObservation: async ({ request, locals }) => { return { success: true }},
    saveSiteObservatio: async ({ request, locals }) => { return { success: true }},
    undoRedoSiteObservation: async ({ request, locals }) => { return { success: true }},
    deleteSiteDateObservation: async ({ request, locals }) => { return { success: true }},
    addSiteDateObservation: async ({ request, locals }) => { return { success: true }},
	reviewSiteDateObservation: async ({ request, locals }) => {
		console.log('xxx');
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
