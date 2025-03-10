import prisma from "$lib/prisma";
import { convertSafeJson } from "$lib/utils.js";
import type { AuditLog } from "@prisma/client";

export async function getAuditLog() {
  // filtering for OH by default
  const auditLog: AuditLog[] = await prisma.auditLog.findMany({
    orderBy: {
      timestamp: "asc",
    },
    take: 50,
  });

  return convertSafeJson(auditLog);
}

export async function createAuditLog(auditLog: AuditLog) {
  await prisma.auditLog.create({
    data: {
      tableName: auditLog.tableName,
      recordId: auditLog.recordId,
      action: auditLog.action,
      userId: auditLog.userId,
      organizationId: auditLog.organizationId,
      siteId: auditLog.siteId,
    },
  });
}
