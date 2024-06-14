import prisma from '$lib/prisma';
import type { SiteDate } from '@prisma/client';

export async function getSiteDate(siteDateId: number) {
    console.log('ok');
    const siteDate = await prisma.siteDate.findFirst({
        where: {
            siteDateId: siteDateId,
        },
        include: {
            site: {
                select: {
                    siteName: true,
                },
            },
            siteDateObservations: true,
        },
    });

    return siteDate;
}

export async function getSiteDates(siteId: number) {
    //console.log('ok', siteId);
    const siteDates = await prisma.siteDate.findMany({
        where: {
            siteId: siteId,
        },
        orderBy: [
            {
                recordDate: 'asc',
            },
            {
                week: 'asc',
            },
        ],
    });

    //console.log('siteDates', siteDates);
    return siteDates;
}

export async function getSiteDatesAll() {
    const siteDates = await prisma.siteDate.findMany({
        include: {
            site: true,
        },
        orderBy: [
            {
                siteId: 'asc',
            },
            {
                recordDate: 'asc',
            },
            {
                week: 'asc',
            },
        ],
    });

    return siteDates;
}

export async function getSiteDateSiteDates(siteDateId: number) {
    const siteDateSiteDates = await prisma.siteDate.findUnique({
        where: {
            siteDateId: siteDateId,
        },
        include: {
            site: {
                include: {
                    siteDates: true,
                },
            },
        },
    });

    return siteDateSiteDates?.site.siteDates;
}

export async function addSiteDate(siteDate: SiteDate) {
    console.log('/lib/api/entry/sitedates.ts > addSiteDate');
    const createdSiteDate = await prisma.siteDate.create({
        data: {
            week: -1,
            siteId: siteDate.siteId,
            recordDate: siteDate.recordDate,
            recorder: siteDate.recorder,
            startTime: siteDate.startTime,
            endTime: siteDate.endTime,
            startTemp: siteDate.startTemp,
            endTemp: siteDate.endTemp,
            startClouds: siteDate.startClouds,
            endClouds: siteDate.endClouds,
            startWindDir: siteDate.startWindDir,
            endWindDir: siteDate.endWindDir,
            startWindMPH: siteDate.startWindMPH,
            endWindMPH: siteDate.endWindMPH,
            w1: siteDate.w1,
            w2: siteDate.w2,
            w3: siteDate.w3,
            w4: siteDate.w4,
            w5: siteDate.w5,
            w6: siteDate.w6,
            w7: siteDate.w7,
            w8: siteDate.w8,
            w9: siteDate.w9,
            w10: siteDate.w10,
            w11: siteDate.w11,
            w12: siteDate.w12,
            w13: siteDate.w13,
            w14: siteDate.w14,
            w15: siteDate.w15,
            lEsec1: siteDate.lEsec1,
            lEsec2: siteDate.lEsec2,
            lEsec3: siteDate.lEsec3,
            lEsec4: siteDate.lEsec4,
            lEsec5: siteDate.lEsec5,
            lEsec6: siteDate.lEsec6,
            lEsec7: siteDate.lEsec7,
            lEsec8: siteDate.lEsec8,
            lEsec9: siteDate.lEsec9,
            lEsec10: siteDate.lEsec10,
            lEsec11: siteDate.lEsec11,
            lEsec12: siteDate.lEsec12,
            lEsec13: siteDate.lEsec13,
            lEsec14: siteDate.lEsec14,
            lEsec15: siteDate.lEsec15,
            larvaObA: siteDate.larvaObA,
            larvaObB: siteDate.larvaObB,
            larvaObC: siteDate.larvaObC,
            larvaObD: siteDate.larvaObD,
            energySource1: siteDate.energySource1,
            energySource2: siteDate.energySource2,
            energySource3: siteDate.energySource3,
            energySource4: siteDate.energySource4,
            flowersInBloom: siteDate.flowersInBloom,
            fieldNotes: siteDate.fieldNotes,
            createdAt: siteDate.createdAt,
            createdById: siteDate.createdById,
        },
    });

    return createdSiteDate;
}
