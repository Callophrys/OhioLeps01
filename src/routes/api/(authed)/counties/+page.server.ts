import { fail } from "@sveltejs/kit";
import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";
import { getCountiesExpanded } from "$lib/database/counties.js";
import type { County } from "@prisma/client";
import type { CountyComplete } from "$lib/types";

export async function load({ cookies, url }) {
  // SECURITY - only checking session NOT user or role at this time
  if (!cookies.get("session")) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  const counties = await getCountiesExpanded();

  return { counties: counties };
}
