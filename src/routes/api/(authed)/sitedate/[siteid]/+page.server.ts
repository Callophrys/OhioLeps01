import { getSiteDates } from "$lib/database/sitedates";
import { redirect } from '@sveltejs/kit';

export async function load({ params }: { params: any }) {
  console.log('sitedates - params', params);
  let siteId = Number(params.siteid);

  const sds = await getSiteDates(siteId);
  console.log("sds", sds);

  if (sds.length > 0) {
    throw redirect(302, `/api/sitedate/${siteId}/${sds[0].id}`);
  }
  // TODO: handle else - e.g. when no site dates exist

  return {
    siteid: siteId
  };
}
