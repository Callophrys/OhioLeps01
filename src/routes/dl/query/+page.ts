
export async function load({ fetch }) {
	const [responseStateCounties, responseSpecies] =
		await Promise.all([
			fetch('../api/stateCounties'),
			fetch('../api/checklists'),
		]);

	const [ stateCounties, speciesList ] =
		await Promise.all([
			responseStateCounties.json(),
			responseSpecies.json()
		]);

	return { stateCounties, speciesList };
}

