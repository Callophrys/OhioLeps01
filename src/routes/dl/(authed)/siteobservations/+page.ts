export async function load({ fetch }) {
	const response = await fetch('../api/siteobservations')

	const siteObservations = await response.json()
	return { siteObservations }
}
