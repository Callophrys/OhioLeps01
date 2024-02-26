import { updated } from '$app/stores';
import prisma from '$lib/prisma'
import type { SiteDateObservation } from '@prisma/client';

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
            createdBy: true,
            updatedBy: true,
            confirmBy: true,
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

export async function createSiteDateObservation(siteDateObservation: SiteDateObservation) {
    const createdSiteDateObservation = await prisma.siteDateObservation.create({
        data: siteDateObservation
    });
    return createdSiteDateObservation;
}

export async function reviewSiteDateObservation(siteDateObservationId: number, confirm: boolean, userId: string) {
    const siteDateObservation = await prisma.siteDateObservation.update({
        where: {
            siteDateObservationId: siteDateObservationId
        },
        data: {
            confirmed: confirm,
            confirmAt: new Date().toISOString(),
            confirmById: userId
        }
    });
    return siteDateObservation;
}

export async function updateSiteDateObservation(siteDateObservation: SiteDateObservation) {
    const updatedSiteDateObservation = await prisma.siteDateObservation.update({
        where: {
            siteDateObservationId: siteDateObservation.siteDateObservationId
        },
        data: {
            section1: siteDateObservation.section1,
            section2: siteDateObservation.section2,
            section3: siteDateObservation.section3,
            section4: siteDateObservation.section4,
            section5: siteDateObservation.section5,
            section6: siteDateObservation.section6,
            section7: siteDateObservation.section7,
            section8: siteDateObservation.section8,
            section9: siteDateObservation.section9,
            section10: siteDateObservation.section10,
            section11: siteDateObservation.section11,
            section12: siteDateObservation.section12,
            section13: siteDateObservation.section13,
            section14: siteDateObservation.section14,
            section15: siteDateObservation.section15,
            updatedAt: siteDateObservation.updatedAt,
            updatedById: siteDateObservation.updatedById
        }
    });
    return updatedSiteDateObservation;
}