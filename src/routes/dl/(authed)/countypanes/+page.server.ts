// +page.server.ts version
import type { County } from "@prisma/client";
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('/api/counties');

	return { counties: (await response.json()) as County[] };
};

// +page.ts version
/*
export async function load({ fetch }) {
	const response = await fetch('../api/checklists')

	const checklists = await response.json()
	return { checklists }
}
*/
