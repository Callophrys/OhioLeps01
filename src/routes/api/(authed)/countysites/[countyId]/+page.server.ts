import { fail } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import type { Site, County } from '@prisma/client';
import { getSitesByCounty, getSites } from '$lib/database/sites.js';
import { getCounties } from '$lib/database/counties.js';

export async function load({ cookies, url, params }) {

	// SECURITY - only checking session NOT user or role at this time
	if (!cookies.get('session')) {
		throw redirect(303, `/login?redirectTo=${url.pathname}`);
	}

	let countyId = Number(params.countyId);
	console.log(countyId);
	const [sites, counties] = (countyId === -1) ?
		await Promise.all([
			getSites(null),
			getCounties()
		])
		:
		await Promise.all([
			getSitesByCounty(countyId),
			getCounties()
		]);

	const jsonS = JSON.stringify(sites);
	const jsonResultS: Site[] = JSON.parse(jsonS);

	const jsonC = JSON.stringify(counties);
	const jsonResultC: County[] = JSON.parse(jsonC);

	//console.log(jsonResultC);

	return { sites: jsonResultS, counties: jsonResultC, refCountyId: countyId };
}
