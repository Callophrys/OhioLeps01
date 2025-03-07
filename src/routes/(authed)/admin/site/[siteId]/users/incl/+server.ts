import { getUsersInSite } from "$lib/database/users";
import { json } from "@sveltejs/kit";

export async function GET({ params }: any) {
  console.log("params", params);

  let siteId = Number(params.siteid);

  console.log(`get user data from /admin/site/${siteId}/users/incl/+server.ts`);

  const users = await getUsersInSite(siteId);
  // console.log("user data", users);
  // console.log("user data");

  return json({ success: true, users: users });
}
