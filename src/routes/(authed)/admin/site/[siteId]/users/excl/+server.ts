import { getUsersNotInSite } from "$lib/database/users";
import { json } from "@sveltejs/kit";

export async function GET({ params }: any) {
  console.log("params", params);

  let siteId = Number(params.siteid);

  console.log(`get user data from /admin/site/${siteId}/users/excl/+server.ts`);

  const users = await getUsersNotInSite(siteId);
  // console.log("user data", users);

  return json({ success: true, users: users });
}
