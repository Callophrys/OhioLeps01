import { fail } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { getNameAddresses } from '$lib/database/nameaddresses.js';
import { json } from '@sveltejs/kit';

export async function load({ cookies, url }) {

  // SECURITY - only checking session NOT user or role at this time
  if (!cookies.get('session')) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  const nameAddresses = await getNameAddresses();
  return { nameAddresses };
}







/*
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
export const load: PageServerLoad = async ({ locals }) => {
  // redirect user if not logged in
  if (!locals.user) {
    throw redirect(302, '/')
  }
}
*/

