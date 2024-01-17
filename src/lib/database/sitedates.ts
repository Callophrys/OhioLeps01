import prisma from '$lib/prisma';

export async function getSiteDates() {
	const siteDates = await prisma.siteDate.findMany({
		include: {
			site: true
		},
		orderBy: [
			{
				siteId: 'asc'
			},
			{
				recordDate: 'asc'
			},
			{
				week: 'asc',
			},
		]
	});

	return siteDates;
}