import { error } from '@sveltejs/kit';
/*
export function load({ params }) {
    console.log(params);
	const stateCounty = StateCounty.find((stateCounty) => stateCounty.stateCountyKey === params.stateCountyKey);
    console.log(stateCounty);

	if (!stateCounty) throw error(404);

	return {
		stateCounty
	};
}
*/

import prisma from "$lib/prisma";
import type { PageServerLoad } from './$types';

// 1.
export const load = (async ({ params: { stateCountyKey } }) => {
    // 2.
    //const stateCounty = await prisma.stateCounty.findUnique({
    const stateCounty = await prisma.stateCounty.findMany({
        where: { stateCountyKey: Number(stateCountyKey) },
        include: { sites: true },
    });

	if (!stateCounty) throw error(404);

    // 3.
    return { stateCounty };
}) satisfies PageServerLoad;