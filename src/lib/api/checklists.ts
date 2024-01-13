import prisma from '$lib/prisma'

export async function getChecklist(checklistId: number) {
	const checklist = await prisma.checklist.findUnique({
		where: {
			checklistId: checklistId
		}
	})
}

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

export async function addChecklist(checklist: any) {
  const newChecklist = await prisma.checklist.create({
    data: {
		hodges: 'A000',
		genus: 'Shmoo',
		species: 'cutie',
		subspecies: 'cat',
		commonName: 'Stella is a cute Shmoo',
		show: true,
		kind: 'X',
		revised: 'N',
		author: 'Donat, N.',
		referenceCount: 23,
		countyCount: 1,
		endangered: 'rare',
    }
  });

  return newChecklist;
}

export async function updateChecklist(checklist: any) {
}

export async function removeChecklist(checklist: any) {
}

