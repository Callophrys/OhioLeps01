import prisma from '$lib/prisma';

export async function getSiteDate(siteDateId: number) {
	console.log('ok');
	const siteDate = await prisma.siteDate.findFirst({
		where: {
			siteDateId: siteDateId
		}
	});

	return siteDate;
}

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