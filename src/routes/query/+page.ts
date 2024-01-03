
export async function load({ fetch }) {
	const [responseStateCounties, responseSpecies] =
		await Promise.all([
			fetch('../api/stateCounties'),
			fetch('../api/checklists'),
		]);

	const stateCounties = await responseStateCounties.json();
	const speciesList = await responseSpecies.json();

	return { stateCounties, speciesList };
}

