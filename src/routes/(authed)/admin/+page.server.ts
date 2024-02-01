import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { getAppConfigsById, updateAllAppConfigs, getTemplateAppConfigs } from '$lib/database/appconfig';
import type { AppConfig } from '@prisma/client';

export const load: PageServerLoad = async ({ locals }) => {
  // redirect user if not logged in
  console.log(locals.user?.role);
  if (locals.user?.role !== 'ADMIN') {
    // TODO: figure out why this always goes to "/" when something else is hard-coded or passed in
    throw redirect(302, '/');
  }

  const appConfigs = await getAppConfigsById(locals.user.organizationId);
  return { appConfigs }
}

export const actions = {

	updateAppConfigs: async ({ request, locals }) => {
	console.log('udpateAppConfigs from /api/admin/+page.server.ts');
	const formData = await request.formData();
    console.log(formData);
	
    //console.log(locals);
	//updateAllAppConfigs(ff);

    
		//const site = await getSite(siteId);

		//return { success: true, data: site }
	},

	resetAppConfigs: async ({ request }) => {
		console.log('resetAppConfigs from /api/admin/+page.server.ts');
		const formData = await request.formData();
    console.log(formData);
    return { success: true }

		const siteId = Number(formData.get('siteId') ?? 0);
		console.log('siteId:', siteId);
		//await removeSite(siteId);
		return { success: true }
	}
}

