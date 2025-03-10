import prisma from "$lib/prisma";
import { convertSafeJson } from "$lib/utils.js";
import type { AuditUser } from "@prisma/client";

export async function getAuditLog() {
  // filtering for OH by default
  const auditData: AuditUser[] = await prisma.auditData.findMany({
    orderBy: {
      timestamp: "asc",
    },
    take: 50,
  });

  return convertSafeJson(auditData);
}
