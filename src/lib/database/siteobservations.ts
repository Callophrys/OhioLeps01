import prisma from '$lib/prisma'

export async function getSiteObservations(siteDateId: number = 0, checklistId: number = 0, siteId: number = 0) {
    if (siteDateId > 0) {
        if (checklistId > 0) {
            return await getSiteObservationBySiteDateAndChecklist(siteDateId, checklistId);
        } else {
            return await getSiteObservationBySiteDate(siteDateId);
        }
    } else if (checklistId > 0) {
        return await getSiteObservationsByChecklist(checklistId);
    } else {
        return await getSiteObservationsAll(siteId);
    }
}

export async function getSiteObservationBySiteDate(siteDateId: number) {
    const siteObservations = await prisma.siteObservation.findMany({
        where: {
            siteDateId: siteDateId,
        },
        include: {
            checklist: true
        },
    });
    return siteObservations;
}

export async function getSiteObservationsByChecklist(checklistId: number) {
    const siteObservations = await prisma.siteObservation.findMany({
        where: {
            checklistId: checklistId,
        },
        include: {
            siteDate: true,
        },
    });
    return siteObservations;
}

export async function getSiteObservationBySiteDateAndChecklist(siteDateId: number, checklistId: number) {
    const siteObservations = await prisma.siteObservation.findMany({
        where: {
            siteDateId: siteDateId,
            checklistId: checklistId,
        }
    });
    return siteObservations;
}

export async function getSiteObservationBySiteObservation(siteObservationId: number) {
    const siteObservations = await prisma.siteObservation.findUnique({
        where: {
            siteObservationId: siteObservationId,
        },
        include: {
            checklist: true,
        },
    });
    return siteObservations;
}

export async function getSiteObservationsAll(siteId: number) {
    const siteObservations = await prisma.siteObservation.findMany({
        where: {
            siteDate: {
                siteId: siteId
            }
        },
        include: {
            siteDate: true
        }
    });
    return siteObservations;
}