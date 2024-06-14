// import { fail } from '@sveltejs/kit';
// import { browser } from '$app/environment';
// import { redirect } from '@sveltejs/kit';
import type { SiteDate } from '@prisma/client';
import type { Actions } from '@sveltejs/kit';
import type { Weather } from '@prisma/client';
import { addSiteDate } from '$lib/database/sitedates';

export async function load({ params } : any) {
    console.log(params);
    return {
        siteId: params.siteId,
    };
}

/*
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
*/

export const actions: Actions = {
    addSiteDate: async ({ request, locals }) => {
        const formData = await request.formData();
        const siteId = Number(formData.get('siteId'));
        // console.log(formData);

        const siteDate: SiteDate = { siteDateId: -1,
            //week Int
            siteId: siteId,
            recordDate: new Date(String(formData.get('recordDate'))),
            recorder: String(formData.get('recorder')),
            startTime: new Date(String(formData.get('startTime'))),
            endTime: new Date(String(formData.get('endTime'))),
            startTemp: Number(formData.get('startTemp')),
            endTemp: Number(formData.get('endTemp')),
            startClouds: Number(formData.get('startClouds')),
            endClouds: Number(formData.get('endClouds')),
            startWindDir: String(formData.get('startWindDir')),
            endWindDir: String(formData.get('endWindDir')),
            startWindMPH: Number(formData.get('startWindMPH')),
            endWindMPH: Number(formData.get('endWindMPH')),
            w1: String(formData.get('w1')) as Weather,
            w2: String(formData.get('w2')) as Weather,
            w3: String(formData.get('w3')) as Weather,
            w4: String(formData.get('w4')) as Weather,
            w5: String(formData.get('w5')) as Weather,
            w6: String(formData.get('w6')) as Weather,
            w7: String(formData.get('w7')) as Weather,
            w8: String(formData.get('w8')) as Weather,
            w9: String(formData.get('w9')) as Weather,
            w10: String(formData.get('w10')) as Weather,
            w11: String(formData.get('w11')) as Weather,
            w12: String(formData.get('w12')) as Weather,
            w13: String(formData.get('w13')) as Weather,
            w14: String(formData.get('w14')) as Weather,
            w15: String(formData.get('w15')) as Weather,
            lEsec1: String(formData.get('lEsec1')),
            lEsec2: String(formData.get('lEsec2')),
            lEsec3: String(formData.get('lEsec3')),
            lEsec4: String(formData.get('lEsec4')),
            lEsec5: String(formData.get('lEsec5')),
            lEsec6: String(formData.get('lEsec6')),
            lEsec7: String(formData.get('lEsec7')),
            lEsec8: String(formData.get('lEsec8')),
            lEsec9: String(formData.get('lEsec9')),
            lEsec10: String(formData.get('lEsec10')),
            lEsec11: String(formData.get('lEsec11')),
            lEsec12: String(formData.get('lEsec12')),
            lEsec13: String(formData.get('lEsec13')),
            lEsec14: String(formData.get('lEsec14')),
            lEsec15: String(formData.get('lEsec15')),
            larvaObA: String(formData.get('larvaObA')),
            larvaObB: String(formData.get('larvaObB')),
            larvaObC: String(formData.get('larvaObC')),
            larvaObD: String(formData.get('larvaObD')),
            energySource1: String(formData.get('energySource1')),
            energySource2: String(formData.get('energySource2')),
            energySource3: String(formData.get('energySource3')),
            energySource4: String(formData.get('energySource4')),
            flowersInBloom: String(formData.get('flowersInBloom')),
            fieldNotes: String(formData.get('fieldNotes')),
            createdAt: new Date(),
            createdById: locals.user.id,
            updatedAt: null,
            updatedById: null,
        };

        const newSiteDate: SiteDate = await addSiteDate(siteDate);
        return { action: 'create', success: true, data: newSiteDate };
    },
};
