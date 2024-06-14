import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { addSite, getSite, getSites, removeSite } from '$lib/database/sites.js';
import type { SiteCountyState } from '$lib/types';

export async function load({ cookies, url } : { cookies: any; url: any; }) {
    // TODO: fix the issue where user refreshes and 500 error appears
    console.log('Load from /api/sites/+page.server.ts');

    // SECURITY - only checking session NOT user or role at this time
    if (!cookies.get('session')) {
        throw redirect(303, `/login?redirectTo=${url.pathname}`);
    }

    const sites = await getSites(null);
    const json = JSON.stringify(sites);
    const jsonResult: SiteCountyState[] = JSON.parse(json);

    // console.log(jsonResult);
    return { sites: jsonResult };
}

export const actions = {
    addSite: async ({ request } : any) => {
        console.log('addSite from /api/sites/+page.server.ts');
        const formData = await request.formData();
        const site = formData.get('site');

        if (!site) {
            return fail(400, { site, missing: true });
        }

        await addSite(site);
        return { success: true };
    },

    getSite: async ({ request } : any) => {
        console.log('getSite from /api/sites/+page.server.ts');
        const formData = await request.formData();
        let siteId: number = Number(formData.get('siteId') ?? 0);
        const site = await getSite(siteId);

        return { success: true, data: site };
    },

    removeSite: async ({ request } : any) => {
        console.log('removeSite from /api/sites/+page.server.ts');
        const formData = await request.formData();
        const siteId = Number(formData.get('siteId') ?? 0);
        console.log('siteId:', siteId);

        await removeSite(siteId);
        return { success: true };
    },
};
