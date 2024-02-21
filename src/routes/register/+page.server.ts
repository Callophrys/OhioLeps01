import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import bcrypt from 'bcrypt';
import { Role } from '$lib/types';
import { getOrganizationByName } from '$lib/database/organizations';
import { defaultOrganization } from '$lib/config';
import prisma from '$lib/prisma';

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
  //console.log(data);

  if (typeof username !== 'string' ||
    typeof password !== 'string' ||
    !username ||
    !password) {

    return fail(400, { invalid: true })
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user) {
    return fail(400, { user: true })
  }

  const organization = await getOrganizationByName(defaultOrganization);
  console.log(organization);

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
