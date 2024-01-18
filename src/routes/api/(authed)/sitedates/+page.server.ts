import { getSiteDates } from '$lib/database/sitedates';
import type { SiteDate } from '@prisma/client';

export async function load() {
	const siteDates = await getSiteDates();
	const json = JSON.stringify(siteDates);
	const jsonResult: SiteDate[] = JSON.parse(json);
	return { siteDate: jsonResult }
}
