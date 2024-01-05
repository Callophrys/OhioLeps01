export async function load({ fetch }) {
	const response = await fetch('../api/nameaddresses')

	const nameAddresses = await response.json()
	return { nameAddresses }
}
