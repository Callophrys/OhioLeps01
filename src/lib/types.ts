import type { CssClasses } from "@skeletonlabs/skeleton";

import type {
  AppConfig,
  Checklist,
  County,
  Role,
  Section,
  Site,
  SiteDate,
  SiteDateObservation,
  SiteStatus,
  State,
  StateRegion,
  StatusCode,
  Taxonomy,
  User,
} from "@prisma/client";

export enum ROLE {
  USER = "USER", // can browse data and run reports, delete own unsigned data
  ENTRY = "ENTRY", // can enter observation data, can download data
  LEAD = "LEAD", // can edit,add,delete root information.
  // E.g.sites and checklists.Can
  //review and sign off 'lock' the data.
  // can unlock own data locks.  Can upload data.
  SUPER = "SUPER", // Can edit anything, manage user issues, restore deleted or lost data, chase audit trails
  ADMIN = "ADMIN", //
  REVIEWER = "REVIEWER",
}

export enum GEOGRAPHIC {
  COUNTY = 0,
  STATEREGION = 1,
}

export enum SORTORDER {
  NONE = 0,
  ASC = 1,
  DSC = 2,
}

export enum WEATHER {
  U = "Unknown",
  O = "Overcast",
  R = "Rain",
  S = "Sun",
  H = "Haze/Smoke",
}

export enum ZOOM_DIR {
  SHRINK = -1,
  ENLARGE = 1,
}

export enum GOTYPE {
  UNKNOWN = -1,
  HOME = 0,
  SITEDATEOBSERVATIONS = 1,
  SITEDATES = 2,
  SITES = 3,
  COUNTYSITES = 4,
  COUNTIES = 5,
  STATEREGIONS = 6,
  STATES = 7,
  COUNTRYREGIONS = 8,
  COUNTRIES = 9,
  CONTINENTREGIONS = 10,
  CONTINENTS = 11,
}

export type AppConfigFormKeyChecked = AppConfig & {
  checked: boolean;
  formKey: string;
};
export type ChecklistScientificName = Checklist & { scientificName: string };
export type CountyComplete = CountyMonitored & {
  stateRegion: StateRegion;
  sites: Site[];
};
export type CountyFilterProps = {
  vButtonGroupClasses: CssClasses;
  elementZwei: CssClasses;
  elementDrei: CssClasses;
  controlBody: CssClasses | null;
};
export type CountyMonitored = County & {
  isMonitored: boolean;
  siteCount: number;
  state: State;
};
export type CountySites = County & { sites: Site[] };
export type CountyState = County & { state: State };

export const MonitorStatus = {
  ALL: 0,
  MONITORED: 1,
  UNMONITORED: 2,
};

export type UserComplete = User & {
  firstLast: string;
  lastFirst: string;
  role: Role;
};
export type SiteDateSiteName = SiteDate & { site: Site };
export type SiteDateObservationChecklist = SiteDateObservation & {
  checklist: ChecklistScientificName;
  total: number;
  createdBy: UserComplete;
  updatedBy: UserComplete;
  confirmBy: UserComplete;
  siteDate: SiteDateSiteName;
};
export type SiteDateYear = SiteDate & {
  siteName: string;
  year: number;
  createdBy: UserComplete;
  updatedBy: UserComplete;
  confirmBy: UserComplete;
};
export type SiteDateYearSdo = SiteDateYear & {
  siteDateObservations: SiteDateObservation[];
};
export type SiteDateYearSiteDates = SiteDate & {
  siteName: string;
  year: number;
  site: Site & { siteDates: SiteDate[] };
  createdBy: UserComplete;
  updatedBy: UserComplete;
  confirmBy: UserComplete;
};

// Site-based
export type SiteCounty = Site & { county: County };
export type SiteCountyState = Site & { county: CountyState };
export type SiteCountySiteDates = Site & {
  county: County;
  siteDates: SiteDateYear[];
};
export type SiteStatusCode = SiteStatus & { statusCode: StatusCode };
export type SiteCountyStatuses = Site & {
  county: County;
  siteStatuses: SiteStatusCode[];
};
export type SiteCountySiteDatesSiteStatuses = Site & {
  county: County;
  sections: Section[];
  siteDates: SiteDateYear[];
  siteStatuses: SiteStatusCode[];
  createdBy: User;
  updatedBy: User;
};

export type SpeciesSearchParams = {
  specimenIds: number[];
  countyIds: number[];
  dateStart: Date | null;
  dateEnd: Date | null;
  stateRegion: string | null;
  year: number | null;
  week: number | null;
};

export type CountySpecimen = {
  countyId: number;
  county: string;
  stateRegion: string;
  recordDate: Date;
  checklistId: number;
  commonName: string;
  scientificName: string;
  genus: string;
  species: string;
  subSpecies: string;
};

export type TaxonomyComplete = Taxonomy & {
  branchTaxa: number[]; // Not complte - objects' only contain id at this time
  baseTaxon: Taxonomy & {
    // Not complete
    baseTaxon: Taxonomy; // Not complete
  };
};

export type SiteRecordDate = { siteDateId: number; recordDate: Date };

export type DateTracking = {
  siteDateId: number | null;
  year: number | null;
  week: number | null;
  recordDate: Date | null;
  fDate: string | null;
};

export type DateTrackingSet = {
  id: number;
  children: DateTracking[];
};

export type ChangelessSite = Omit<
  Site,
  "changedAt" | "changedById" | "updatedAt" | "updatedById"
>;
