import prisma from "$lib/prisma";

export async function getTaxonomy() {
  const taxonomy = await prisma.taxonomy.findMany({
    include: {
      branchTaxa: {
        select: {
          id: true,
        },
      },
      baseTaxon: {
        select: {
          id: true,
          taxonType: true,
          latinName: true,
          baseTaxon: {
            select: {
              id: true,
              taxonType: true,
              latinName: true,
              baseTaxon: false,
            },
          },
        },
      },
    },
    orderBy: {
      latinName: "asc",
    },
  });
  return taxonomy;
}
