import prisma from "$lib/prisma";
import type { SiteDate } from "@prisma/client";
import type { Weather } from "@prisma/client";
import { convertSafeJson, privilegeFromName } from "$lib/utils.js";

export async function getSiteDate(siteDateId: BigInt) {
  // console.log('getSiteDate');
  const siteDate = await prisma.siteDate.findFirst({
    where: {
      id: siteDateId,
    },
    include: {
      site: {
        select: {
          siteName: true,
        },
      },
      siteDateObservations: true,
      createdBy: true,
      updatedBy: true,
      confirmBy: true,
    },
  });

  return convertSafeJson(siteDate);
}

export async function getSiteDates(siteId: BigInt): SiteDateYearSiteDates[] {
  const siteDates = await prisma.siteDate.findMany({
    where: {
      siteId: siteId,
    },
    orderBy: [
      {
        recordDate: "asc",
      },
      {
        week: "asc",
      },
    ],
  });

  //console.log('siteDates', siteDates);

  return convertSafeJson(siteDates);
}

export async function getSiteDatesAll() {
  const siteDates = await prisma.siteDate.findMany({
    include: {
      site: true,
    },
    orderBy: [
      {
        siteId: "asc",
      },
      {
        recordDate: "asc",
      },
      {
        week: "asc",
      },
    ],
  });

  return convertSafeJson(siteDates);
}

export async function getSiteDateSiteDates(
  siteDateId: BigInt,
): SiteDateYearSiteDates[] {
  const siteDateSiteDates = await prisma.siteDate.findUnique({
    where: {
      id: siteDateId,
    },
    include: {
      site: {
        include: {
          siteDates: true,
        },
      },
    },
  });

  const siteDates = siteDateSiteDates?.site.siteDates;

  return convertSafeJson(siteDates);
}

export async function addSiteDate(siteDate: SiteDate) {
  console.log("/lib/api/entry/sitedates.ts > addSiteDate");
  const createdSiteDate = await prisma.siteDate.create({
    data: {
      siteId: siteDate.siteId,
      recordDate: siteDate.recordDate,
      week: siteDate.week,
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
      weather1: siteDate.weather1 as Weather,
      weather2: siteDate.weather2,
      weather3: siteDate.weather3,
      weather4: siteDate.weather4,
      weather5: siteDate.weather5,
      weather6: siteDate.weather6,
      weather7: siteDate.weather7,
      weather8: siteDate.weather8,
      weather9: siteDate.weather9,
      weather10: siteDate.weather10,
      weather11: siteDate.weather11,
      weather12: siteDate.weather12,
      weather13: siteDate.weather13,
      weather14: siteDate.weather14,
      weather15: siteDate.weather15,
      larvalEnergy1: siteDate.larvalEnergy1,
      larvalEnergy2: siteDate.larvalEnergy2,
      larvalEnergy3: siteDate.larvalEnergy3,
      larvalEnergy4: siteDate.larvalEnergy4,
      larvalEnergy5: siteDate.larvalEnergy5,
      larvalEnergy6: siteDate.larvalEnergy6,
      larvalEnergy7: siteDate.larvalEnergy7,
      larvalEnergy8: siteDate.larvalEnergy8,
      larvalEnergy9: siteDate.larvalEnergy9,
      larvalEnergy10: siteDate.larvalEnergy10,
      larvalEnergy11: siteDate.larvalEnergy11,
      larvalEnergy12: siteDate.larvalEnergy12,
      larvalEnergy13: siteDate.larvalEnergy13,
      larvalEnergy14: siteDate.larvalEnergy14,
      larvalEnergy15: siteDate.larvalEnergy15,
      larvaObservedA: siteDate.larvaObservedA,
      larvaObservedB: siteDate.larvaObservedB,
      larvaObservedC: siteDate.larvaObservedC,
      larvaObservedD: siteDate.larvaObservedD,
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

  return convertSafeJson(createdSiteDate);
}

export async function updateSiteDate(siteDate: SiteDate) {
  console.log("/lib/api/entry/sitedates.ts > updateSiteDate");
  const updatedSiteDate = await prisma.siteDate.update({
    where: {
      id: siteDate.id,
    },
    data: {
      siteId: siteDate.siteId,
      recordDate: siteDate.recordDate,
      week: siteDate.week,
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
      weather1: siteDate.weather1,
      weather2: siteDate.weather2,
      weather3: siteDate.weather3,
      weather4: siteDate.weather4,
      weather5: siteDate.weather5,
      weather6: siteDate.weather6,
      weather7: siteDate.weather7,
      weather8: siteDate.weather8,
      weather9: siteDate.weather9,
      weather10: siteDate.weather10,
      weather11: siteDate.weather11,
      weather12: siteDate.weather12,
      weather13: siteDate.weather13,
      weather14: siteDate.weather14,
      weather15: siteDate.weather15,
      larvalEnergy1: siteDate.larvalEnergy1,
      larvalEnergy2: siteDate.larvalEnergy2,
      larvalEnergy3: siteDate.larvalEnergy3,
      larvalEnergy4: siteDate.larvalEnergy4,
      larvalEnergy5: siteDate.larvalEnergy5,
      larvalEnergy6: siteDate.larvalEnergy6,
      larvalEnergy7: siteDate.larvalEnergy7,
      larvalEnergy8: siteDate.larvalEnergy8,
      larvalEnergy9: siteDate.larvalEnergy9,
      larvalEnergy10: siteDate.larvalEnergy10,
      larvalEnergy11: siteDate.larvalEnergy11,
      larvalEnergy12: siteDate.larvalEnergy12,
      larvalEnergy13: siteDate.larvalEnergy13,
      larvalEnergy14: siteDate.larvalEnergy14,
      larvalEnergy15: siteDate.larvalEnergy15,
      larvaObservedA: siteDate.larvaObservedA,
      larvaObservedB: siteDate.larvaObservedB,
      larvaObservedC: siteDate.larvaObservedC,
      larvaObservedD: siteDate.larvaObservedD,
      energySource1: siteDate.energySource1,
      energySource2: siteDate.energySource2,
      energySource3: siteDate.energySource3,
      energySource4: siteDate.energySource4,
      flowersInBloom: siteDate.flowersInBloom,
      fieldNotes: siteDate.fieldNotes,
      updatedAt: siteDate.updatedAt,
      updatedById: siteDate.updatedById,
    },
  });

  return convertSafeJson(updatedSiteDate);
}
