import prisma from '$lib/prisma';

export async function getSiteDate(siteDateId: number) {
	console.log('ok');
	const siteDate = await prisma.siteDate.findFirst({
		where: {
			siteDateId: siteDateId
		},
		include: {
			site: {
				select: {
					siteName: true
				}
			}
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

export async function getSiteDateRecordDates(siteDateId: number) {

	const recordDates = await prisma.siteDate.findUnique({
		where: {
			siteDateId: siteDateId,
		},
		select: {
			site: {
				select: {
					siteDates: {
						select: {
							siteDateId: true,
							recordDate: true
						}
					}
				}
			}
		}
	});

	return recordDates;
}