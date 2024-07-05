import prisma from '$lib/prisma';
import type { Site } from '@prisma/client';

/**
 * Obtain site details including county, yearly statuses, and observation dates
 * @param siteId
 * @returns
 */
export async function getSite(siteId: number) {
    // console.log('/lib/api/entry/sites.ts > getSite', siteId);

    const site = await prisma.site.findUnique({
        where: {
            siteId: siteId,
        },
        include: {
            county: {
                select: {
                    id: true,
                    name: true,
                    regionId: true,
                    stateId: true,
                },
            },
            siteStatuses: {
                include: {
                    statusCode: true,
                },
            },
            siteDates: true,
        },
    });

    return site;
}

export async function getSiteData(siteId: number) {
    const site = await prisma.site.findUnique({
        where: {
            siteId: siteId,
        },
        include: {
            siteDates: true,
        },
    });

    return site;
}

// TODO: Maybe make table to hold township
export async function getSiteDataFlat(siteId: number) {
    const result = await prisma.$queryRaw`
select s.siteName
, s.township
, s.locationZip
, s.siteAddress
, s.siteAddress2
, s.siteCity
, s.siteState
, s.siteZip
, s.person
, s.personAddress
, s.personAddress2
, s.personCity
, s.personState
, s.personZip
, s.personPhone
, s.personPhone2
, s.personEmail
, s.latitudeStart
, s.latitudeEnd
, s.longitudeStart
, s.longitudeEnd
, s.altPerson
, s.altPersonAddress
, s.altPersonAddress2
, s.altPersonCity
, s.altPersonState
, s.altPersonZip
, s.altPersonPhone
, s.altPersonPhone2
, s.altPersonEmail
, s.otherParticipants
, s.description
, y.name county
, a.name state
, s.createdAt siteCreatedAt
, s.updatedAt siteUpdatedAt
, s.createdById siteCreatedBy
, s.updatedById siteUpdatedBy
, d.recordDate
, d.week
, d.recorder
, d.startTime
, d.endTime
, d.startTemp
, d.endTemp
, d.startClouds
, d.endClouds
, d.startWindDir
, d.endWindDir
, d.startWindMPH
, d.endWindMPH
, d.w1
, d.w2
, d.w3
, d.w4
, d.w5
, d.w6
, d.w7
, d.w8
, d.w9
, d.w10
, d.w11
, d.w12
, d.w13
, d.w14
, d.w15
, d.lEsec1
, d.lEsec2
, d.lEsec3
, d.lEsec4
, d.lEsec5
, d.lEsec6
, d.lEsec7
, d.lEsec8
, d.lEsec9
, d.lEsec10
, d.lEsec11
, d.lEsec12
, d.lEsec13
, d.lEsec14
, d.lEsec15
, d.larvaObA
, d.larvaObB
, d.larvaObC
, d.larvaObD
, d.energySource1
, d.energySource2
, d.energySource3
, d.energySource4
, d.flowersInBloom
, d.fieldNotes
, d.deleted weeklyRecordDeleted
, d.confirmed weeklyRecordConfirmed
, d.createdAt weeklyRecordCreatedAt
, d.updatedAt weeklyRecordUpdatedAt
, d.confirmAt weeklyRecordConfirmAt
, d.createdById weeklyRecordCreatedById
, d.updatedById weeklyRecordUpdatedById
, d.confirmById weeklyRecordConfirmById
, o.idCode
, o.section1
, o.section2
, o.section3
, o.section4
, o.section5
, o.section6
, o.section7
, o.section8
, o.section9
, o.section10
, o.section11
, o.section12
, o.section13
, o.section14
, o.section15
, o.mark
, o.deleted speciesRecordDeleted
, o.confirmed speciesRecordConfirmed
, o.createdAt speciesRecordCreatedAt
, o.updatedAt speciesRecordUpdatedAt
, o.confirmAt speciesRecordConfirmAt
, o.createdById speciesRecordCreatedById
, o.updatedById speciesRecordUpdatedById
, o.confirmById speciesRecordConfirmById
, l.hodges
, l.genus
, l.species
, l.subspecies
, l.commonName
, l.show
, l.kind
, l.revised
, l.author
, l.year
, l.referenceCount
, l.countyCount
, l.endangered
, l.synonym
, l.family
, l.gCKey
, l.grp
, l.taxonId
, t.year statusYear
, c.code statusCode
, c.description statusDescription
from site s
inner join siteDate d on d.siteId = s.siteId
inner join siteDateObservation o on o.siteDateId = d.siteDateId
inner join checklist l on l.checklistId = o.checklistId
inner join siteStatus t on t.siteId = s.siteId
inner join statusCode c on c.statusCodeId = t.statusCodeId
inner join county y on y.id = s.countyId
inner join state  a on a.id = s.stateId
where s.siteId = ${siteId}`;
    console.log('result***', result);

    return result;
}
/*
 */

export async function getSitesByCounty(countyId: number) {
    const sites = await prisma.site.findMany({
        where: {
            countyId: countyId,
        },
        include: {
            county: true,
        },
        orderBy: {
            siteName: 'asc',
        },
    });

    return sites;
}

export async function getSites(idList: number[] | null) {
    // console.log('/lib/api/entry/sites.ts > getSites');

    // let whereClause =
    //     idList && idList.length
    //         ? {
    //               id: { in: idList },
    //           }
    //         : true;

    const sites = await prisma.site.findMany({
        where: {
            ...(idList && idList.length ? { siteId: { in: idList } } : {}),
        },
        include: {
            county: {
                select: {
                    name: true,
                    state: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            siteName: 'asc',
        },
    });

    return sites;
}

export async function exists(siteName: string, countyId: number): Promise<boolean> {
    const site = await prisma.site.findFirst({
        select: {
            siteId: true,
        },
        where: {
            siteName: siteName,
            countyId: countyId,
        },
    });

    return site !== null;
}

export async function addSite(site: Site) {
    console.log('/lib/api/entry/sites.ts > addSite');
    const createdSite = await prisma.site.create({
        data: {
            countyId: site.countyId,
            stateId: site.stateId,
            siteName: site.siteName,
            township: site.township,
            locationZip: site.locationZip,
            latitudeStart: site.latitudeStart,
            latitudeEnd: site.latitudeEnd,
            longitudeStart: site.longitudeStart,
            longitudeEnd: site.longitudeEnd,
            siteAddress: site.siteAddress,
            siteAddress2: site.siteAddress2,
            siteCity: site.siteCity,
            siteState: site.siteState,
            siteZip: site.siteZip,
            person: site.person,
            personAddress: site.personAddress,
            personAddress2: site.personAddress2,
            personCity: site.personCity,
            personState: site.personState,
            personZip: site.personZip,
            personPhone: site.personPhone,
            personEmail: site.personEmail,
            altPerson: site.altPerson,
            altPersonAddress: site.altPersonAddress,
            altPersonAddress2: site.altPersonAddress2,
            altPersonCity: site.altPersonCity,
            altPersonState: site.altPersonState,
            altPersonZip: site.altPersonZip,
            altPersonPhone: site.altPersonPhone,
            altPersonEmail: site.altPersonEmail,
            otherParticipants: site.otherParticipants,
            description: site.description,
            createdAt: site.createdAt,
            createdById: site.createdById,
        },
    });

    return createdSite;
}

// Hard delete, we prob need the history and support for undos and auditing and so on.
export async function removeSite(siteId: number) {
    console.log('/lib/api/entry/sites.ts > removeSite');
    await prisma.siteDateObservation.deleteMany({
        where: {
            siteDateId: siteId, // is this right?
        },
    });
    await prisma.siteDate.deleteMany({
        where: {
            siteId: siteId,
        },
    });
    await prisma.site.delete({
        where: {
            siteId: siteId,
        },
    });
}
