import type { StateCounty } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch('/api/stateCounties');

  return { stateCounties: (await response.json()) as StateCounty[] };
};