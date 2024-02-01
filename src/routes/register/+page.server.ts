import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import bcrypt from 'bcrypt';
import * as config from '$lib/config'
import { getOrganizationByName } from '$lib/database/organizations';
import prisma from '$lib/prisma';

// using an enum for user roles to avoid typos
// if you're not using TypeScript use an object
enum Role {
  USER = 'USER', // can browse data and run reports, delete own unsigned data
  ENTRY = 'ENTRY', // can enter observation data, can download data
  LEAD = 'LEAD', // can edit,add,delete root information.
                 // E.g.sites and checklists.Can
                 //review and sign off 'lock' the data.
                 // can unlock own data locks.  Can upload data.
  ADMIN = 'ADMIN', // Can edit anything, manage user issues, restore deleted or lost data, chase audit trails
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
  
  const organization = await getOrganizationByName('Ohio Lepidopterists');

  await prisma.user.create({
    data: {
      username,
      passwordHash: await bcrypt.hash(password, 10),
      userAuthToken: crypto.randomUUID(),
      role: { connect: { name: Role.USER } },
      organizationId: organization?.id ?? undefined
    },
  })

  throw redirect(303, '/login')
}

export const actions: Actions = { register }
