// +page.server.ts version
import type { StateCounty } from "@prisma/client";
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch('/api/stateCounties');

  return { stateCounties: (await response.json()) as StateCounty[] };
};

// +page.ts version
/*
export async function load({ fetch }) {
	const response = await fetch('../api/checklists')

	const checklists = await response.json()
	return { checklists }
}
*/
