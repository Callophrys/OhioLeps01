import { fail } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
//import { getChecklists } from '$lib/api/checklists.js';
import { json } from '@sveltejs/kit'

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

export const actions = {
	query: async ({ request }) => {

        const data = await request.formData();
        console.log(data);

		return { success: true, snouts: "Piggy" };
	}
};
