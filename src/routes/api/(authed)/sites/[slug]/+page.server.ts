import { error } from '@sveltejs/kit'
import { getSite } from '$lib/database/sites'
import type { SiteCountySiteDates } from '$lib/types.js';

export async function load({ params }) {
  console.log('Load from /api/sites/{slug}/+page.server.ts');
  //console.log('params', params);
  const site = await getSite(Number(params.slug));
  //console.log('site', site);

  if (!site) {
    throw error(404, 'Site not found')
  }

  const json = JSON.stringify(site);
  const jsonResult: SiteCountySiteDates = JSON.parse(json);
  //console.log('site', jsonResult);
  return { site: jsonResult }
}
