export async function load({ fetch }) {
	const response = await fetch('api/siteobservations')

	const siteobservations = await response.json()
	return { siteobservations }
}
