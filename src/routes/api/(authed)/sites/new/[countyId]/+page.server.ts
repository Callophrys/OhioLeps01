import { fail } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import type { Site, County } from '@prisma/client';
import type { SiteCounty } from '$lib/types.js';
import { getSitesByCounty, getSites } from '$lib/database/sites.js';
import { getCountiesExpanded } from '$lib/database/counties.js';
import type { Actions } from '@sveltejs/kit';
import { addSite, exists } from '$lib/database/sites.js';

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
        // console.log(formData);
        // 

        let siteName = String(formData.get('siteName'));
        let countyId = Number(formData.get('countyId'));

        if (!siteName) {
            console.log('Sitename missing');
            return fail(400, { siteName, missing: true });
        }

        let result = await exists(siteName, countyId);
        if (result) {
            console.log('Sitename already exists');
            return fail(400, { siteName, duplicate: true });
        }

        const site: Site = {
            siteId: -1,
            stateId: Number(formData.get('stateId')),
            countyId: countyId,
            siteName: siteName,
            township: String(formData.get('township')),
            locationZip: String(formData.get('locationZip')),
            siteAddress: String(formData.get('siteAddress')),
            siteAddress2: String(formData.get('siteAddress2')),
            siteCityStateZip: String(formData.get('siteCityStateZip')),
            person: String(formData.get('person')),
            address: String(formData.get('address')),
            address2: String(formData.get('address2')),
            cityStateZip: String(formData.get('cityStateZip')),
            phone: String(formData.get('phone')),
            email: String(formData.get('email')),
            latitudeStart: String(formData.get('latitudeStart')),
            latitudeEnd: String(formData.get('latitudeEnd')),
            longitudeStart: String(formData.get('longitudeStart')),
            longitudeEnd: String(formData.get('longitudeEnd')),
            altPerson: String(formData.get('altPerson')),
            altAddress: String(formData.get('altAddress')),
            altAddress2: String(formData.get('altAddress2')),
            altCityStateZip: String(formData.get('altCityStateZip')),
            altPhone: String(formData.get('altPhone')),
            altEmail: String(formData.get('altEmail')),
            otherParticipants: String(formData.get('otherParticipants')),
            description: String(formData.get('description')),
            s1995: 0,
            s1996: 0,
            s1997: 0,
            s1998: 0,
            s1999: 0,
            s2000: 0,
            s2001: 0,
            s2002: 0,
            s2003: 0,
            s2004: 0,
            createdAt: new Date(),
            createdById: locals.user.id,
            updatedAt: null,
            updatedById: null,
        };

        const newSite: Site = await addSite(site);
        return { action: 'create', success: true, data: newSite };
    },
};
