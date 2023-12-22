import type { StateCounty } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params: { stateCountyKey } }) => {
  const response = await fetch(`/api/stateCounties/${stateCountyKey}`);

  return { post: (await response.json()) as StateCounty};
};