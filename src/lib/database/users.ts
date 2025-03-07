import prisma from "$lib/prisma";
import type { User } from "@prisma/client";
import { convertSafeJson } from "$lib/utils.js";

export async function getUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      role: true,
    },
  });

  return user;
}

export async function getUsers(organizationId: string | null) {
  if (organizationId) {
    const result = await prisma.user.findMany({
      where: {
        organizationId: organizationId,
      },
      include: {
        role: true,
      },
    });

    return convertSafeJson(result);
  } else {
    const result = await prisma.user.findMany({
      include: {
        role: true,
      },
    });

    return convertSafeJson(result);
  }
}

export async function getUsersInSite(siteId: BigInt | null) {
  console.log(`users.ts->getUsersInSite: ${siteId}`);
  if (siteId) {
    const result = await prisma.user.findMany({
      where: {
        disabled: false,
        siteUsers: {
          some: {
            siteId: siteId,
          },
        },
      },
      include: {
        role: true,
        siteUsers: {
          where: {
            siteId: siteId,
          },
        },
      },
    });

    return convertSafeJson(result);
  }
}

export async function getUsersNotInSite(siteId: string | null) {
  console.log(`users.ts->getUsersNotInSite: ${siteId}`);
  if (siteId) {
    const result = await prisma.user.findMany({
      where: {
        disabled: false,
        siteUsers: {
          none: {
            siteId: siteId,
          },
        },
      },
      include: {
        role: true,
        siteUsers: true, // Obviously this will be empty
      },
    });

    return convertSafeJson(result);
  } else {
    const result = await prisma.user.findMany({
      include: {
        role: true,
      },
    });

    return convertSafeJson(result);
  }
}

export async function createUser(user: User, roleName: string) {
  const role = await prisma.role.findFirst({
    where: { name: roleName },
  });

  const newUser = await prisma.user.create({
    data: {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      passwordHash: user.passwordHash,
      userAuthToken: user.userAuthToken,
      organizationId: user.organizationId,
      roleId: role?.id,
      disabled: false,
      passwordRetries: 0,
      delayedRetries: 0,
    },
  });

  return newUser;
}

export async function lockUser(userId: string, lockStatus: boolean) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      disabled: lockStatus,
    },
  });
}
