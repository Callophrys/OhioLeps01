import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

async function getTaxonomy() {
	const taxonomy = await prisma.taxonomy.findMany({
		include: {
			branchTaxa: {
				select: {
					id: true
				}
			},
			baseTaxon: {
				select: {
					id: true,
					taxonType: true,
					latinName: true,
					baseTaxon: {
						select: {
							id: true,
							taxonType: true,
							latinName: true,
							baseTaxon: false,
						}
					}
				}
			}
		}
	});
	taxonomy.sort((first, second) => second.latinName > first.latinName ? 1 : 0);
	return taxonomy;
}

export async function GET() {
	const taxonomy = await getTaxonomy();
	return json(taxonomy);
}