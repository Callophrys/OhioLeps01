import { fail } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { getCounties } from '$lib/database/counties.js';
import { json } from '@sveltejs/kit';

export async function load({ cookies, url }) {

	// SECURITY - only checking session NOT user or role at this time
	if (!cookies.get('session')) {
		throw redirect(303, `/login?redirectTo=${url.pathname}`);
	}

	const counties = await getCounties();
	return { counties };
}
