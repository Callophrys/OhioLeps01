export async function load({ fetch }) {
	console.log('sites - fetch');
	const response = await fetch('../api/sites');
	/*
	response.text()
	.then((text) => {
		console.log('body: ' + text);
	});
	*/

	const sites = await response.json()
	return { sites }
}
