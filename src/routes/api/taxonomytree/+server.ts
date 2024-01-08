import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

async function getTaxonomyTree() {
    const taxonomy = await prisma.$queryRaw`SELECT * FROM taxonomy;`;
    return taxonomy;
}

export async function GET() {
    const taxonomy = await getTaxonomyTree();
    return json(taxonomy);
}