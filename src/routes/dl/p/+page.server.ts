import type { County } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params: { id } }) => {
  const response = await fetch(`/api/counties/${id}`);

  return { post: (await response.json()) as County };
};