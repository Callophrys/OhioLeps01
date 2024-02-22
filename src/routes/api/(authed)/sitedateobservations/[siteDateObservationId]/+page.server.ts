import { getSiteDateObservationBySiteDateObservation, updateSiteObservationReviewStatus } from '$lib/database/sitedateobservations.js';
import type { SiteDateObservationChecklist } from '$lib/types.js';

export async function load({ params }) {
	const siteDateObservation = await getSiteDateObservationBySiteDateObservation(Number(params.siteDateObservationId)) as SiteDateObservationChecklist;
	const json = JSON.stringify(siteDateObservation);
	const jsonResult: SiteDateObservationChecklist = JSON.parse(json);
	return { siteDateObservation: jsonResult }
}

export const actions = {
	updateSiteObservationReviewStatus: async ({ request, locals }) => {
		const formData: any = await request.formData();
		//console.log(formData);

		const siteDateObservationId = Number(formData.get('siteDateObservationId'));
		const confirm = formData.get('confirm') === 'true';
		const userId = locals.user.id;

		const siteDateObservation =
			await updateSiteObservationReviewStatus(siteDateObservationId, confirm, userId) as SiteDateObservationChecklist;

		const json = JSON.stringify(siteDateObservation);
		const jsonResult: SiteDateObservationChecklist = JSON.parse(json);
		return { success: true, siteDateObservation: jsonResult }
	}
}
