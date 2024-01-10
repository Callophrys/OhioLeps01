import prisma from "$lib/prisma"

export async function getSite(siteId: number) {
  const site = await prisma.site.findUnique({
    include: {
      stateCounty: true,
      siteStatuses: {
        select: {
          year: true,
          statusCode: true
        }
      }
    },
    where: {
      siteId: {
        equals: siteId
      }
    }
  });

  return site;
}

export async function getSites() {

  const sites = await prisma.site.findMany({
    include: {
      stateCounty: true
    },
    orderBy: {
      siteName: 'asc'
    }
  });

  return sites;
}

export async function addSite(site: any) {
  const newSite = await prisma.site.create({
    data: {
      siteName: 'Glen Helen',
      county: 'Greene',
      person: 'Nate D',
      stateCountyId: 29
    }
  });

  return newSite;
}

export async function removeSite(siteId: number) {
  const deletedSite = await prisma.site.delete({
    where: {
      siteId: siteId
    }
  });

  return deletedSite;
}
