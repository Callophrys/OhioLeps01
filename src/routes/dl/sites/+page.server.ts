import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';

export function load({ cookies, url }) {

	if (!cookies.get('logged_in')) {
		throw redirect(303, `/login?redirectTo=${url.pathname}`);
	}

	if (!browser) {
		return;
	}
}
