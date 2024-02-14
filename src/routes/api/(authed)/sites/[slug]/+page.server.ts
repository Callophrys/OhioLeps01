import { error } from '@sveltejs/kit'
import { getSite } from '$lib/database/sites'
import { getCounties } from '$lib/database/counties.js';
import type { SiteCountySiteDates } from '$lib/types.js';
import type { County } from '@prisma/client';

export async function load({ params }) {
  console.log('Load from /api/sites/{slug}/+page.server.ts');
  //console.log('params', params);
  //
  const [site, counties] = await Promise.all([
    getSite(Number(params.slug)),
    getCounties()
  ]);

  if (!site) {
    throw error(404, 'Site not found')
  }

  const json = JSON.stringify(site);
  const jsonResult: SiteCountySiteDates = JSON.parse(json);

  const jsonC = JSON.stringify(counties);
  const jsonResultC: County[] = JSON.parse(jsonC);

  //console.log('site', jsonResult);
  return { site: jsonResult, counties: jsonResultC }
}
