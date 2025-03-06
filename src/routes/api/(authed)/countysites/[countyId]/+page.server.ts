import { fail } from "@sveltejs/kit";
import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";
import type { Site, County } from "@prisma/client";
import type { SiteCounty } from "$lib/types.js";
import { getSitesByCounty, getSites } from "$lib/database/sites.js";
import { getCountiesExpanded } from "$lib/database/counties.js";

export async function load({ cookies, url, params }) {
  // SECURITY - only checking session NOT user or role at this time
  if (!cookies.get("session")) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  let countyId = Number(params.countyId);
  console.log(countyId);
  const [sites, counties] =
    countyId === -1
      ? await Promise.all([getSites(null), getCountiesExpanded()])
      : await Promise.all([getSitesByCounty(countyId), getCountiesExpanded()]);

  return { sites: sites, counties: counties, refCountyId: countyId };
}
