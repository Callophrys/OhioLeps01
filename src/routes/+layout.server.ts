import type { LayoutServerLoad } from './$types';
import { getAppConfigsByOrgId, getAppConfigsByOrgName } from '$lib/database/appconfig';
import { defaultOrganization } from '$lib/config';
import type { AppConfig } from '@prisma/client';
import * as config from '$lib/config';

// get `locals.user` and pass it to the `page` store
export const load: LayoutServerLoad = async ({ locals }) => {
  let configs: AppConfig[] = [];

  if (locals && locals.user) {
    configs = await getAppConfigsByOrgId(locals.user.organizationId);
  }

  if (configs.length === 0) {
    configs = await getAppConfigsByOrgName(config.defaultOrganization);
  }

  if (configs.length === 0) {
    configs = await getAppConfigsByOrgName('TEMPLATE');
  }

  const json = JSON.stringify(configs);
  const jsonResult: AppConfig[] = JSON.parse(json);
  return { user: locals.user, configs: jsonResult }
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
