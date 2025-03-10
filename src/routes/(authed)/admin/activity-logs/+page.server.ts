import { getAuditLog } from "$lib/database/auditlog";
// import { fail } from "@sveltejs/kit";
// import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";

export async function load({ cookies, url }) {
  console.log('get user data from /admin/activity-logs');

  // SECURITY - only checking session NOT user or role at this time
  if (!cookies.get("session")) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  const auditLog = await getAuditLog();

  return { success: true, auditLog: auditLog };
}
