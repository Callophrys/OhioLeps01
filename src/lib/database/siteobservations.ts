import prisma from '$lib/prisma'

export async function getSiteDateObservations(siteDateId: number = 0, checklistId: number = 0, siteId: number = 0) {
    if (siteDateId > 0) {
        if (checklistId > 0) {
            return await getSiteDateObservationBySiteDateAndChecklist(siteDateId, checklistId);
        } else {
            return await getSiteDateObservationBySiteDate(siteDateId);
        }
    } else if (checklistId > 0) {
        return await getSiteDateObservationsByChecklist(checklistId);
    } else {
        return await getSiteDateObservationsAll(siteId);
    }
}

export async function getSiteDateObservationBySiteDate(siteDateId: number) {
    const siteDateObservations = await prisma.siteDateObservation.findMany({
        where: {
            siteDateId: siteDateId,
        },
        include: {
            checklist: true
        },
    });
    return siteDateObservations;
}

export async function getSiteDateObservationsByChecklist(checklistId: number) {
    const siteDateObservations = await prisma.siteDateObservation.findMany({
        where: {
            checklistId: checklistId,
        },
        include: {
            siteDate: true,
        },
    });
    return siteDateObservations;
}

export async function getSiteDateObservationBySiteDateAndChecklist(siteDateId: number, checklistId: number) {
    const siteDateObservations = await prisma.siteDateObservation.findMany({
        where: {
            siteDateId: siteDateId,
            checklistId: checklistId,
        }
    });
    return siteDateObservations;
}

export async function getSiteDateObservationBySiteDateObservation(siteDateObservationId: number) {
    const siteDateObservations = await prisma.siteDateObservation.findUnique({
        where: {
            siteDateObservationId: siteDateObservationId,
        },
        include: {
            checklist: true,
        },
    });
    return siteDateObservations;
}

export async function getSiteDateObservationsAll(siteId: number) {
    const siteDateObservations = await prisma.siteDateObservation.findMany({
        where: {
            siteDate: {
                siteId: siteId
            }
        },
        include: {
            siteDate: true
        }
    });
    return siteDateObservations;
}