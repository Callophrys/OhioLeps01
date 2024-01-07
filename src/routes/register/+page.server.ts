import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import bcrypt from 'bcrypt'

import prisma from '$lib/prisma'

// using an enum for user roles to avoid typos
// if you're not using TypeScript use an object
enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const load: PageServerLoad = async ({ locals }) => {
  console.log('register: ', locals);
  // redirect user if logged in
  if (locals.user) {
    throw redirect(302, '/');
  }
}

const register: Action = async ({ request }) => {
  const data = await request.formData()
  const username = data.get('username')
  const password = data.get('password')

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    !username ||
    !password
  ) {
    return fail(400, { invalid: true })
  }

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (user) {
    return fail(400, { user: true })
  }

  await prisma.user.create({
    data: {
      username,
      passwordHash: await bcrypt.hash(password, 10),
      userAuthToken: crypto.randomUUID(),
      role: { connect: { name: Role.USER } },
    },
  })

  throw redirect(303, '/login')
}

export const actions: Actions = { register }
