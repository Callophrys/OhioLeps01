import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

export async function getChecklists() {
	const checklists = await prisma.checklist.findMany({
		orderBy: [
			{
				genus: 'asc',
			},
			{
				species: 'asc',
			},
			{
				subspecies: { sort: 'asc', nulls: 'first' }
			},
		]
	});
	return checklists;
}

export async function GET() {
	const checklists = await getChecklists();
	return json(checklists);
}
