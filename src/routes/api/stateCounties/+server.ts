import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'
import type { StateCounty } from '$lib/types'

async function getstatecounties() {
	let stateCounties: StateCounty[] = [];

	stateCounties = stateCounties.sort((first, second) => second.state + second.county > first.state + second.county ? 1 : 0);

	return stateCounties;
}

/*
export async function GET() {
  const stateCounties = await prisma.stateCounty.findMany()

    return json(stateCounties);
}

*/
export async function GET() {
    const stateCounties = await getstatecounties();
    return json(stateCounties);
}