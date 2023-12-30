import { error } from '@sveltejs/kit'
import prisma from '$lib/prisma'

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
