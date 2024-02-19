import type { Handle } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import * as config from '$lib/config';
import * as appConfigs from '$lib/database/appconfig';

export const handle: Handle = (async ({ event, resolve }) => {


	// get cookies from browser
	const session = event.cookies.get('session')

	if (!session) {
		// if there is no session load page as normal
		return await resolve(event)
	}

	// find the user based on the session
	const user = await prisma.user.findUnique({
		where: { userAuthToken: session },
		select: { id: true, username: true, role: true, organizationId: true },
	});

	// if `user` exists set `events.local`
	if (user) {
		event.locals.user = {
			id: user.organizationId,
			name: user.username,
			role: user.role.name,
			organizationId: user.organizationId
		}
		event.locals.appConfigs = await appConfigs.getAppConfigsByOrgName(user.organizationId);
		if (event.locals.appConfigs === undefined || event.locals.appConfigs.length === 0) {
			event.locals.appConfigs = await appConfigs.getAppConfigsByOrgName(config.defaultOrganization);
		}
	} else {
		event.locals.appConfigs = await appConfigs.getAppConfigsByOrgName(config.defaultOrganization);
	}

	if (event.locals.appConfigs === undefined || event.locals.appConfigs.length === 0) {
		event.locals.appConfigs = await appConfigs.getTemplateAppConfigs();
	}

	// load page as normal
	return await resolve(event)
}) satisfies Handle;