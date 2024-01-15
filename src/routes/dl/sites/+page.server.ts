import { fail } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { addSite, getSite, getSites, removeSite } from '$lib/api/entry/sites.js';
import { json } from '@sveltejs/kit'
import type { Site } from '@prisma/client';

export async function load({ cookies, url }) {
	console.log('Load from dl/sites/+page.server.ts');

	// SECURITY - only checking session NOT user or role at this time
	if (!cookies.get('session')) {
		throw redirect(303, `/login?redirectTo=${url.pathname}`);
	}

	const sites = await getSites();
	return { sites };
}

export const actions = {
	
	addSite: async ({ request }) => {
	console.log('addSite from dl/sites/+page.server.ts');
		const formData = await request.formData();
		const site = String(formData.get('site'));

		if (!site) {
			return fail(400, { site, missing: true })
		}

		await addSite(site);
		return { success: true }
	},

	getSite: async ({ request }) => {
	console.log('getSite from dl/sites/+page.server.ts');
		const formData = await request.formData();
		let siteId: number = Number(formData.get('siteId') ?? 0);
		const site = await getSite(siteId);

		return { success: true, data: site }
	},

	removeSite: async ({ request }) => {
	console.log('removeSite from dl/sites/+page.server.ts');
		const formData = await request.formData();
		const siteId = Number(formData.get('siteId') ?? 0);
		console.log('siteId:', siteId);

		await removeSite(siteId);
		return { success: true }
	}
}

