import prisma from "$lib/prisma";
import type { AuditUser } from "@prisma/client";

export async function createAuditUser(auditUser: AuditUser) {
  await prisma.auditUser.create({
    data: {
      auditType: auditUser.auditType,
      ipAddress: auditUser.ipAddress,
      userName: auditUser.userName,
      userId: auditUser.userId,
      organizationId: auditUser.organizationId,
      siteId: auditUser.siteId,
      description: auditUser.description,
    },
  });
}
