import { getUsersInSite } from "$lib/database/users";
import { json } from "@sveltejs/kit";

export async function GET({ params }: any) {
  // console.log("params", params);

  let siteId = Number(params.siteid);
  let state = String(params.state);

  // console.log(
  //   `get user data from /admin/site/${siteId}/users/${state}/+server.ts`,
  // );

  const users =
    state === "incl"
      ? await getUsersInSite(siteId)
      : await getUsersNotInSite(siteId);
  // console.log("user data", users);
  // console.log("user data");

  return json({ success: true, users: users });
}
