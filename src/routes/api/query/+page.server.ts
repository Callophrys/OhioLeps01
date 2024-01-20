import { fail } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
//import { getChecklists } from '$lib/api/checklists.js';
import { json } from '@sveltejs/kit'
import { getCounties } from '$lib/database/counties';
import { getChecklists } from '$lib/database/checklists';
import type { County } from '@prisma/client';
import type { Checklist } from '@prisma/client';

/*
export async function load({ cookies, url }) {
	console.log('Load from +page.server.ts');

	// SECURITY - only checking session NOT user or role at this time
	if (!cookies.get('session')) {
		throw redirect(303, `/login?redirectTo=${url.pathname}`);
	}

	const checklists = await getChecklists();

	return { checklists };
}
*/

/*
	const [counties, speciesList] =
		await Promise.all([
			responseCounties.json(),
			responseSpecies.json()
		]);

	return { counties, speciesList };
*/
export async function load() {
	const [counties, speciesList] =
		await Promise.all([
			getCounties(),
			getChecklists()
		]);

	const jsonC = JSON.stringify(counties);
	const jsonResultC: County[] = JSON.parse(jsonC);

	const jsonS = JSON.stringify(speciesList);
	const jsonResultS: Checklist[] = JSON.parse(jsonS);

	return { counties: jsonResultC, speciesList: jsonResultS }
}

/*
export const actions = {
	query: async ({ request }) => {

        const data = await request.formData();
        console.log(data);

		return { success: true, snouts: "Piggy" };
	}
};
*/
