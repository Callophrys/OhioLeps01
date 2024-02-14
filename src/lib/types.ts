import type {
	AppConfig,
	County, State, Checklist, Region,
	Site, SiteDate, SiteDateObservation, Taxonomy
} from '@prisma/client'

export enum Role {
	USER = 'USER', // can browse data and run reports, delete own unsigned data
	ENTRY = 'ENTRY', // can enter observation data, can download data
	LEAD = 'LEAD', // can edit,add,delete root information.
	// E.g.sites and checklists.Can
	//review and sign off 'lock' the data.
	// can unlock own data locks.  Can upload data.
	ADMIN = 'ADMIN', // Can edit anything, manage user issues, restore deleted or lost data, chase audit trails
}

export enum SORTORDER {
	NONE = 0,
	ASC = 1,
	DSC = 2,
}

export enum ZOOM_DIR {
	SHRINK = -1,
	ENLARGE = 1,
}

export type AppConfigFormKeyChecked = AppConfig & { checked: boolean, formKey: string }
export type ChecklistScientificName = Checklist & { scientificName: string }
export type CountyMonitored = County & { isMonitored: boolean, siteCount: number, state: State }
export type CountyComplete = CountyMonitored & { region: Region, sites: Site[] }
export type SiteDateObservationChecklist = SiteDateObservation & {
	checklist: ChecklistScientificName,
	total: number
}
export type SiteDateYear = SiteDate & { siteName: string, year: number }
export type SiteCounty = Site & { county: County }
export type SiteCountySiteDates = Site & { county: County, siteDates: SiteDateYear[] }

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

export type SiteRecordDate = { siteDateId: number, recordDate: Date }