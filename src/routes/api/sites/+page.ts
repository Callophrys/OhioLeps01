import { browser } from "$app/environment";

export function load() {
	if (!browser) return;
}

/*
// loading from page.server.ts now
//
export async function load({ fetch }) {
	console.log('Load from +page.ts > fetch');
	const response = await fetch('../api/sites');

	//response.text()
	//.then((text) => {
	//	console.log('body: ' + text);
	//});

	const sites = await response.json()
	return { sites }
}
*/