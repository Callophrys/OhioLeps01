import { getSiteDate, getSiteDateRecordDates } from '$lib/database/sitedates'
import { getSiteObservationBySiteDate } from '$lib/database/siteobservations.js';
import type { SiteDate } from '@prisma/client';
import type { SiteObservation } from '@prisma/client';

export async function load({ params }) {

	let siteDateId = Number(params.sitedateid);
	const [siteDate, siteRecordDates, siteObservations] =
		await Promise.all([
			getSiteDate(siteDateId),
			getSiteDateRecordDates(siteDateId),
			getSiteObservationBySiteDate(siteDateId)
		]);

	const jsonD = JSON.stringify(siteDate);
	const jsonResultD: SiteDate = JSON.parse(jsonD);

	const jsonYW = JSON.stringify(siteRecordDates?.site.siteDates);
	const jsonResultYW: { siteDateId: number, recordDate: Date }[] = JSON.parse(jsonYW);

	const jsonO = JSON.stringify(siteObservations);
	const jsonResultO: SiteObservation[] = JSON.parse(jsonO);

	return { siteDate: jsonResultD, siteRecordDates: jsonResultYW, siteObservations: jsonResultO }
}

