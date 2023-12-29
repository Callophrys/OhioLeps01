import type { Site } from '$lib/types'

export async function load({ fetch }) {
	const response = await fetch('api/sites')
	/*
	response.text()
    .then((text) => {
		console.log('body: ' + text);
    });
	*/

	const sites: Site[] = await response.json()
	return { sites }
}
