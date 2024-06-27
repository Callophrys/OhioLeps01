import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import bcrypt from 'bcrypt';
import { ROLE } from '$lib/types';
import { getOrganizationByName } from '$lib/database/organizations';
import { defaultOrganization } from '$lib/config';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ locals }) => {
    console.log('register: ', locals);
    // redirect user if logged in
    if (locals.user) {
        throw redirect(302, '/');
    }
};

const register: Action = async ({ request }) => {
    const data = await request.formData();
    const username = data.get('username');
    const firstName = data.get('firstname');
    const lastName = data.get('lastname');
    const password = data.get('password');
    //console.log(data);

    if (typeof username !== 'string' || typeof firstName !== 'string' || typeof lastName !== 'string' || typeof password !== 'string' || !username || !firstName || !lastName || !password) {
        return fail(400, { invalid: true });
    }

    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (user) {
        return fail(400, { user: true });
    }

    const organization = await getOrganizationByName(defaultOrganization);
    console.log(organization);

    await prisma.user.create({
        data: {
            username,
            firstName,
            lastName,
            passwordHash: await bcrypt.hash(password, 10),
            userAuthToken: crypto.randomUUID(),
            role: { connect: { name: ROLE.USER } },
            organizationId: organization?.id ?? undefined,
        },
    });

    throw redirect(303, '/login');
};

export const actions: Actions = { register };
