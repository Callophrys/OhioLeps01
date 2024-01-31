import type {
	County, State, Checklist, Region,
	Site, SiteDate, SiteDateObservation, Taxonomy
} from '@prisma/client'

// Example: export type SomeNewName <T> = Partial<T> & { newMember: boolean }

export type ChecklistScientificName = Checklist & { scientificName: string }
export type CountyMonitored = County & { isMonitored: boolean, siteCount: number, state: State }
export type CountyComplete = CountyMonitored & { region: Region, sites: Site[] }
export type SiteDateObservationChecklist = SiteDateObservation & {
	checklist: ChecklistScientificName,
	total: number
}
export type SiteDateYear = SiteDate & { siteName: string, year: number }
export type SiteCounty = Site & { county: County }

export type SpeciesSearchParams = {
	specimenIds: number[],
	countyIds: number[],
	dateStart: Date | null,
	dateEnd: Date | null,
	region: string | null,
	year: number | null,
	week: number | null
}

export type CountySpecimen = {
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

export type TaxonomyComplete = Taxonomy & {
	branchTaxa: number[], // Not complte - objects' only contain id at this time
	baseTaxon: Taxonomy & { // Not complete
		baseTaxon: Taxonomy // Not complete
	}
}