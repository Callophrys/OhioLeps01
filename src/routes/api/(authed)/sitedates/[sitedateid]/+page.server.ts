import { getSites } from '$lib/database/sites.js';
import { getSiteDate, getSiteDateSiteDates } from '$lib/database/sitedates';
import { getSiteDateObservationsBySiteDate } from '$lib/database/sitedateobservations.js';
import type { SiteDateYearSdo, SiteDateYearSiteDates, SiteDateObservationChecklist, SiteCounty } from '$lib/types.js';

export async function load({ params }) {
    console.log('sitedates - params', params);

    let siteDateId = Number(params.sitedateid);
    const [siteDate, sites, siteDates, siteDateObservations] = await Promise.all([getSiteDate(siteDateId), getSites(null), getSiteDateSiteDates(siteDateId), getSiteDateObservationsBySiteDate(siteDateId)]);

    //console.log('sites', sites);

    const jsonD = JSON.stringify(siteDate);
    const jsonResultD: SiteDateYearSdo = JSON.parse(jsonD);

    const jsonS = JSON.stringify(sites);
    const jsonResultS: SiteCounty[] = JSON.parse(jsonS);

    const jsonYW = JSON.stringify(siteDates);
    const jsonResultYW: SiteDateYearSiteDates[] = JSON.parse(jsonYW);

    const jsonO = JSON.stringify(siteDateObservations);
    const jsonResultO: SiteDateObservationChecklist[] = JSON.parse(jsonO);

    return {
        siteDate: jsonResultD,
        sites: jsonResultS,
        siteDates: jsonResultYW,
        siteDateObservations: jsonResultO,
    };
}
