export async function load({ fetch }) {
	const response = await fetch('../api/sitedates')

	const siteDates = await response.json()
	return { siteDates }
}
