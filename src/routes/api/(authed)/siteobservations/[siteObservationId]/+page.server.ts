import { getSiteObservationBySiteObservation } from '$lib/database/siteobservations.js';
import type { SiteObservationChecklist } from '$lib/types.js';

export async function load({ params }) {
	const siteObservation = await getSiteObservationBySiteObservation(Number(params.siteObservationId)) as SiteObservationChecklist;
	const json = JSON.stringify(siteObservation);
	const jsonResult: SiteObservationChecklist = JSON.parse(json);
	return { siteObservation: jsonResult }
}
