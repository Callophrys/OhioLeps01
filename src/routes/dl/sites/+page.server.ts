import { fail } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { addSite, getSite, getSites, removeSite } from '$lib/api/entry/sites.js';
import { json } from '@sveltejs/kit'

export async function load({ cookies, url }) {
	console.log('Load from +page.server.ts');

	// SECURITY - only checking session NOT user or role at this time
	if (!cookies.get('session')) {
		throw redirect(303, `/login?redirectTo=${url.pathname}`);
	}

	const sites = await getSites();

	return { sites };
}

export const actions = {

	addSite: async ({ request }) => {
		const formData = await request.formData();
		const site = String(formData.get('site'));

		if (!site) {
			return fail(400, { site, missing: true })
		}

		addSite(site);

		return { success: true }
	},
	getSite: async ({ request }) => {
		const formData = await request.formData();
		let siteIdText: any = formData.get('siteId') ?? 0;
		let siteId: number = parseInt(siteIdText);
		const site = await getSite(siteId);

		return { success: true, data: site }
	},
	removeSite: async ({ request }) => {
		const formData = await request.formData()
		const siteId = Number(formData.get('id'))

		removeSite(siteId)

		return { success: true }
	}

	/*
	default: async ({ request }) => {
		const data = await request.formData();
		let siteId = data.get('siteId') ?? 0;
		await getSite(siteId);
	}
	*/
}

