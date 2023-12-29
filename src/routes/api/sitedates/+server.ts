import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

async function getsiteDates() {
	const siteDates = await prisma.siteDate.findMany();
	siteDates.sort((first, second) => second.recordDate > first.recordDate ? 1 : (second.startTime ?? 0) > (first.startTime ?? 0) ? 1 : 0);
	return siteDates;
}

export async function GET() {
    const siteDates = await getsiteDates();
    return json(siteDates);
}