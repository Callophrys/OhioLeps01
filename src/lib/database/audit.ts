import prisma from "$lib/prisma";
import type { Audit } from "@prisma/client";

export async function createAudit(audit: Audit) {
  await prisma.audit.create({
    data: {
      auditType: audit.auditType,
      ipAddress: audit.ipAddress,
      userName: audit.userName,
      userId: audit.userId,
      organizationId: audit.organizationId,
      siteId: audit.siteId,
      description: audit.description,
    },
  });
}
