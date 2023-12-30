import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

// /api/sites GET

async function getsites() {
	const sites = await prisma.site.findMany({
		include: {
			stateCounty: true
		}
	});

	sites.sort((first, second) => second.siteName > first.siteName ? 1 : 0);
	return sites
}

export async function GET() {
	const sites = await getsites()
	return json(sites)
}

// /api/sites POST

export async function POST(event) {
  const data = await event.request.formData()
  const email = data.get('email')

  // subscribe the user to the newsletter
  console.log(email)

  // return success
  return new Response(JSON.stringify({ success: true }), {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // it's common to return JSON, so SvelteKit has a helper
  return json({ success: true })
}
