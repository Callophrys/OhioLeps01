import { getSiteDates } from '$lib/database/sitedates.js';
import type { SiteDate } from '@prisma/client';

export async function load() {
	const siteDates = await getSiteDates();

	// solution to "Cannot stringify arbitrary non-POJOs"
	const json = JSON.stringify(siteDates);
	const jsonResult: SiteDate[] = JSON.parse(json);

	return {
		siteDates: jsonResult
	};
}
