import { redirect } from '@sveltejs/kit';
import { iAmLoggedIn } from '$app/stores'

export const actions = {
	default: ({ cookies, url }) => {
		iAmLoggedIn.set(true);
		cookies.set('logged_in', 'true', { path: '/' });
		throw redirect(303, url.searchParams.get('redirectTo') ?? '/');
	}
};
