
import type { Handle } from '@sveltejs/kit'
import prisma from '$lib/prisma'

export const handle: Handle = (async ({ event, resolve }) => {
	//export async function handle({ event, resolve }) {

	console.log('hook me up');
  
	// get cookies from browser
	const session = event.cookies.get('session')

	if (!session) {
		// if there is no session load page as normal
		return await resolve(event)
	}

	// find the user based on the session
	const user = await prisma.user.findUnique({
		where: { userAuthToken: session },
		select: { username: true, role: true },
	})

	// if `user` exists set `events.local`
	if (user) {
		event.locals.user = {
			name: user.username,
			role: user.role.name,
		}
	}

	// load page as normal
	return await resolve(event)
}) satisfies Handle;


/*
import { sequence } from '@sveltejs/kit/hooks';

/// type: import('@sveltejs/kit').Handle
async function first({ event, resolve } : { event: any, resolve: any }) {
	console.log('first pre-processing');
	const result = await resolve(event, {
		transformPageChunk: ({ html } : { html: any }) => {
			// transforms are applied in reverse order
			console.log('first transform');
			return html;
		},
		preload: () => {
			// this one wins as it's the first defined in the chain
			console.log('first preload');
		}
	});
	console.log('first post-processing');
	return result;
}

/// type: import('@sveltejs/kit').Handle
async function second({ event, resolve } : { event: any, resolve: any }) {
	console.log('second pre-processing');
	const result = await resolve(event, {
		transformPageChunk: ({ html } : { html : any }) => {
			console.log('second transform');
			return html;
		},
		preload: () => {
			console.log('second preload');
		},
		filterSerializedResponseHeaders: () => {
			// this one wins as it's the first defined in the chain
		   console.log('second filterSerializedResponseHeaders');
		}
	});
	console.log('second post-processing');
	return result;
}

export const handle = sequence(first, second);
*/