import { getSiteDates } from '$lib/database/sitedates';
import type { SiteDateYearSiteDates } from '$lib/types.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }: any) {
    //console.log('sitedates - params', params);

    let siteId = Number(params.siteid);
    const siteDates = await getSiteDates(siteId);

    //console.log('siteDates', siteDates);

    const jsonYW = JSON.stringify(siteDates);
    const jsonResultYW: SiteDateYearSiteDates[] = JSON.parse(jsonYW);

    return json({
        success: true,
        siteDates: jsonResultYW,
    });
}
