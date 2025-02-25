import prisma from "$lib/prisma";

export async function getOrganizationById(organizationId: string) {
  return await prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
  });
}

export async function getOrganizationByName(name: string) {
  return await prisma.organization.findFirst({
    where: {
      name: name,
    },
  });
}

export async function getOrganizationByUser(name: string) {
  return await prisma.organization.findFirst({
    where: {
      name: name,
    },
  });
}

export async function getOrganizations() {
  return await prisma.organization.findMany();
}
