import { error } from '@sveltejs/kit'
import { getSite, getSites } from '$lib/database/sites'
import { getCounties } from '$lib/database/counties.js';
import type { SiteCountySiteDates } from '$lib/types.js';
import type { County, Site } from '@prisma/client';

export async function load({ params }: any) {
console.log('Load from /api/sites/{siteId}/+page.server.ts');
//console.log('params', params);

const [site, counties, sites] = await Promise.all([
getSite(Number(params.siteId)),
getCounties(),
getSites(null)
]);

if (!site) {
throw error(404, 'Site not found')
}

const json = JSON.stringify(site);
const jsonResult: SiteCountySiteDates = JSON.parse(json);

const jsonC = JSON.stringify(counties);
const jsonResultC: County[] = JSON.parse(jsonC);

const jsonS = JSON.stringify(sites);
const jsonResultS: Site[] = JSON.parse(jsonS);

//console.log('site', jsonResult);
return { site: jsonResult, counties: jsonResultC, sites: jsonResultS }
}
