import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

async function getStateCounties() {
	const stateCounties = await prisma.stateCounty.findMany({
    /*where: {
      sites: {
        some: {}
      }
    },*/
    include: {
      sites: true
    }
  });

	stateCounties.sort((first, second) => second.state > first.county ? 1 : second.county > first.county ? 1 : 0);
	return stateCounties;
}

export async function GET() {
    const stateCounties = await getStateCounties();
    return json(stateCounties);
}