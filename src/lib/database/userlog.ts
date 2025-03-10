import prisma from "$lib/prisma";
import type { UserLog } from "@prisma/client";

export async function createUserLog(userLog: UserLog) {
  await prisma.userLog.create({
    data: {
      auditType: userLog.auditType,
      ipAddress: userLog.ipAddress,
      userName: userLog.userName,
      description: userLog.description,
    },
  });
}
