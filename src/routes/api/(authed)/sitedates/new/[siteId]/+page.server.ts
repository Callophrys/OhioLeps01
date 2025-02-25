// import { fail } from '@sveltejs/kit';
// import { browser } from '$app/environment';
// import { redirect } from '@sveltejs/kit';
import type { SiteDate } from "@prisma/client";
import type { Actions } from "@sveltejs/kit";
import type { Weather } from "@prisma/client";
import { addSiteDate } from "$lib/database/sitedates";

export async function load({ params }: any) {
  console.log(params);
  return {
    siteId: params.siteId,
  };
}

/*
export async function load({ cookies, url, params }) {
    // SECURITY - only checking session NOT user or role at this time
    if (!cookies.get('session')) {
        throw redirect(303, `/login?redirectTo=${url.pathname}`);
    }

    let countyId = Number(params.countyId);
    console.log(countyId);
    const counties = await getCountiesExpanded();

    const jsonC = JSON.stringify(counties);
    const jsonResultC: County[] = JSON.parse(jsonC);
    // console.log(jsonResultC);

    return { counties: jsonResultC, refCountyId: countyId, countyId: params.countyId };
}
*/

export const actions: Actions = {
  addSiteDate: async ({ request, locals }) => {
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
      siteDateId: -1,
      //week Int
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
      createdAt: new Date(),
      createdById: locals.user.id,
      updatedAt: null,
      updatedById: null,
    } as SiteDate;

    console.log(siteDate);

    const newSiteDate: SiteDate = await addSiteDate(siteDate);
    return { siteDateId: newSiteDate.siteDateId ?? -1 };
  },
};
