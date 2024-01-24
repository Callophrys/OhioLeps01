import prisma from '$lib/prisma'

export async function getSiteObservations(siteDateId: number = 0, checklistId: number = 0) {
    if (siteDateId > 0) {
        if (checklistId > 0) {
            return await getSiteObservationsBySiteDateAndChecklist(siteDateId, checklistId);
        } else {
            return await getSiteObservationsBySiteDate(siteDateId);
        }
    } else if (checklistId > 0) {
        return await getSiteObservationsByChecklist(checklistId);
    } else {
        return await getSiteObservationsAll();
    }
}

export async function getSiteObservationsBySiteDate(siteDateId: number) {
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

export async function getSiteObservationsBySiteDateAndChecklist(siteDateId: number, checklistId: number) {
    const siteObservations = await prisma.siteObservation.findMany({
        where: {
            siteDateId: siteDateId,
            checklistId: checklistId,
        }
    });
    return siteObservations;
}

export async function getSiteObservationsAll() {
    const siteObservations = await prisma.siteObservation.findMany();
    return siteObservations;
}