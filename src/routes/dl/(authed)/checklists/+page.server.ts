import { getChecklists } from '$lib/api/checklists'

export async function load({ cookies, url }) {
	console.log('Load checklists from +page.server.ts');

	const checklists = await getChecklists();
	return { checklists };
}
