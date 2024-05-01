import { fail } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import type { Site, County } from '@prisma/client';
import type { SiteCounty } from '$lib/types.js';
import { getSitesByCounty, getSites } from '$lib/database/sites.js';
import { getCountiesExpanded } from '$lib/database/counties.js';
import type { Actions } from '@sveltejs/kit';
import { addSite } from '$lib/database/sites.js';

export async function load({ cookies, url, params }) {
    // SECURITY - only checking session NOT user or role at this time
    if (!cookies.get('session')) {
        throw redirect(303, `/login?redirectTo=${url.pathname}`);
    }

    let countyId = Number(params.countyId);
    console.log(countyId);
    const counties = await getCountiesExpanded();

    const jsonC = JSON.stringify(counties);
    const jsonResultC: County[] = JSON.parse(jsonC);
    // console.log(jsonResultC);

    return { counties: jsonResultC, refCountyId: countyId, countyId: params.countyId };
}

export const actions: Actions = {
    addSite: async ({ request, locals }) => {
        const formData = await request.formData();
        console.log(formData);

        let siteName = String(formData.get('siteName'));

        if (!siteName) {
            return fail(400, { siteName, missing: true });
        }

        if (siteName.toLowerCase() === 'dogs') {
            return fail(400, { siteName, duplicate: true });
        }

        // if (!siteDetails) {
        //     return fail(400, { siteDetails, missing: true });
        // }

        // const site: Site = await addSite();
        // await addSite(site);
        // return { action: 'create', success: true, data: site };
    },
};
