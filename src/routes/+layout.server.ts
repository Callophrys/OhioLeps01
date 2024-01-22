import type { LayoutServerLoad } from './$types'

// get `locals.user` and pass it to the `page` store


export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    user: locals.user,
  }
}

/*
// Wasn't wild for full page transitions
//
export const load: LayoutServerLoad = async ({ locals, url }) => {
  return {
    user: locals.user,
    url: url.pathname
  }
}
*/
