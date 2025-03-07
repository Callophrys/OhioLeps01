export const selectedSiteState: {
  selectedSite: number;
  selectedSiteName: string;
  usersIncluded: any[];
  usersExcluded: any[];
} = $state({ selectedSite: 0, selectedSiteName: "", usersIncluded: [] });
