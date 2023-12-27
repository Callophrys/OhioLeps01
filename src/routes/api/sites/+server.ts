import { json } from '@sveltejs/kit'
import type { Site } from '$lib/types'

async function getsites() {
	let sites: Site[] = [];

	sites = sites.sort((first, second) => second.siteName > first.siteName ? 1 : 0);

	/*
	sites = sites.sort((first, second) =>
		new Date(second.date).getTime() - new Date(first.date).getTime()
	);
	*/

	return sites
}

export async function GET() {
	const sites = await getsites()
	return json(sites)
}
