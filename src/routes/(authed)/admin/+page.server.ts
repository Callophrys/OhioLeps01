import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { getAppConfigsByOrgId, updateAllAppConfigs, getTemplateAppConfigs } from '$lib/database/appconfig';
import type { AppConfig } from '@prisma/client';

export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if not logged in
	//console.log(locals.user?.role);
	if (locals.user?.role !== 'ADMIN') {
		// TODO: figure out why this always goes to "/" when something else is hard-coded or passed in
		throw redirect(302, '/');
	}

	const appConfigs = await getAppConfigsByOrgId(locals.user.organizationId);
	return { appConfigs }
}

export const actions = {

	updateAppConfigs: async ({ request, locals }) => {
		console.log('udpateAppConfigs from /api/admin/+page.server.ts');
		const formData = await request.formData();
		console.log(formData);
		const candidates: any = {};
		for (const p of formData)
			candidates[p[0].slice(0, p[0].indexOf('_'))] = p[1];

		const appConfigs = await getAppConfigsByOrgId(locals.user.organizationId);
		const updateConfigs: AppConfig[] = [];
		appConfigs.forEach(c => {
			if (c.configType === 'boolean') {
				if (typeof candidates[c.id] === 'undefined') {
					if (c.configValue === 'true') {
						//console.log('b1');
						c.configValue = '* false';
						updateConfigs.push(c);
					}
				} else if (c.configValue === 'false' && candidates[c.id] === 'on') {
					//console.log('b2');
					c.configValue = '* true';
					updateConfigs.push(c);
				}
			} else if (c.configType !== 'object' && c.configValue !== candidates[c.id]) {
				console.log(c.configValue, candidates[c.id]);
				//console.log('a');
				c.configValue = '* ' + candidates[c.id];
				updateConfigs.push(c);
			}
		});
		//console.log(updateConfigs);
		//console.log(candidates);

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

