import { createSiteUser, removeSiteUser, updateSiteUser } from "$lib/database/siteusers";
import { json } from "@sveltejs/kit";

export async function POST({ params, request }: any) {
  console.log(`updateUser data from /admin/siteuser/${params.siteid}/${params.userid}/+server.ts`);

  let siteId = Number(params.siteid);
  let userId = String(params.userid);

  const fd = await request.formData();
  console.log(fd);
  let privilege = fd.get("privilege");

  const siteUser = await createSiteUser(siteId, userId, privilege);
  console.log("site user data", siteUser);

  return json({ success: true, users: siteUser });
}

export async function PUT({ params, request }: any) {
  console.log(
    `updateUser data from /admin/siteuser/${params.siteid}/${params.userid}/+server.ts`,
  );

  let siteId = Number(params.siteid);
  let userId = String(params.userid);

  const fd = await request.formData();
  console.log(fd);

  let privilege = fd.get("privilege");

  const siteUser = await updateSiteUser(siteId, userId, privilege);
  console.log("site user data", siteUser);

  return json({ success: true, users: siteUser });
}

export async function DELETE({ params }: any) {
  console.log(
    `removeSiteUser data from /admin/siteuser/${params.siteid}/${params.userid}/+server.ts`,
  );

  let siteId = Number(params.siteid);
  let userId = String(params.userid);

  const user = await removeSiteUser(siteId, userId);

  return json({ success: true });
}
