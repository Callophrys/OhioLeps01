import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { getSite } from '$lib/api/entry/sites.js';

export function load({ cookies, url }) {

	if (!browser) {
		return;
	}

	if (!cookies.get('logged_in')) {
		throw redirect(303, `/login?redirectTo=${url.pathname}`);
	}
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		let siteId = data.get('siteId') ?? 0;
		await getSite(siteId);
	}
};

