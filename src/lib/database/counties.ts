import prisma from '$lib/prisma'

export async function getCounties() {
  // filtering for OH by default
  const counties = await prisma.county.findMany({

    include: {
      region: true,
      sites: true,
      state: true,
    },

    where: {
      state: {
        abbreviation: 'OH',
      }
    },

    orderBy: [
      {
        name: 'asc',
      },
    ]
  });
  
  return counties;
}

export async function getCountySpecimens() {
  const countySpecimens = await prisma.$queryRaw`
select distinct
c.name county,
r.name region,
l.commonname
from county c
inner join region r on c.regionId = r.id
inner join site s on s.countyId = c.id
inner join sitedate d on s.siteid = d.siteid
inner join siteobservation o on d.sitedateid = o.sitedateid
inner join checklist l on o.checklistid = l.checklistid`;

  return countySpecimens;
}
