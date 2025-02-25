import { fail } from "@sveltejs/kit";
import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";
//import { getChecklists } from '$lib/api/checklists.js';
import { getCountiesExpanded } from "$lib/database/counties";
import { getChecklists, getChecklistsFiltered } from "$lib/database/checklists";
import type { ChecklistScientificName, SpeciesSearchParams } from "$lib/types";
import type { County } from "@prisma/client";
import type { Checklist } from "@prisma/client";
import type { CountySpecimen } from "$lib/types";
import { scientificName } from "$lib/utils.js";
import { sep } from "path";

/*
export async function load({ cookies, url }) {
	console.log('Load from +page.server.ts');

	// SECURITY - only checking session NOT user or role at this time
	if (!cookies.get('session')) {
		throw redirect(303, `/login?redirectTo=${url.pathname}`);
	}

	const checklists = await getChecklists();

	return { checklists };
}
*/

/*
	const [counties, speciesList] =
		await Promise.all([
			responseCounties.json(),
			responseSpecies.json()
		]);

	return { counties, speciesList };
*/
export async function load() {
  const [counties, speciesList] = await Promise.all([
    getCountiesExpanded(),
    getChecklists(),
  ]);

  const jsonC = JSON.stringify(counties);
  const jsonResultC: County[] = JSON.parse(jsonC);

  const jsonS = JSON.stringify(speciesList);
  const jsonResultS: ChecklistScientificName[] = JSON.parse(
    jsonS,
  ) as ChecklistScientificName[];

  return { counties: jsonResultC, speciesList: jsonResultS };
}

export const actions = {
  query: async ({ request }) => {
    const formData = await request.formData();
    //console.log('formData', formData);

    let s: number[] = formData
      .getAll("select-species")
      .map((s: any) => parseInt(s));
    let c: number[] = formData
      .getAll("select-county")
      .map((c: any) => parseInt(c));
    //console.log('s', s, 'c', c);

    let sRangeStart = String(formData.get("range-start"));
    let sRangeEnd = String(formData.get("range-end"));

    const specimenFilter: SpeciesSearchParams = {
      specimenIds: s,
      countyIds: c,
      dateStart: sRangeStart ? new Date(sRangeStart) : null,
      dateEnd: sRangeEnd ? new Date(sRangeEnd) : null,
      region: null,
      year: null,
      week: null,
    };
    //console.log('specimenFilter', specimenFilter);

    const checklists = await getChecklistsFiltered(specimenFilter);
    checklists.forEach((s: CountySpecimen) => {
      s.scientificName = scientificName(s.genus, s.species, s.subSpecies);
    });
    return { success: true, checklists };
  },
};
