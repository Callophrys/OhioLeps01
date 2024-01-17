import prisma from '$lib/prisma'

export async function getSiteObservations() {
    const siteObservations = await prisma.siteObservation.findMany({
        include: {
            siteDate: {
                include: {
                    site: true
                }
            },
            checklist: true
        },
    });
    return siteObservations;
}