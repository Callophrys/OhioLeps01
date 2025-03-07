import {
  addAllSiteUsers,
  removeAllSiteUsers,
} from "$lib/database/siteusers";
import { json } from "@sveltejs/kit";

export async function POST({ params }: any) {
  console.log(`addAllSiteUsers data from /admin/siteuser/${params.siteid}/+server.ts`);

  let siteId = BigInt(params.siteid);
  const siteUsers = await addAllSiteUsers(siteId);
  return json({ success: true, users: siteUsers });
}


export async function DELETE({ params }: any) {
  console.log(
    `removeAllSiteUsers data from /admin/siteuser/${params.siteid}/server.ts`,
  );

  let siteId = BigInt(params.siteid);
  await removeAllSiteUsers(siteId);

  return json({ success: true });
}
