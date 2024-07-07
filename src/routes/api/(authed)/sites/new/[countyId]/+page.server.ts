import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import type { Site, County, State } from '@prisma/client';
import { getCountiesExpanded, getStates } from '$lib/database/counties.js';
import type { Actions } from '@sveltejs/kit';
import { addSite, exists } from '$lib/database/sites.js';

export async function load({ cookies, url, params }: { cookies: any; url: any; params: any }) {
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

    const states = await getStates();

    const jsonS = JSON.stringify(states);
    const jsonResultS: State[] = JSON.parse(jsonS);

    return { counties: jsonResultC, states: jsonResultS, refCountyId: countyId, countyId: params.countyId };
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
            siteCity: String(formData.get('siteCity')),
            siteState: String(formData.get('siteState')),
            siteZip: String(formData.get('siteZip')),
            person: String(formData.get('person')),
            personAddress: String(formData.get('Address')),
            personAddress2: String(formData.get('Address2')),
            personCity: String(formData.get('City')),
            personState: String(formData.get('State')),
            personZip: String(formData.get('Zip')),
            personPhone: String(formData.get('personPhone')),
            personPhone2: String(formData.get('personPhone2')),
            personEmail: String(formData.get('personEmail')),
            latitudeStart: String(formData.get('latitudeStart')),
            latitudeEnd: String(formData.get('latitudeEnd')),
            longitudeStart: String(formData.get('longitudeStart')),
            longitudeEnd: String(formData.get('longitudeEnd')),
            altPerson: String(formData.get('altPerson')),
            altPersonAddress: String(formData.get('altPersonAddress')),
            altPersonAddress2: String(formData.get('altPersonAddress2')),
            altPersonCity: String(formData.get('altPersonCity')),
            altPersonState: String(formData.get('altPersonState')),
            altPersonZip: String(formData.get('altPersonZip')),
            altPersonPhone: String(formData.get('altPersonPhone')),
            altPersonPhone2: String(formData.get('altPersonPhone2')),
            altPersonEmail: String(formData.get('altPersonEmail')),
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
