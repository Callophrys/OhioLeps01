import { getSiteDatesAll } from '$lib/database/sitedates';
import type { SiteDateYear } from '$lib/types';

export async function load() {
	const siteDates = await getSiteDatesAll();
	const json = JSON.stringify(siteDates);
	const jsonResult: SiteDateYear[] = JSON.parse(json);
	return { siteDates: jsonResult }
}
