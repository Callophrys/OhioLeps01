import { error } from "@sveltejs/kit";
/*
export function load({ params }) {
    console.log(params);
    const county = County.find((county) => county.id === params.id );
    console.log(county);

    if (!county) throw error(404);

    return {
        county
    };
}
*/

import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

// 1.
export const load = (async ({ params: { id } }) => {
  // 2.
  //const county = await prisma.county.findUnique({
  const county = await prisma.county.findMany({
    where: { id: Number(id) },
    include: { sites: true },
  });

  if (!county) throw error(404);

  // 3.
  return { county };
}) satisfies PageServerLoad;
