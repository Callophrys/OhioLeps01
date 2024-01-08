export async function load({ fetch }) {
	const response = await fetch('../api/taxonomy')

	const taxonomy = await response.json()
	return { taxonomy }
}

export const prerender = true;