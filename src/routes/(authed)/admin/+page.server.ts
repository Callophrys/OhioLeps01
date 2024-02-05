import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getAppConfigsByOrgId, updateAllAppConfigs, getTemplateAppConfigs, resetAllAppConfigs } from '$lib/database/appconfig';
import type { AppConfigFormKeyChecked } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if not logged in
	//console.log(locals.user?.role);
	if (locals.user?.role !== 'ADMIN') {
		// TODO: figure out why this always goes to "/" when something else is hard-coded or passed in
		throw redirect(302, '/');
	}

	const appConfigs =
		await getAppConfigsByOrgId(locals.user.organizationId) as AppConfigFormKeyChecked[];

	const json = JSON.stringify(appConfigs);
	const jsonResult: AppConfigFormKeyChecked[] = JSON.parse(json);
	return { appConfigs: jsonResult }
}

export const actions = {

	updateAppConfigs: async ({ request, locals }) => {
		console.log('updateAppConfigs from /api/admin/+page.server.ts');
		const formData = await request.formData();
		console.log(formData);
		const candidates: any = {};
		for (const p of formData)
			candidates[p[0].slice(0, p[0].indexOf('_'))] = p[1];

		const appConfigs = await getAppConfigsByOrgId(locals.user.organizationId) as AppConfigFormKeyChecked[];
		const updateConfigs: AppConfigFormKeyChecked[] = [];
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
				//console.log(c.configValue, candidates[c.id]);
				//console.log('a');
				c.configValue = '* ' + candidates[c.id];
				updateConfigs.push(c);
			}
		});
		//console.log(locals.user?.id + ':', updateConfigs);
		//console.log(candidates);

		//console.log(locals);
		updateAllAppConfigs(appConfigs);


		//const site = await getSite(siteId);

		//return { success: true, data: site }
	},

	resetAppConfigs: async ({ locals }) => {
		console.log('resetAppConfigs from /api/admin/+page.server.ts');

		const appConfigs = await resetAllAppConfigs(locals.user.organizationId) as AppConfigFormKeyChecked[];
		const json = JSON.stringify(appConfigs);
		const jsonResult: AppConfigFormKeyChecked[] = JSON.parse(json);
		return { appConfigs: jsonResult }
	}
}

