import type { County, State } from '@prisma/client';
import type { SiteCountyState, SiteCountySiteDatesSiteStatuses } from '$lib/types.js';
import { error } from '@sveltejs/kit';
import { getCounties } from '$lib/database/counties.js';
import { getSite, getSites } from '$lib/database/sites';
import { getStates } from '$lib/database/counties.js';

export async function load({ params }: any) {
    // console.log('Load from /api/sites/{siteId}/+page.server.ts');
    //console.log('params', params);

    const [site, counties, sites, states] = await Promise.all([getSite(Number(params.siteId)), getCounties(), getSites(null), getStates()]);

    if (!site) {
        throw error(404, 'Site not found');
    }

    const json = JSON.stringify(site);
    const jsonResultSite: SiteCountySiteDatesSiteStatuses = JSON.parse(json);
    //console.log('site', jsonResult);

    const jsonC = JSON.stringify(counties);
    const jsonResultCounties: County[] = JSON.parse(jsonC);

    const jsonStates = JSON.stringify(states);
    const jsonStatesResult: State[] = JSON.parse(jsonStates);

    const jsonS = JSON.stringify(sites);
    const jsonResultSites: SiteCountyState[] = JSON.parse(jsonS);
    //const jsonResultS: SiteDateYearSiteDates[] = JSON.parse(jsonS);
    //console.log('sites.siteId.sites (ct=2)', jsonResultS.slice(0, 1));
    // console.log(jsonResultSite);

    return { site: jsonResultSite, counties: jsonResultCounties, states: jsonStatesResult, sites: jsonResultSites };
}
