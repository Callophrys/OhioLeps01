import { getTaxonomy } from '$lib/database/taxonomy.js';

export async function load() {
	const taxonomy = await getTaxonomy();
	return { taxonomy }
}