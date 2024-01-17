import { getChecklists } from '$lib/database/checklists';
import type { Checklist } from '@prisma/client';

export async function load({ cookies, url }) {
	console.log('Load checklists from +page.server.ts');

	const checklists = await getChecklists();
	const json = JSON.stringify(checklists);
	const jsonResult: Checklist[] = JSON.parse(json);
	return { checklists: jsonResult };
}
