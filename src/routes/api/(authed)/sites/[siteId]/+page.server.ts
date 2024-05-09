import { error } from '@sveltejs/kit';
import { getSite, getSites } from '$lib/database/sites';
import { getCounties } from '$lib/database/counties.js';
import type { SiteDateYearSiteDates, SiteCountySiteDatesSiteStatuses } from '$lib/types.js';
import type { County } from '@prisma/client';

export async function load({ params }: any) {
    console.log('Load from /api/sites/{siteId}/+page.server.ts');
    //console.log('params', params);

    const [site, counties, sites] = await Promise.all([getSite(Number(params.siteId)), getCounties(), getSites(null)]);

    if (!site) {
        throw error(404, 'Site not found');
    }

    const json = JSON.stringify(site);
    const jsonResult: SiteCountySiteDatesSiteStatuses = JSON.parse(json);
    //console.log('site', jsonResult);

    const jsonC = JSON.stringify(counties);
    const jsonResultC: County[] = JSON.parse(jsonC);

    const jsonS = JSON.stringify(sites);
    const jsonResultS: SiteDateYearSiteDates[] = JSON.parse(jsonS);
    //console.log('sites.siteId.sites (ct=2)', jsonResultS.slice(0, 1));
    // console.log(jsonResultS);

    return { site: jsonResult, counties: jsonResultC, sites: jsonResultS };
}
