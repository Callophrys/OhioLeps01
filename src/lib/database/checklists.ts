import prisma from '$lib/prisma';
import type { SpeciesSearchParams, CountySpecimen } from '$lib/types';
import { getCountySpecimens } from './counties';
import type { Checklist } from '@prisma/client';

export async function getChecklist(checklistId: number) {
    const checklist = await prisma.checklist.findUnique({
        where: {
            id: checklistId,
        },
    });

    return checklist;
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
                subspecies: { sort: 'asc', nulls: 'first' },
            },
        ],
    });

    return checklists;
}

export async function getChecklistsBySiteDateObsId(id: number) {
    const checklists = await prisma.checklist.findMany({
        select: {
            siteDateObservations: {
                where: {
                    id: id,
                },
                select: {
                    siteDate: true,
                },
            },
        },
        orderBy: [
            {
                genus: 'asc',
            },
            {
                species: 'asc',
            },
            {
                subspecies: { sort: 'asc', nulls: 'first' },
            },
        ],
    });

    return checklists;
}

export async function getChecklistsBySiteDateId(siteDateId: number) {
    const checklists = await prisma.checklist.findMany({
        select: {
            siteDateObservations: {
                where: {
                    siteDateId: siteDateId,
                },
                select: {
                    siteDateId: true,
                },
            },
        },
        orderBy: [
            {
                genus: 'asc',
            },
            {
                species: 'asc',
            },
            {
                subspecies: { sort: 'asc', nulls: 'first' },
            },
        ],
    });

    return checklists;
}

export async function getChecklistsBySiteId(siteId: number): Promise<Checklist[]> {
    const checklists: Checklist[] = await prisma.$queryRaw<Checklist[]>`
		select id 
		, hodges
		, genus
		, species
		, subspecies
		, commonName
		, \`show\`
		, kind
		, revised
		, author
		, year
		, referenceCount
		, countyCount
		, endangered
		, synonym
		, family
		, gCKey
		, grp
		, tmp_SitesReporting
		, tmp_TotalCount
		, tmp_HighCount
		, taxonId
		from checklist where id in (
			select o.checklistid
			from sitedate d
			inner join sitedateobservation o on o.siteDateId = d.id
			where d.id = ${siteId})`;
    return checklists;
}

export async function getChecklistsFiltered(filter: SpeciesSearchParams): Promise<CountySpecimen[]> {
    console.log('filter', filter);

    // result is distinc, consider numbers later
    const CountySpecimens: CountySpecimen[] = await prisma.$queryRaw<CountySpecimen[]>`
select distinct
c.id countyId,
c.name county,
r.name stateRegion,
d.recordDate,
l.id checklistId,
l.commonName,
l.genus,
l.species,
l.subSpecies
from county c
inner join stateRegion r on c.stateRegionId = r.id
inner join site s on s.countyId = c.id
inner join sitedate d on d.siteid = s.id
inner join siteDateObservation o on o.sitedateid = d.id
inner join checklist l on l.id = o.checklistid`;

    let useSpecimens = filter && filter.specimenIds && filter.specimenIds.length;
    let useCounties = filter && filter.countyIds && filter.countyIds.length;

    return CountySpecimens.filter((cs: any) => (useSpecimens ? filter.specimenIds.includes(cs.checklistId) : true) && (useCounties ? filter.countyIds.includes(cs.countyId) : true) && (filter.dateStart ? new Date(cs.recordDate) >= filter.dateStart : true) && (filter.dateEnd ? new Date(cs.dateEnd) <= filter.dateEnd : true));

    /* filter on:
	 {
		filter: {
			// First level (ids, taxa) is AND, i.e. must have all conditions met
			ids: [],                // species or sub-species id (kept in same table so this works)
									// missing or empty means do not filter on specific species or sub-species
			taxa: [
				// This level is OR, so from 2-taxon filter x genus or from y family is supported
				// Caveat emptor: 2-taxon filter on (x genus or y family) when x is already in family y
				//                will result in full search on y family
				// missing or empty means do not filter on taxa
				{
					// taxonType: '',  // name of taxonomic level // (kept in same table so this is actually unnecessary)
					taxonIds: []    // empty or missing denotes all (no filter on)
									// while type family and 2 ids would mean get all from the 2 referered to families
				}
			],
			geographic: [
				{
					geographicTable: '', // table name of region type
					geophaphicIds: []   // one or more ids of the region type
				}
			]
		}
	 }

	*/
}

export async function addItem(checklist: any) {
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
        },
    });

    return newChecklist;
}

export async function updateItem(checklistId: number) {}

export async function removeItem(checklistId: number) {}
