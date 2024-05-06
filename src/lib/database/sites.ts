import prisma from '$lib/prisma';
import type { Site } from '@prisma/client';

/**
 * Obtain site details including county, yearly statuses, and observation dates
 * @param siteId
 * @returns
 */
export async function getSite(siteId: number) {
    console.log('/lib/api/entry/sites.ts > getSite', siteId);

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
    console.log('/lib/api/entry/sites.ts > getSites');

    let whereClause =
        idList && idList.length
            ? {
                  id: { in: idList },
              }
            : true;

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
            siteAddress: site.siteAddress,
            siteAddress2: site.siteAddress2,
            siteCityStateZip: site.siteCityStateZip,
            person: site.person,
            address: site.address,
            address2: site.address2,
            cityStateZip: site.cityStateZip,
            phone: site.phone,
            email: site.email,
            latitudeStart: site.latitudeStart,
            latitudeEnd: site.latitudeEnd,
            longitudeStart: site.longitudeStart,
            longitudeEnd: site.longitudeEnd,
            altPerson: site.altPerson,
            altAddress: site.altAddress,
            altAddress2: site.altAddress2,
            altCityStateZip: site.altCityStateZip,
            altPhone: site.altPhone,
            altEmail: site.altEmail,
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
