export async function load({ fetch }) {
	const response = await fetch('../api/counties')
	const counties = await response.json();
	return { counties };
}
