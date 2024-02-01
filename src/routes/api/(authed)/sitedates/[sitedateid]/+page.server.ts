import { getSiteDate, getSiteDateRecordDates } from '$lib/database/sitedates'
import { getSiteDateObservationBySiteDate } from '$lib/database/sitedateobservations.js';
import type { SiteDateYear, SiteDateObservationChecklist } from '$lib/types.js';

export async function load({ params }) {

	let siteDateId = Number(params.sitedateid);
	const [siteDate, siteRecordDates, siteDateObservations] =
		await Promise.all([
			getSiteDate(siteDateId),
			getSiteDateRecordDates(siteDateId),
			getSiteDateObservationBySiteDate(siteDateId)
		]);

	const jsonD = JSON.stringify(siteDate);
	const jsonResultD: SiteDateYear = JSON.parse(jsonD);

	const jsonYW = JSON.stringify(siteRecordDates?.site.siteDates);
	const jsonResultYW: { siteDateId: number, recordDate: Date }[] = JSON.parse(jsonYW);

	const jsonO = JSON.stringify(siteDateObservations);
	const jsonResultO: SiteDateObservationChecklist[] = JSON.parse(jsonO);

	return {
		siteDate: jsonResultD,
		siteRecordDates: jsonResultYW,
		siteDateObservations: jsonResultO
	}
}

