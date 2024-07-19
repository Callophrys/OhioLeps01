import { ROLE } from '$lib/types';
import type { Actions } from '@sveltejs/kit';
import type { Audit } from '@prisma/client';
import type { Site, County, State } from '@prisma/client';
import { createSite, existsInState, updateSite } from '$lib/database/sites.js';
import { createAudit } from '$lib/database/audit';
import { fail, redirect } from '@sveltejs/kit';
import { lockUser } from '$lib/database/users';
import { getCountiesExpanded, getStates } from '$lib/database/counties.js';

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
    createSite: async ({ request, locals }) => {
        const formData = await request.formData();
        // console.log(formData);
        //

        if (locals.user.role !== ROLE.SUPER && locals.user.role !== ROLE.ADMIN) {
            await Promise.all([
                lockUser(locals.user.id, true),
                createAudit({
                    id: -1,
                    auditType: 'Security',
                    ipAddress: 'localhost',
                    userName: locals.user.name,
                    userId: locals.user.id,
                    organizationId: locals.user.organizationId,
                    description: `Illegal site create attempt by user '${locals.user.name}' with role ${locals.user.role}`,
                } as Audit),
            ]);

            return fail(400, { invalid: true });
        }

        let siteName = String(formData.get('siteName'));
        let countyId = Number(formData.get('countyId'));
        let stateId = Number(formData.get('stateId'));

        if (!siteName) {
            console.log('Sitename missing');
            return fail(400, { siteName, missing: true });
        }

        let result = await existsInState(siteName, stateId);
        if (result) {
            console.log('Sitename already exists in state');
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

        const newSite: Site = await createSite(site);

        await createAudit({
            id: -1,
            auditType: 'Site Create',
            ipAddress: 'localhost',
            userName: locals.user.name,
            userId: locals.user.id,
            siteId: newSite.siteId,
            description: `New site '${newSite.siteName}' created`,
        } as Audit);

        return { action: 'create', success: true, data: newSite };
    },
};
