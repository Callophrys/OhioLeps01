import type { Actions } from "@sveltejs/kit";
import { siteDateLoad, siteDateActions } from "$lib/server/siteDate";
import {
  sdoLoad,
  siteDateObservationActions,
} from "$lib/server/siteDateObservations";

export async function load({ params }: { params: any }) {
  console.log("sitedates - params", params);

  let siteId = BigInt(params.siteid);
  let siteDateId = BigInt(params.sitedateid);

  const siteData = await siteDateLoad(siteDateId);

  const sdoData: any = await sdoLoad(siteId, siteDateId);
  const jsonX = JSON.stringify(sdoData);
  const jsonResultX: any[] = JSON.parse(jsonX);

  return {
    siteDate: siteData.siteDate,
    sites: siteData.sites,
    siteDates: siteData.siteDates,
    siteDateObservations: siteData.siteDateObservations,
    checklistsAll: siteData.checklistsAll,
    sdoData: jsonResultX,
    // sdoData.sites
    // sdoData.siteDates
    // sdoData.checklistsSiteDateObs
    // sdoData.checklistsSite
    // sdoData.checklistsAll

    // TODO: remove redundant data, e.g. sites and siteDates
  };
}

export const actions: Actions = {
  ...siteDateActions,
  ...siteDateObservationActions,
};
