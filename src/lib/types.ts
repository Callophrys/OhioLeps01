import type { State } from '@prisma/client'

// Example: export type SomeNewName <T> = Partial<T> & { newMember: boolean }

export type ChecklistCombinedName<T> = Partial<T> & { xname: string }
export type CountyIsMonitored<T> = Partial<T> & { isMonitored: boolean, siteCount: number, state: State }

export type specimenSearch = {
	specimenIds: number[],
	countyIds: number[],
	dateStart: Date | null,
	dateEnd: Date | null,
	region: string | null,
	year: number | null,
	week: number | null
}

export type countySpecimen = {
	countyId: number,
	county: string,
	region: string,
	recordDate: Date,
	checklistId: number,
	commonName: string,
	scientificName: string,
	genus: string,
	species: string,
	subSpecies: string,
}