import { redirect } from '@sveltejs/kit';
import { iAmLoggedIn } from '$lib/stores.js';

export const actions = {
	default: ({ cookies }) => {
		iAmLoggedIn.set(false);
		cookies.delete('logged_in', { path: '/' });
		throw redirect(303, '/');
	}
};
