import type {
	AppConfig,
	County, State, Checklist, Region,
	Site, SiteDate, SiteDateObservation, Taxonomy, User, SiteStatus, StatusCode
} from '@prisma/client'

export enum Role {
	USER = 'USER', // can browse data and run reports, delete own unsigned data
	ENTRY = 'ENTRY', // can enter observation data, can download data
	LEAD = 'LEAD', // can edit,add,delete root information.
	// E.g.sites and checklists.Can
	//review and sign off 'lock' the data.
	// can unlock own data locks.  Can upload data.
	SUPER = 'SUPER', // Can edit anything, manage user issues, restore deleted or lost data, chase audit trails
	ADMIN = 'ADMIN', // 
	REVIEWER = 'REVIEWER',
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
export type CountyComplete = CountyMonitored & { region: Region, sites: Site[] }
export type CountyMonitored = County & { isMonitored: boolean, siteCount: number, state: State }
export type CountySites = County & { sites: Site[] }
export type CountyState = County & { state: State }
export type UserComplete = User & { firstLast: string, lastFirst: string }
export type SiteDateSiteName = SiteDate & { site: Site }
export type SiteDateObservationChecklist = SiteDateObservation & {
	checklist: ChecklistScientificName,
	total: number,
	createdBy: UserComplete,
	updatedBy: UserComplete,
	confirmBy: UserComplete,
	siteDate: SiteDateSiteName
}
export type SiteDateYear = SiteDate & {
	siteName: string,
	year: number,
	createdBy: UserComplete,
	updatedBy: UserComplete,
	confirmBy: UserComplete
}
export type SiteDateYearSiteDates = SiteDate & {
	siteName: string,
	year: number,
	site: Site & { siteDates: SiteDate[]},
	createdBy: UserComplete,
	updatedBy: UserComplete,
	confirmBy: UserComplete
}
export type SiteCounty = Site & { county: County }
export type SiteCountyState = Site & { county: CountyState }
export type SiteCountySiteDates = Site & { county: County, siteDates: SiteDateYear[] }
export type SiteStatusCode = SiteStatus & { statusCode: StatusCode }
export type SiteCountyStatuses = Site & { county: County, siteStatuses: SiteStatusCode[] }

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

export type dateTracking = {
	siteDateId: number,
	year: number,
	week: number,
	recordDate: Date,
	fDate: string;
};

export type dateTrackingSet = {
	id: number;
	children: dateTracking[];
};
