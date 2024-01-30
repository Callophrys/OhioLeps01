import { getChecklists } from '$lib/database/checklists';
import type { ChecklistScientificName } from '$lib/types.js';

export async function load({ cookies, url }) {
	console.log('Load checklists from +page.server.ts');

	const checklists = await getChecklists();
	const json = JSON.stringify(checklists);
	const jsonResult: ChecklistScientificName[] = JSON.parse(json);
	return { checklists: jsonResult };
}
