import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
  // redirect user if not logged in
  console.log(locals.user?.role);
  if (locals.user?.role !== 'ADMIN') {
    // TODO: figure out why this always goes to "/" when something else is hard-coded or passed in
    throw redirect(302, '/');
  }
}
