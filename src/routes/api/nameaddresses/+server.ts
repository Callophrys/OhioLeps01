import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

async function getNameAddresses() {
	const nameAddresses = await prisma.nameAddress.findMany();
	nameAddresses.sort((first, second) => second.fullName > first.fullName ? 1 : 0);
	return nameAddresses;
}

export async function GET() {
    const nameAddresses = await getNameAddresses();
    return json(nameAddresses);
}