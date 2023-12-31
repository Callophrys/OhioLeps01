export async function load({ fetch }) {
	const response = await fetch('api/checklists')

	const checklists = await response.json()
	return { checklists }
}
