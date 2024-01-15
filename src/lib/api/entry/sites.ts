import prisma from "$lib/prisma"

export async function getSite(siteId: number) {
  console.log('/lib/api/entry/sites.ts > getSite', siteId);

  const site = await prisma.site.findUnique({
    where: {
      siteId: siteId
    },
    include: {
      county: true,
      siteStatuses: {
        select: {
          year: true,
          statusCode: true
        }
      }
    },
  });

  return site;
}

export async function getSites() {
  console.log('/lib/api/entry/sites.ts > getSites');

  const sites = await prisma.site.findMany({
    include: {
      county: {
        select: {
          name: true,
        }
      },
    },
    orderBy: {
      siteName: 'asc'
    }
  });

  console.log('getSites returning ', sites);

  return sites;
}

export async function addSite(site: any) {
  console.log('/lib/api/entry/sites.ts > addSite');
  const newSite = await prisma.site.create({
    data: {
      siteName: 'Glen Helen',
      person: 'Nate D',
      countyId: 29
    }
  });
}

// Call this as remove since we probably need to keep
// the history and support undos and auditing and so on.
export async function removeSite(siteId: number) {
  console.log('/lib/api/entry/sites.ts > removeSite');
  await prisma.siteObservation.deleteMany({
    where: {
      siteDateId: siteId
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
