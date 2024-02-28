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

export async function getSiteDates(siteId: number) {
	const siteDates = await prisma.siteDate.findMany({
		where: {
			siteId: siteId
		},
		orderBy: [
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

export async function getSiteDatesAll() {
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

export async function getSiteDateSiteDates(siteDateId: number) {

	const siteDateSiteDates = await prisma.siteDate.findUnique({
		where: {
			siteDateId: siteDateId,
		},
		select: {
			site: {
				select: {
					siteDates: true
				}
			}
		}
	});

	return siteDateSiteDates?.site.siteDates;
}
