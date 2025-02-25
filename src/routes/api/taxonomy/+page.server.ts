import { getTaxonomy } from "$lib/database/taxonomy.js";

export async function load() {
  const taxonomy: any[] = await getTaxonomy();
  return { taxonomy };
}
