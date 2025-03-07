import { createSiteUser, removeAllSiteUsers } from "$lib/database/siteusers";
import { json } from "@sveltejs/kit";

export async function POST({ request }: any) {
  console.log(`createSiteUser data from /admin/siteuser/+server.ts`);

  const fd = await request.formData();
  let siteId = Number(fd.get("siteId"));
  let userId = fd.get("userId");
  let privilege = fd.get("privilege");

  const siteUser = await createSiteUser(siteId, userId, privilege);
  console.log("site user data", siteUser);

  return json({ success: true, users: siteUser });
}

export async function DELETE({ params }: any) {
  console.log(
    `removeAllSiteUsers data from /admin/siteuser/${params.siteid}/server.ts`,
  );

  let siteId = BigInt(params.siteid);
  await removeAllSiteUsers(siteId);

  return json({ success: true });
}
