import { error } from '@sveltejs/kit'
//import prisma from '$lib/prisma'
//
import { getSites } from '$lib/api/entry/sites.js'

export async function load({ params }) {
  console.log('params', params)
  const site = await prisma.site.findUnique({
    where: { siteId: Number(params.slug) }
  })

  if (!site) {
    throw error(404, 'Post not found')
  }

  return { site }
}
