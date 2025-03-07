import prisma from "$lib/prisma";


export async function createSiteUser(siteId: number, userId: string, privilege: string) {
  console.log("/lib/database/siteusers.ts > createSiteUser");
  const createdSiteUser = await prisma.siteUser.create({
    data: {
      siteId: siteId,
      userId: userId,
      privilege: privilege,
      // createdAt: new Date(),
      // createdById: userId,
    },
  });

  return createdSiteUser;
}

export async function updateSiteUser(siteId: number, userId: string, privilege: string) {
  console.log('/lib/database/siteusers.ts > updateSiteUser', siteId, userId, privilege);
  const updatedSiteUser = await prisma.siteUser.update({
    where: {
      siteId_userId: {
        siteId: siteId,
        userId: userId,
      },
    },
    data: {
      privilege: privilege,
      // updatedAt: new Date(),
      // updatedById: userId,
    },
  });

  return updatedSiteUser;
}

export async function removeAllSiteUsers(siteId: number) {
  console.log("/lib/database/siteusers.ts > removeAllSiteUsers");
  await prisma.siteUser.deleteMany({
    where: {
      siteId: siteId,
    },
  });
}

export async function removeSiteUser(siteId: number, userId: string) {
  console.log("/lib/database/siteusers.ts > removeSiteUser");
  await prisma.siteUser.deleteMany({
    where: {
      siteId: siteId,
      userId: userId,
      // updatedAt: new Date(),
      // updatedById: userId,
    },
  });
}

// // is use?

// export async function fetchSites(): Promise<site[]> {
//   const res = await fetch("/api/sites");
//   return res.json();
// }

// export async function fetchUsersBySite(siteId: string): Promise<User[]> {
//   const res = await fetch(`/api/sites/${siteId}/users`);
//   return res.json();
// }

// export async function addUserToSite(siteId: string, userId: string): Promise<void> {
//   await fetch(`/api/sites/${siteId}/users`, {
//     method: "POST",
//     body: JSON.stringify({ userId }),
//     headers: { "Content-Type": "application/json" },
//   });
// }

// export async function removeAllUserFromSite(siteId: string): Promise<void> {
//   await fetch(`/api/sites/${siteId}/users`, {
//     method: "DELETE",
//   });
// }

// export async function removeUserFromSite(siteId: string, userId: string): Promise<void> {
//   await fetch(`/api/sites/${siteId}/users/${userId}`, {
//     method: "DELETE",
//   });
}
