import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

async function gettaxonomy() {
	const taxonomy = await prisma.taxonomy.findMany();
	taxonomy.sort((first, second) => second.latinName > first.latinName ? 1 : 0);
	return taxonomy;
}

export async function GET() {
    const taxonomy = await gettaxonomy();
    return json(taxonomy);
}