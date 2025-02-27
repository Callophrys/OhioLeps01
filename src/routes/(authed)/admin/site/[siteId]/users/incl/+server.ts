
import { getUsersInSite } from "$lib/database/users";
import { json } from "@sveltejs/kit";

export async function GET({ params }: any) {

  let siteId = Number(params.siteid);

  console.log(`get user data from /admin/site/${siteId}/users/incl/+server.ts`);

  const users = await getUsersInSite(siteId);
  console.log("user data", users);

  return json({ success: true, users: users });
}
