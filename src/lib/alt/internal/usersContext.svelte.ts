export const usersContext: {
  siteId: BigInt;
  siteName: string;
  usersIncluded: any[];
  usersExcluded: any[];
} = $state({ siteId: BigInt(0), siteName: "", usersIncluded: [], usersExcluded: [] });
