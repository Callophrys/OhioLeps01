

/*
// https://joyofcode.xyz/sveltekit-markdown-blog#showing-a-single-post
export type Categories = 'sveltekit' | 'svelte'

export type Post = {
	title: string
	slug: string
	description: string
	date: string
	categories: Categories[]
	published: boolean
}
*/

export type StateCounty = {
  stateCountyId: number,
  state: string,
  county: string,

  sites: Site[],
}

export type Site = {
  siteId: number,
  siteName: string,
  county: string, // deprecated
  township: string,
  locationZip: string,
  siteAddress: string,
  siteAddress2: string,
  siteCityStateZip: string,
  person: string,
  address: string,
  address2: string,
  cityStateZip: string,
  phone: string,
  email: string,
  latitudeStart: string,
  latitudeEnd: string,
  altPerson: string,
  altAddress: string,
  altAddress2: string,
  altCityStateZip: string,
  altPhone: string,
  altEmail: string,
  otherParticipants: string,
  description: string,
  // Should make these numbers since their pointing to statusCode
  s1995: string,
  s1996: string,
  s1997: string,
  s1998: string,
  s1999: string,
  s2000: string,
  s2001: string,
  s2002: string,
  s2003: string,
  s2004: string,
  changeDate: string,

  stateCounty: StateCounty,
  stateCountyId: number,
  
  siteDates: SiteDate[],
  siteStatuses: SiteStatus[]
}

export type CheckList = {
    checkListId: number,
    genus: string,
    species: string,
    subspecies: string,
    combinedLatin: string,
    commonName: string,
    show: boolean,
    kind: string,
    revised: string,
    author: string,
    year: string,
    changeDate: string,
    changeBy: string,
    comment: string,
    references: number,
    countys: number,
    endangered: string,
    synonym: string,
    family: number,
    gCKey: number,
    grp: number,
    sortOrder: string,
    tmp_SitesReporting: number,
    tmp_TotalCount: number,
    tmp_HighCount: number,
    
    siteObservations: SiteObservation[]
}

export type SiteObservation = {
    siteObservationId: number,
    seqId: number, // deprecated
    checkListId: string,
    id: string,
    total: number,
    s1: number,
    s2: number,
    s3: number,
    s4: number,
    s5: number,
    s6: number,
    s7: number,
    s8: number,
    s9: number,
    s10: number,
    s11: number,
    s12: number,
    s13: number,
    s14: number,
    s15: number,
    mark: string,
    dateChg: string,
    
    checklist: CheckList,
    checklistId: number,
    
    siteDate: SiteDate,
    siteDateId: number
}

export type StatusCode = {
    statusCodeId: number,
    code: string,
    description: string,
}

export type SiteStatus = {
    siteStatusId: number,
    siteId: number,
    statusCodeId: number,
    year: number,
}

export type SiteDate = {
    siteDateId: number,
    seqId: number, // deprecated
    date: string,
    week: number,
    recorder: string,
    startTime: string,
    endTime: string,
    startTemp: number,
    endTemp: number,
    startClouds: number,
    endClouds: number,
    startWindDir: string,
    endWindDir: string,
    startWindMPH: number,
    endWindMPH: number,
    w1: string,
    w2: string,
    w3: string,
    w4: string,
    w5: string,
    w6: string,
    w7: string,
    w8: string,
    w9: string,
    w10: string,
    w11: string,
    w12: string,
    w13: string,
    w14: string,
    w15: string,
    lEsec1: string,
    lEsec2: string,
    lEsec3: string,
    lEsec4: string,
    lEsec5: string,
    lEsec6: string,
    lEsec7: string,
    lEsec8: string,
    lEsec9: string,
    lEsec10: string,
    lEsec11: string,
    lEsec12: string,
    lEsec13: string,
    lEsec14: string,
    lEsec15: string,
    larvaObA: string,
    larvaObB: string,
    larvaObC: string,
    larvaObD: string,
    energySource1: string,
    energySource2: string,
    energySource3: string,
    energySource4: string,
    flowersInBloom: string,
    fieldNotes: string,
    dateChg: string,

    siteObservations: SiteObservation[],

    site: Site,
    siteId: number
}
