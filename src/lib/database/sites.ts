import prisma from "$lib/prisma"

export async function getSite(siteId: number) {
  console.log('/lib/api/entry/sites.ts > getSite', siteId);

  const site = await prisma.site.findUnique({
    where: {
      siteId: siteId
    },
    include: {
      county: {
        select: {
          name: true,
        }
      },
      siteStatuses: {
        select: {
          year: true,
          statusCode: true
        }
      },
      siteDates: true
    },
  });

  return site;
}

export async function getSitesByCounty(countyId: number) {
  const sites = await prisma.site.findMany({
    where: {
      countyId: countyId
    },
    include: {
      county: true
    },
    orderBy: {
      siteName: 'asc'
    }
  });

  return sites;
}

export async function getSites(idList: number[]|null) {
  console.log('/lib/api/entry/sites.ts > getSites');
  
  let whereClause = idList && idList.length ? {
    id: { in: idList }
  } : true;

  const sites = await prisma.site.findMany({
    where: {
      ...(idList && idList.length ? {siteId: { in: idList }} : {})
    },
    include: {
      county: {
        select: {
          name: true,
          state: {
            select: {
              name: true
            }
          }
        }
      },
    },
    orderBy: {
      siteName: 'asc'
    }
  });

  return sites;
}

export async function addSite(site: any) {
  console.log('/lib/api/entry/sites.ts > addSite');
  /*
  const newSite = await prisma.site.create({
    data: {
      siteName: 'Glen Helen',
      person: 'Nate D',
      countyId: 29
    }
  });
  */
}

// Hard delete, we prob need the history and support for undos and auditing and so on.
export async function removeSite(siteId: number) {
  console.log('/lib/api/entry/sites.ts > removeSite');
  await prisma.siteDateObservation.deleteMany({
    where: {
      siteDateId: siteId // is this right?
    }
  });
  await prisma.siteDate.deleteMany({
    where: {
      siteId: siteId
    }
  });
  await prisma.site.delete({
    where: {
      siteId: siteId
    }
  });
}
