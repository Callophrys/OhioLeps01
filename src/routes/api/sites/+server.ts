import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

async function getsites() {
	const sites = await prisma.site.findMany({
		include: {
			stateCounty: true
		}
	});

	sites.sort((first, second) => second.siteName > first.siteName ? 1 : 0);
	return sites
}

export async function GET() {
	const sites = await getsites()
	return json(sites)
}
