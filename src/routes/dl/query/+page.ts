
export async function load({ fetch }) {
	const [responseCounties, responseSpecies] =
		await Promise.all([
			fetch('../api/counties'),
			fetch('../api/checklists'),
		]);

	const [counties, speciesList] =
		await Promise.all([
			responseCounties.json(),
			responseSpecies.json()
		]);

	return { counties, speciesList };
}

