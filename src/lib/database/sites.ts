import prisma from "$lib/prisma";
import type { ChangelessSite } from "$lib/types";
import type { Site } from "@prisma/client";
import { convertSafeJson } from "../utils";

/**
 * Obtain site details including county, yearly statuses, and observation dates
 * @param siteId
 * @returns
 */
export async function getSite(siteId: BigInt): SiteCountySiteDatesSiteStatuses[] {
  // console.log('/lib/api/entry/sites.ts > getSite', siteId);

  const site = await prisma.site.findUnique({
    where: {
      id: siteId,
    },
    include: {
      county: {
        select: {
          id: true,
          name: true,
          stateRegionId: true,
          stateId: true,
        },
      },
      sections: true,
      siteStatuses: {
        include: {
          statusCode: true,
        },
      },
      siteDates: true,
      createdBy: true,
      updatedBy: true,
    },
  });

  return convertSafeJson(site);
}

export async function getSiteData(siteId: number) {
  const site = await prisma.site.findUnique({
    where: {
      id: BigInt(siteId),
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
, usc.username siteCreatedBy
, usu.username siteUpdatedBy
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
, d.weather1
, d.weather2
, d.weather3
, d.weather4
, d.weather5
, d.weather6
, d.weather7
, d.weather8
, d.weather9
, d.weather10
, d.weather11
, d.weather12
, d.weather13
, d.weather14
, d.weather15
, d.larvalEnergy1
, d.larvalEnergy2
, d.larvalEnergy3
, d.larvalEnergy4
, d.larvalEnergy5
, d.larvalEnergy6
, d.larvalEnergy7
, d.larvalEnergy8
, d.larvalEnergy9
, d.larvalEnergy10
, d.larvalEnergy11
, d.larvalEnergy12
, d.larvalEnergy13
, d.larvalEnergy14
, d.larvalEnergy15
, d.larvaObservedA
, d.larvaObservedB
, d.larvaObservedC
, d.larvaObservedD
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
, udc.username weeklyRecordCreatedById
, udu.username weeklyRecordUpdatedById
, udr.username weeklyRecordConfirmById
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
, uoc.username speciesRecordCreatedById
, uou.username speciesRecordUpdatedById
, uor.username speciesRecordConfirmById
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
join siteDate d on d.siteId = s.id
join siteDateObservation o on o.siteDateId = d.id
join checklist l on l.id = o.checklistId
join siteStatus t on t.siteId = s.id
join statusCode c on c.id = t.statusCodeId
join county y on y.id = s.countyId
join state  a on a.id = s.stateId
left outer join User usc on usc.id = s.createdById
left outer join User usu on usu.id = s.updatedById
left outer join User udc on udc.id = d.createdById
left outer join User udu on udu.id = d.updatedById
left outer join User udr on udr.id = d.confirmById
left outer join User uoc on uoc.id = o.createdById
left outer join User uou on uou.id = o.updatedById
left outer join User uor on uor.id = o.confirmById
where s.id = ${siteId}`;
  console.log("result***", result);

  return result;
}
/*
 */

export async function getSitesByCounty(countyId: number): SiteCounty[] {
  const sites = await prisma.site.findMany({
    where: {
      countyId: countyId,
    },
    include: {
      county: true,
    },
    orderBy: {
      siteName: "asc",
    },
  });

  return convertSafeJson(sites);
}

export async function getSitesSlim(idList: BigInt[] | null): Site[] {
  // console.log('/lib/api/database/sites.ts > getSitesSlim');

  // let whereClause =
  //     idList && idList.length
  //         ? {
  //               id: { in: idList },
  //           }
  //         : true;

  const sites = await prisma.site.findMany({
    where: {
      ...(idList && idList.length ? { id: { in: idList } } : {}),
    },
    orderBy: {
      siteName: "asc",
    },
  });

  return convertSafeJson(sites);
}

export async function getSites(idList: number[] | null): SiteCountyState[] {
  console.log('/lib/api/database/sites.ts > getSites');

  const idsClause: any[] = idList?.length ? { id: { in: idList } } : {};

  const sites = await prisma.site.findMany({
    where: {
      // ...(idList && idList.length ? { id: { in: idList } } : {}),
      ...idsClause
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
      siteName: "asc",
    },
  });

  return convertSafeJson(sites);
}

export async function existsInCounty(
  siteName: string,
  countyId: number,
): Promise<boolean> {
  const site = await prisma.site.findFirst({
    select: {
      id: true,
    },
    where: {
      siteName: siteName.trim(),
      countyId: countyId,
    },
  });

  return site !== null;
}

export async function existsInState(
  siteName: string,
  stateId: number,
): Promise<boolean> {
  const site = await prisma.site.findFirst({
    select: {
      id: true,
    },
    where: {
      siteName: siteName,
      stateId: stateId,
    },
  });

  return site !== null;
}

export async function createSite(site: ChangelessSite, userId: string) {
  console.log("/lib/api/entry/sites.ts > createSite");
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
      createdAt: new Date(),
      createdById: userId,
    },
  });

  return createdSite;
}

export async function updateSite(site: ChangelessSite, userId: string) {
  // console.log('/lib/api/entry/sites.ts > updateSite', site);
  const updatedSite = await prisma.site.update({
    where: {
      id: site.id,
    },
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
      updatedAt: new Date(),
      updatedById: userId,
    },
  });

  return updatedSite;
}

// Hard delete, we prob need the history and support for undos and auditing and so on.
export async function removeSite(siteId: number) {
  console.log("/lib/api/entry/sites.ts > removeSite");
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
      id: siteId,
    },
  });
}
