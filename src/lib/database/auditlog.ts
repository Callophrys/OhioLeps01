import prisma from "$lib/prisma";
import { convertSafeJson } from "$lib/utils.js";

export async function getAuditLog() {
  // filtering for OH by default
  const auditLog = await prisma.auditLog.findMany({
    orderBy: {
      timestamp: "asc",
    },
    take: 50,
  });

  return convertSafeJson(auditLog);
}
