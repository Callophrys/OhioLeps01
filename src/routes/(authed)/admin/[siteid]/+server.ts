import { getSiteData } from '$lib/database/sites';
import { getSiteDataFlat } from '$lib/database/sites';
import type { SiteDateYearSiteDates } from '$lib/types.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }: any) {
    console.log('getSiteData from /admin/c/[siteId]/+server.ts');
    let siteId = Number(params.siteid);
    console.log('siteId', siteId);
    const siteData = await getSiteDataFlat(siteId);
    console.log('siteData', siteData);

    // const jsonYW = JSON.stringify(siteData);
    // const jsonResultYW: any[] = JSON.parse(jsonYW);

    return json({ success: true, siteData: siteData });
    // return json({ success: true, siteData: jsonResultYW });
}
