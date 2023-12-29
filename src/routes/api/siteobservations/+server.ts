import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

async function getSiteObservations() {
	const siteObservations = await prisma.siteObservation.findMany();
    // skip sorting
	return siteObservations;
}

export async function GET() {
    const siteObservations = await getSiteObservations();
    return json(siteObservations);
}
