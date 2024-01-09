import type { StateCounty } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params: { stateCountyId } }) => {
  const response = await fetch(`/api/stateCounties/${stateCountyId}`);

  return { post: (await response.json()) as StateCounty};
};