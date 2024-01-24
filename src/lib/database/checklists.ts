import prisma from '$lib/prisma'
import { isDate } from 'util/types';
import type { specimenSearch } from '$lib/types';

export async function getChecklist(checklistId: number) {
	const checklist = await prisma.checklist.findUnique({
		where: {
			checklistId: checklistId
		}
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
				subspecies: { sort: 'asc', nulls: 'first' }
			},
		]
	});

	return checklists;
}

export async function getChecklistsFiltered(filter: specimenSearch): Promise<any[]> {

	console.log('filter', filter);
	
	let whereClause = "";
	let useSpecimens = (filter && (filter.specimenIds && filter.specimenIds.length));
	let useCounties = (filter && (filter.countyIds && filter.countyIds.length));
	let useDateStart = (filter && isDate(filter.dateStart));
	let useDateEnd = (filter && isDate(filter.dateEnd));
	
	if (useSpecimens || useCounties || useDateStart || useDateEnd) {
		let useAnd = false;
		whereClause = " where ";
		if (useSpecimens) {
			if (useAnd) whereClause += ' and';
			whereClause += ` l.checklistId in (${filter.specimenIds.join(',')})`;
			useAnd = true;
		}
		if (useCounties) {
			if (useAnd) whereClause += ' and';
			whereClause += ` c.id in (${filter.countyIds.join(',')})`;
			useAnd = true;
		}
		if (useDateStart) {
			if (useAnd) whereClause += ' and';
			whereClause += ` d.recordDate >= ${filter.dateStart?.toISOString()})`;
			useAnd = true;
		}
		if (useDateEnd) {
			if (useAnd) whereClause += ' and';
			whereClause += ` d.recordDate <= ${filter.dateEnd?.toISOString()})`;
			useAnd = true;
		}
	}
	
	let queryString = `
		select
		distinct
		c.name county,
		r.name region,
		l.commonname
		from county c
		inner join region r on c.regionId = r.id
		inner join site s on s.countyId = c.id
		inner join sitedate d on s.siteid = d.siteid
		inner join siteobservation o on d.sitedateid = o.sitedateid
		inner join checklist l on o.checklistid = l.checklistid
	` + whereClause;
	
	console.log('qs', queryString);

	const countySpecimens: any[] = await prisma.$queryRaw`${queryString}`;

	return countySpecimens;

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

	// not yet implemented so return all
	return await getChecklists();
	*/
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

