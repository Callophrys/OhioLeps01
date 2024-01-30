import { getTaxonomy } from '$lib/database/taxonomy.js';
//import type { TaxonomyComplete } from '$lib/types';

export async function load() {
	const taxonomy: any[] = await getTaxonomy();
	return { taxonomy }
}