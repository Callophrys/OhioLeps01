import { ROLE } from '$lib/types';
import type { Actions } from '@sveltejs/kit';
import type { Audit, County, Site, State } from '@prisma/client';
import type { ChangelessSite, SiteCountyState } from '$lib/types';
import { createAudit } from '$lib/database/audit';
import { createSite, existsInState, getSite, getSites, removeSite } from '$lib/database/sites.js';
import { fail } from '@sveltejs/kit';
import { getCounties, getStates } from '$lib/database/counties.js';
import { lockUser } from '$lib/database/users';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, url }: { cookies: any; url: any }) {
    // TODO: fix the issue where user refreshes and 500 error appears
    console.log('Load from /api/sites/+page.server.ts');

    // SECURITY - only checking session NOT user or role at this time
    if (!cookies.get('session')) {
        throw redirect(303, `/login?redirectTo=${url.pathname}`);
    }

    const [counties, sites, states] = await Promise.all([getCounties(), getSites(null), getStates()]);

    const jsonCounties = JSON.stringify(counties);
    const jsonResultCounties: County[] = JSON.parse(jsonCounties);

    const jsonSites = JSON.stringify(sites);
    const jsonResultSites: SiteCountyState[] = JSON.parse(jsonSites);

    const jsonStates = JSON.stringify(states);
    const jsonResultStates: State[] = JSON.parse(jsonStates);

    // console.log(jsonResult);
    return { counties: jsonResultCounties, sites: jsonResultSites, states: jsonResultStates };
}

async function lockOutUser(locals: any, issue: string) {
    await Promise.all([
        lockUser(locals.user.id, true),
        createAudit({
            id: -1,
            auditType: 'Security',
            ipAddress: 'localhost',
            userName: locals.user.name,
            userId: locals.user.id,
            organizationId: locals.user.organizationId,
            description: `Illegal ${issue} attempt by user '${locals.user.name}' with role ${locals.user.role}`,
        } as Audit),
    ]);
}

function prepareSite(formData: FormData, siteId: number, siteName: string): ChangelessSite {
    return {
        siteId: siteId,
        stateId: Number(formData.get('stateId')),
        countyId: Number(formData.get('countyId')),
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
    };
}

export const actions: Actions = {
    createSite: async ({ request, locals }) => {
        const formData = await request.formData();
        // console.log(formData);
        //

        if (locals.user.role !== ROLE.SUPER && locals.user.role !== ROLE.ADMIN) {
            // It would take some hacking or trickery to get here.  Lock them out.
            await lockOutUser(locals, 'site create');
            return fail(400, { invalid: true });
        }

        let siteName = String(formData.get('siteName'));

        if (!siteName) {
            console.log('Sitename missing');
            return fail(400, { siteName, missing: true });
        }

        let stateId = Number(formData.get('stateId'));
        if (await existsInState(siteName, stateId)) {
            console.log('Sitename already exists in state');
            return fail(400, { siteName, duplicate: true });
        }

        const site: ChangelessSite = prepareSite(formData, -1, siteName);
        const newSite: Site = await createSite(site, locals.user.id);

        await createAudit({
            id: -1,
            auditType: 'Site Create',
            ipAddress: 'localhost',
            userName: locals.user.name,
            userId: locals.user.id,
            siteId: newSite.siteId,
            organizationId: locals.user.organizationId,
            description: `New site '${newSite.siteName}' created`,
        } as Audit);

        return { action: 'create', success: true, data: newSite };
    },

    getSite: async ({ request, params }: { request: any; params: any }) => {
        console.log('getSite from /api/sites/+page.server.ts');
        let siteId: number = Number(params.siteId);
        const site = await getSite(siteId);

        return { success: true, data: site };
    },

    removeSite: async ({ request }: { request: any }) => {
        console.log('removeSite from /api/sites/+page.server.ts');
        const formData = await request.formData();
        const siteId = Number(formData.get('siteId') ?? 0);
        console.log('siteId:', siteId);

        await removeSite(siteId);
        return { success: true };
    },
};
