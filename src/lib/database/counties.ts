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
