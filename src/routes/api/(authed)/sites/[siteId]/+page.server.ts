import { ROLE } from '$lib/types.js';
import type { Actions } from '@sveltejs/kit';
import type { Audit, County, Site, State } from '@prisma/client';
import type { SiteCountyState, SiteCountySiteDatesSiteStatuses, ChangelessSite } from '$lib/types.js';
import { createAudit } from '$lib/database/audit';
import { createSite, existsInState, updateSite } from '$lib/database/sites.js';
import { error, fail } from '@sveltejs/kit';
import { getCounties, getStates } from '$lib/database/counties.js';
import { getSite, getSites } from '$lib/database/sites';
import { lockUser } from '$lib/database/users';

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

function prepareSite(formData: FormData, siteId: number, siteName: string): any {
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

    updateSite: async ({ request, locals }) => {
        const formData = await request.formData();
        // console.log(formData);

        if (locals.user.role !== ROLE.SUPER && locals.user.role !== ROLE.ADMIN) {
            // It would take some hacking or trickery to get here.  Lock them out.
            await lockOutUser(locals, 'site update');
            return fail(400, { invalid: true });
        }

        let siteName = String(formData.get('siteName'));

        if (!siteName) {
            console.log('Sitename missing');
            return fail(400, { siteName, missing: true });
        }

        const siteId = Number(formData.get('siteId'));
        const site: ChangelessSite = prepareSite(formData, siteId, siteName);
        const updatedSite: Site = await updateSite(site, locals.user.id);

        await createAudit({
            id: -1,
            auditType: 'Site Update',
            ipAddress: 'localhost',
            userName: locals.user.name,
            userId: locals.user.id,
            siteId: updatedSite.siteId,
            organizationId: locals.user.organizationId,
            description: `Site '${updatedSite.siteName}' updated`,
        } as Audit);

        return { action: 'create', success: true, data: updatedSite };
    },
};
