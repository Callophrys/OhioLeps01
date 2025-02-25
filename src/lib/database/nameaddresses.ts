import prisma from "$lib/prisma";

export async function getNameAddresses() {
  const nameAddresses = await prisma.nameAddress.findMany({
    orderBy: [
      {
        lastName: "asc",
      },
      {
        firstName: "asc",
      },
    ],
  });

  return nameAddresses;
}
