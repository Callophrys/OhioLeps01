import { getSiteDate } from '$lib/database/sitedates'
import { getSiteObservationsBySiteDate } from '$lib/database/siteobservations.js';
import type { SiteDate } from '@prisma/client';
import type { SiteObservation } from '@prisma/client';

export async function load({ params }) {

	let siteDateId = Number(params.sitedateid);
	const [siteDate, siteObservations] =
		await Promise.all([
			getSiteDate(siteDateId),
			getSiteObservationsBySiteDate(siteDateId)
		]);

	const jsonD = JSON.stringify(siteDate);
	const jsonResultD: SiteDate = JSON.parse(jsonD);

	const jsonO = JSON.stringify(siteObservations);
	const jsonResultO: SiteObservation[] = JSON.parse(jsonO);

	return { siteDate: jsonResultD, siteObservations: jsonResultO }
}

