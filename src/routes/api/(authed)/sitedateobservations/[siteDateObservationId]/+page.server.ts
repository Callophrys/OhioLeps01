import { getSiteDateObservationBySiteDateObservation } from '$lib/database/sitedateobservations.js';
import type { SiteDateObservationChecklist } from '$lib/types.js';

export async function load({ params }) {
	const siteDateObservation = await getSiteDateObservationBySiteDateObservation(Number(params.siteDateObservationId)) as SiteDateObservationChecklist;
	const json = JSON.stringify(siteDateObservation);
	const jsonResult: SiteDateObservationChecklist = JSON.parse(json);
	return { siteDateObservation: jsonResult }
}
