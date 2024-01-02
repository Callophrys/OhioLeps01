
export async function load({ fetch }) {
	const response = await fetch('../api/stateCounties');
	const stateCounties = await response.json();
	return { stateCounties };
}

