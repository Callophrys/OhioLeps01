import prisma from "$lib/prisma";

export async function getCounties() {
  // filtering for OH by default
  const counties = await prisma.county.findMany({
    where: {
      state: {
        abbreviation: "OH",
      },
    },

    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  return counties;
}

export async function getCountiesExpanded(): CountyComplete[] {
  // filtering for OH by default
  const counties = await prisma.county.findMany({
    include: {
      stateRegion: true,
      sites: true,
      state: true,
    },

    where: {
      state: {
        abbreviation: "OH",
      },
    },

    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  const jsonCounties = JSON.stringify(counties, (key, value) =>
    typeof value === "bigint" ? value.toString() : value,
  );

  return JSON.parse(jsonCounties);
}

export async function getMonitoredCounties() {
  // filtering for OH by default
  const counties = await prisma.county.findMany({
    include: {
      stateRegion: true,
      sites: true,
      state: true,
    },

    where: {
      state: {
        abbreviation: "OH",
      },
      sites: {
        some: {},
      },
    },

    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  return counties;
}

export async function getCountySpecimens() {
  const CountySpecimens = await prisma.$queryRaw`
select distinct
c.name county,
r.name stateRegion,
l.commonname
from county c
inner join stateRegion r on c.stateRegionId = r.id
inner join site s on s.countyId = c.id
inner join sitedate d on s.id = d.siteid
inner join siteDateObservation o on d.id = o.sitedateid
inner join checklist l on o.checklistid = l.id`;

  return CountySpecimens;
}

export async function getStates() {
  // filtering for OH by default
  const states = await prisma.state.findMany({
    where: {
      country: {
        abbreviation: "US",
      },
    },

    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  return states;
}
