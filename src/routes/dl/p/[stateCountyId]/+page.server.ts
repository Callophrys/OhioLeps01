import { error } from '@sveltejs/kit';
/*
export function load({ params }) {
    console.log(params);
	const stateCounty = StateCounty.find((stateCounty) => stateCounty.stateCountyId === params.stateCountyId);
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
export const load = (async ({ params: { stateCountyId } }) => {
    // 2.
    //const stateCounty = await prisma.stateCounty.findUnique({
    const stateCounty = await prisma.stateCounty.findMany({
        where: { stateCountyId: Number(stateCountyId) },
        include: { sites: true },
    });

	if (!stateCounty) throw error(404);

    // 3.
    return { stateCounty };
}) satisfies PageServerLoad;