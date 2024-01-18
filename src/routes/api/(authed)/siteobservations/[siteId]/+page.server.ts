import { getSiteObservations } from '$lib/database/siteobservations.js';
import type { SiteObservation } from '@prisma/client';

export async function load({ params }) {
	console.log(params);
	/*
	const site = await getSite(Number(params.slug));
	return;
	const siteObservations = await getSiteObservations();
	const json = JSON.stringify(siteObservations);
	const jsonResult: SiteObservation[] = JSON.parse(json);
	return { siteObservations: jsonResult }
	*/
}
