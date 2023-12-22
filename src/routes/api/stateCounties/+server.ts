import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

export async function GET() {
  const stateCounties = await prisma.stateCounty.findMany()

    return json(stateCounties);
}