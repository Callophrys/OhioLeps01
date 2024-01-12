import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

async function getCounties() {
  const counties = await prisma.county.findMany({
    include: {
      sites: true,
      state: true
    }
  });

  counties.sort((first, second) => second.name > first.name ? 1 : 0);
  return counties;
}

export async function GET() {
  const counties = await getCounties();
  return json(counties);
}