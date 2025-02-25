import { updated } from "$app/stores";
import prisma from "$lib/prisma";
import type { SiteDateObservation } from "@prisma/client";

export async function getSiteDateObservations(
  siteDateId: number = 0,
  checklistId: number = 0,
  siteId: number = 0,
) {
  if (siteDateId > 0) {
    if (checklistId > 0) {
      return await getSiteDateObservationsBySiteDateAndChecklist(
        siteDateId,
        checklistId,
      );
    } else {
      return await getSiteDateObservationsBySiteDate(siteDateId);
    }
  } else if (checklistId > 0) {
    return await getSiteDateObservationsByChecklist(checklistId);
  } else {
    return await getSiteDateObservationsAll(siteId);
  }
}

export async function getSiteDateObservationsBySiteDate(siteDateId: number) {
  const siteDateObservations = await prisma.siteDateObservation.findMany({
    where: {
      siteDateId: siteDateId,
    },
    include: {
      checklist: true,
      siteDate: true,
    },
    orderBy: [
      { checklist: { genus: "asc" } },
      { checklist: { species: "asc" } },
      { checklist: { subspecies: { sort: "asc", nulls: "first" } } },
    ],
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

export async function getSiteDateObservationsBySiteDateAndChecklist(
  siteDateId: number,
  checklistId: number,
) {
  const siteDateObservations = await prisma.siteDateObservation.findMany({
    where: {
      siteDateId: siteDateId,
      checklistId: checklistId,
    },
    include: {
      checklist: true,
      siteDate: true,
    },
  });

  return siteDateObservations;
}

export async function getSiteDateObservation(siteDateObservationId: number) {
  const siteDateObservation = await prisma.siteDateObservation.findUnique({
    where: {
      id: siteDateObservationId,
    },
  });

  return siteDateObservation;
}

export async function getSiteDateObservationBySiteDateObservation(
  siteDateObservationId: number,
) {
  const siteDateObservation = await prisma.siteDateObservation.findUnique({
    where: {
      id: siteDateObservationId,
    },
    include: {
      checklist: true,
      createdBy: true,
      updatedBy: true,
      confirmBy: true,
      siteDate: true,
    },
  });

  return siteDateObservation;
}

export async function getSiteDateObservationsAll(siteId: number) {
  const siteDateObservations = await prisma.siteDateObservation.findMany({
    where: {
      siteDate: {
        id: siteId,
      },
    },
    include: {
      siteDate: true,
    },
  });
  return siteDateObservations;
}

export async function createSiteDateObservation(
  siteDateObservation: SiteDateObservation,
) {
  const createdSiteDateObservation = await prisma.siteDateObservation.create({
    data: {
      siteDateId: siteDateObservation.siteDateId,
      seqId: siteDateObservation.seqId,
      checklistId: siteDateObservation.checklistId,
      idCode: siteDateObservation.idCode,
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
      createdAt: siteDateObservation.createdAt,
      createdById: siteDateObservation.createdById,
    },
  });
  return createdSiteDateObservation;
}

export async function deleteSiteDateObservation(
  siteDateObservationId: number,
  deleteState: boolean,
  userId: string,
) {
  return await prisma.siteDateObservation.update({
    where: {
      id: siteDateObservationId,
    },
    data: {
      deleted: deleteState,
      updatedAt: new Date().toISOString(),
      updatedById: userId,
    },
  });
}

async function siteDateObservationBySiteDateChecklist(
  siteDateId: number,
  checklistId: number | null,
) {
  const siteDateObservation = await prisma.siteDateObservation.findFirst({
    where: {
      siteDateId: siteDateId,
      checklistId: checklistId,
    },
    include: {
      checklist: true,
    },
  });
  return siteDateObservation;
}

export async function nextOrLastSiteDateObservationByCommon(
  siteDateId: number,
  currentChecklistId: number | null,
) {
  const sss =
    "select lead(c.id) over (order by c.commonName) checklistId from siteDateObservation o inner join checklist c on c.id = o.checklistid where o.siteDateId = " +
    siteDateId;
  const result = await prisma.$queryRaw<number>`${sss}`;
  console.log("result***", result);

  const siteDateObservation = siteDateObservationBySiteDateChecklist(
    siteDateId,
    result,
  );
  return siteDateObservation;
}

export async function nextOrLastSiteDateObservationByLatin(
  siteDateId: number,
  currentChecklistId: number,
) {
  const obj = await prisma.$queryRaw<number[]>`
select coalesce(z.checklistIdTarget, z.checklistId) result
from (select o.id
           , o.checklistId
           , lead(c.id) over (order by c.commonName) checklistIdTarget
      from siteDateObservation o
      inner join checklist c on c.id = o.checklistid
      where o.siteDateId = ${siteDateId}
) z
where z.checklistId = ${currentChecklistId}`;
  console.log("result***", obj);
  const foo: any = obj?.shift();
  //const result = typeof foo === 'undefined' ? null : foo;
  const { result } = foo;
  const targetChecklistId: number | null = Number(result);

  const siteDateObservation = siteDateObservationBySiteDateChecklist(
    siteDateId,
    targetChecklistId,
  );
  return siteDateObservation;
}

export async function prevOrFirstSiteDateObservationByCommon(
  siteDateId: number,
  currentChecklistId: number,
) {
  const sss =
    "select lag(c.id) over (order by c.commonName) checklistId from siteDateObservation o inner join checklist c on c.id = o.checklistid where o.siteDateId = " +
    siteDateId;
  const result = await prisma.$queryRaw<number>`${sss}`;
  console.log("result***", result);

  const siteDateObservation = siteDateObservationBySiteDateChecklist(
    siteDateId,
    result,
  );
  return siteDateObservation;
}

export async function prevOrFirstSiteDateObservationByLatin(
  siteDateId: number,
  currentChecklistId: number,
) {
  const sss =
    "select lag(c.id) over (order by c.genus, c.species, c.subspecies) checklistId from siteDateObservation o inner join checklist c on c.id = o.checklistid where o.siteDateId = " +
    siteDateId;
  const result = await prisma.$queryRaw<number>`${sss}`;
  console.log("result***", result);

  const siteDateObservation = siteDateObservationBySiteDateChecklist(
    siteDateId,
    result,
  );
  return siteDateObservation;
}

export async function reviewSiteDateObservation(
  siteDateObservationId: number,
  confirm: boolean,
  userId: string,
) {
  const siteDateObservation = await prisma.siteDateObservation.update({
    where: {
      id: siteDateObservationId,
    },
    data: {
      confirmed: confirm,
      confirmAt: new Date().toISOString(),
      confirmById: userId,
    },
  });
  return siteDateObservation;
}

export async function updateSiteDateObservation(
  siteDateObservation: SiteDateObservation,
) {
  const updatedSiteDateObservation = await prisma.siteDateObservation.update({
    where: {
      id: siteDateObservation.id,
    },
    data: {
      idCode: siteDateObservation.idCode,
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
      updatedById: siteDateObservation.updatedById,
    },
  });
  return updatedSiteDateObservation;
}
