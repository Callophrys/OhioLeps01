import { ROLE } from "$lib/types.js";
import type { Actions } from "@sveltejs/kit";
import type {
  SiteDateYearSdo,
  SiteDateYearSiteDates,
  SiteDateObservationChecklist,
  SiteCounty,
} from "$lib/types.js";
import type { SiteDate } from "@prisma/client";
import type { Weather } from "@prisma/client";
import { getSites } from "$lib/database/sites.js";
import {
  getSiteDate,
  getSiteDateSiteDates,
  addSiteDate,
  updateSiteDate,
} from "$lib/database/sitedates";
import { getSiteDateObservationsBySiteDate } from "$lib/database/sitedateobservations.js";
import { getChecklists } from "$lib/database/checklists.js";
import {
  sdoLoad,
  siteDateObservationActions,
} from "$lib/server/siteDataObservations";

export async function load({ params }: { params: any }) {
  // console.log('sitedates - params', params);

  let siteDateId = Number(params.sitedateid);
  const [siteDate, sites, siteDates, siteDateObservations, checklistsAll] =
    await Promise.all([
      getSiteDate(siteDateId),
      getSites(null),
      getSiteDateSiteDates(siteDateId),
      getSiteDateObservationsBySiteDate(siteDateId),
      getChecklists(),
    ]);
  let siteId = Number(siteDate?.siteId);

  // console.log('sites', sites);
  // console.log('siteDate', siteDate);

  const jsonD = JSON.stringify(siteDate);
  const jsonResultD: SiteDateYearSdo = JSON.parse(jsonD);

  const jsonS = JSON.stringify(sites);
  const jsonResultS: SiteCounty[] = JSON.parse(jsonS);

  const jsonYW = JSON.stringify(siteDates);
  const jsonResultYW: SiteDateYearSiteDates[] = JSON.parse(jsonYW);

  const jsonO = JSON.stringify(siteDateObservations);
  const jsonResultO: SiteDateObservationChecklist[] = JSON.parse(jsonO);

  const jsonA = JSON.stringify(checklistsAll);
  const jsonResultA: SiteDateObservationChecklist[] = JSON.parse(jsonA);

  const sdoData = await sdoLoad(siteId, siteDateId);
  const jsonX = JSON.stringify(sdoData);
  const jsonResultX: any[] = JSON.parse(jsonX);
  // console.log('sitedates - sdoData', sdoData);

  return {
    siteDate: jsonResultD,
    sites: jsonResultS,
    siteDates: jsonResultYW,
    siteDateObservations: jsonResultO,
    checklistsAll: jsonResultA,
    sdoData: jsonResultX,
  };
}

// export const siteDateActions: Actions = {
const siteDateActions: Actions = {
  createSiteDate: async ({ request, locals }) => {
    if (
      locals.user.role !== ROLE.SUPER &&
      locals.user.role !== ROLE.ADMIN &&
      locals.user.role !== ROLE.ENTRY
    ) {
      return; // TODO: log this and throw some kind of error
    }

    console.log("made it here");
    const formData = await request.formData();
    console.log(formData);

    // Adjust record date
    let tzOffset = 1000 * 60 * Number(formData.get("tzOffset"));
    let recordDate = new Date(
      new Date(String(formData.get("recordDate"))).valueOf() + tzOffset,
    );

    // Convert times to adjusted dates
    let startTimeString = String(formData.get("startTime")).split(":");
    let startTime =
      1000 *
      60 *
      (Number(startTimeString[0]) * 60 + Number(startTimeString[1]));
    let startTimeDate = new Date(recordDate.valueOf() + startTime);

    let endTimeString = String(formData.get("endTime")).split(":");
    let endTime =
      1000 * 60 * (Number(endTimeString[0]) * 60 + Number(endTimeString[1]));
    let endTimeDate = new Date(recordDate.valueOf() + endTime);
    console.log(
      "recordDate",
      recordDate,
      "startTimeDate",
      startTimeDate,
      "endTimeDate",
      endTimeDate,
    );

    // console.log('pre', formData);
    Array.from(formData.entries()).forEach(([k, v]) => {
      // console.log('k', k, 'v', v);
      if (v === "null" && k.startsWith("weather")) {
        formData.set(k, "U");
      }
    });
    // console.log('post', formData);

    const siteDate = {
      id: -1,
      siteId: Number(formData.get("siteId")),
      recordDate: recordDate,
      week: Number(formData.get("week")),
      recorder: String(formData.get("recorder")),
      startTime: (String(startTimeDate) === "null"
        ? null
        : startTimeDate) as Date | null,
      endTime: (String(endTimeDate) === "null"
        ? null
        : endTimeDate) as Date | null,
      startTemp: Number(formData.get("startTemp")),
      endTemp: Number(formData.get("endTemp")),
      startClouds: Number(formData.get("startClouds")),
      endClouds: Number(formData.get("endClouds")),
      startWindDir: String(formData.get("startWindDir")),
      endWindDir: String(formData.get("endWindDir")),
      startWindMPH: Number(formData.get("startWindMPH")),
      endWindMPH: Number(formData.get("endWindMPH")),
      weather1: (String(formData.get("weather1")) === "null"
        ? "U"
        : String(formData.get("weather1"))) as Weather,
      weather2: String(formData.get("weather2") ?? "U") as Weather,
      weather3: String(formData.get("weather3") ?? "U") as Weather,
      weather4: String(formData.get("weather4") ?? "U") as Weather,
      weather5: String(formData.get("weather5") ?? "U") as Weather,
      weather6: String(formData.get("weather6") ?? "U") as Weather,
      weather7: String(formData.get("weather7") ?? "U") as Weather,
      weather8: String(formData.get("weather8") ?? "U") as Weather,
      weather9: String(formData.get("weather9") ?? "U") as Weather,
      weather10: String(formData.get("weather10") ?? "U") as Weather,
      weather11: String(formData.get("weather11") ?? "U") as Weather,
      weather12: String(formData.get("weather12") ?? "U") as Weather,
      weather13: String(formData.get("weather13") ?? "U") as Weather,
      weather14: String(formData.get("weather14") ?? "U") as Weather,
      weather15: String(formData.get("weather15") ?? "U") as Weather,
      larvalEnergy1: String(formData.get("larvalEnergy1")),
      larvalEnergy2: String(formData.get("larvalEnergy2")),
      larvalEnergy3: String(formData.get("larvalEnergy3")),
      larvalEnergy4: String(formData.get("larvalEnergy4")),
      larvalEnergy5: String(formData.get("larvalEnergy5")),
      larvalEnergy6: String(formData.get("larvalEnergy6")),
      larvalEnergy7: String(formData.get("larvalEnergy7")),
      larvalEnergy8: String(formData.get("larvalEnergy8")),
      larvalEnergy9: String(formData.get("larvalEnergy9")),
      larvalEnergy10: String(formData.get("larvalEnergy10")),
      larvalEnergy11: String(formData.get("larvalEnergy11")),
      larvalEnergy12: String(formData.get("larvalEnergy12")),
      larvalEnergy13: String(formData.get("larvalEnergy13")),
      larvalEnergy14: String(formData.get("larvalEnergy14")),
      larvalEnergy15: String(formData.get("larvalEnergy15")),
      larvaObservedA: String(formData.get("larvaObservedA")),
      larvaObservedB: String(formData.get("larvaObservedB")),
      larvaObservedC: String(formData.get("larvaObservedC")),
      larvaObservedD: String(formData.get("larvaObservedD")),
      energySource1: String(formData.get("energySource1")),
      energySource2: String(formData.get("energySource2")),
      energySource3: String(formData.get("energySource3")),
      energySource4: String(formData.get("energySource4")),
      flowersInBloom: String(formData.get("flowersInBloom")),
      fieldNotes: String(formData.get("fieldNotes")),
      createdAt: new Date(),
      createdById: locals.user.id,
    } as SiteDate;

    console.log(siteDate);

    const createdSiteDate: SiteDate = await addSiteDate(siteDate);
    console.log(createdSiteDate);
    return { id: createdSiteDate.id ?? -1 };
  },
  updateSiteDate: async ({ request, locals }) => {
    if (
      locals.user.role !== ROLE.SUPER &&
      locals.user.role !== ROLE.ADMIN &&
      locals.user.role !== ROLE.ENTRY
    ) {
      return; // TODO: log this and throw some kind of error
    }

    console.log("made it here");
    const formData = await request.formData();
    console.log(formData);

    // Adjust record date
    let tzOffset = 1000 * 60 * Number(formData.get("tzOffset"));
    let recordDate = new Date(
      new Date(String(formData.get("recordDate"))).valueOf() + tzOffset,
    );

    // Convert times to adjusted dates
    let startTimeString = String(formData.get("startTime")).split(":");
    let startTime =
      1000 *
      60 *
      (Number(startTimeString[0]) * 60 + Number(startTimeString[1]));
    let startTimeDate = new Date(recordDate.valueOf() + startTime);

    let endTimeString = String(formData.get("endTime")).split(":");
    let endTime =
      1000 * 60 * (Number(endTimeString[0]) * 60 + Number(endTimeString[1]));
    let endTimeDate = new Date(recordDate.valueOf() + endTime);
    console.log(
      "recordDate",
      recordDate,
      "startTimeDate",
      startTimeDate,
      "endTimeDate",
      endTimeDate,
    );

    const siteDate = {
      id: Number(formData.get("siteDateId")),
      siteId: Number(formData.get("siteId")),
      recordDate: recordDate,
      week: Number(formData.get("week")),
      recorder: String(formData.get("recorder")),
      startTime: startTimeDate,
      endTime: endTimeDate,
      startTemp: Number(formData.get("startTemp")),
      endTemp: Number(formData.get("endTemp")),
      startClouds: Number(formData.get("startClouds")),
      endClouds: Number(formData.get("endClouds")),
      startWindDir: String(formData.get("startWindDir")),
      endWindDir: String(formData.get("endWindDir")),
      startWindMPH: Number(formData.get("startWindMPH")),
      endWindMPH: Number(formData.get("endWindMPH")),
      weather1: String(formData.get("weather1")) as Weather,
      weather2: String(formData.get("weather2")) as Weather,
      weather3: String(formData.get("weather3")) as Weather,
      weather4: String(formData.get("weather4")) as Weather,
      weather5: String(formData.get("weather5")) as Weather,
      weather6: String(formData.get("weather6")) as Weather,
      weather7: String(formData.get("weather7")) as Weather,
      weather8: String(formData.get("weather8")) as Weather,
      weather9: String(formData.get("weather9")) as Weather,
      weather10: String(formData.get("weather10")) as Weather,
      weather11: String(formData.get("weather11")) as Weather,
      weather12: String(formData.get("weather12")) as Weather,
      weather13: String(formData.get("weather13")) as Weather,
      weather14: String(formData.get("weather14")) as Weather,
      weather15: String(formData.get("weather15")) as Weather,
      larvalEnergy1: String(formData.get("larvalEnergy1")),
      larvalEnergy2: String(formData.get("larvalEnergy2")),
      larvalEnergy3: String(formData.get("larvalEnergy3")),
      larvalEnergy4: String(formData.get("larvalEnergy4")),
      larvalEnergy5: String(formData.get("larvalEnergy5")),
      larvalEnergy6: String(formData.get("larvalEnergy6")),
      larvalEnergy7: String(formData.get("larvalEnergy7")),
      larvalEnergy8: String(formData.get("larvalEnergy8")),
      larvalEnergy9: String(formData.get("larvalEnergy9")),
      larvalEnergy10: String(formData.get("larvalEnergy10")),
      larvalEnergy11: String(formData.get("larvalEnergy11")),
      larvalEnergy12: String(formData.get("larvalEnergy12")),
      larvalEnergy13: String(formData.get("larvalEnergy13")),
      larvalEnergy14: String(formData.get("larvalEnergy14")),
      larvalEnergy15: String(formData.get("larvalEnergy15")),
      larvaObservedA: String(formData.get("larvaObservedA")),
      larvaObservedB: String(formData.get("larvaObservedB")),
      larvaObservedC: String(formData.get("larvaObservedC")),
      larvaObservedD: String(formData.get("larvaObservedD")),
      energySource1: String(formData.get("energySource1")),
      energySource2: String(formData.get("energySource2")),
      energySource3: String(formData.get("energySource3")),
      energySource4: String(formData.get("energySource4")),
      flowersInBloom: String(formData.get("flowersInBloom")),
      fieldNotes: String(formData.get("fieldNotes")),
      updatedAt: new Date(),
      updatedById: locals.user.id,
    } as SiteDate;

    console.log(siteDate);

    const newSiteDate: SiteDate = await updateSiteDate(siteDate);
    return { id: newSiteDate.id ?? -1 };
  },
};

export const actions: Actions = {
  ...siteDateActions,
  ...siteDateObservationActions,
};
