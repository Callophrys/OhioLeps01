import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

async function getchecklists() {
	const checklists = await prisma.checklist.findMany();
	checklists.sort((first, second) => second.combinedLatin > first.combinedLatin ? 1 : 0);
	return checklists;
}

export async function GET() {
    const checklists = await getchecklists();
    return json(checklists);
}