import { ROLE } from '$lib/types';
import type { Action, Actions, PageServerLoad } from './$types';
import type { Audit, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '$lib/prisma';
import { createAudit } from '$lib/database/audit';
import { createUser } from '$lib/database/users';
import { defaultOrganization } from '$lib/config';
import { fail, redirect } from '@sveltejs/kit';
import { getOrganizationByName } from '$lib/database/organizations';

export const load: PageServerLoad = async ({ locals }) => {
    // console.log('register: ', locals);
    // redirect user if logged in
    if (locals.user) {
        throw redirect(302, '/');
    }
};

const register: Action = async ({ request }) => {
    const data = await request.formData();
    const username = String(data.get('username') ?? '');
    const firstName = String(data.get('firstName') ?? '');
    const lastName = String(data.get('lastName') ?? '');
    const password = String(data.get('password') ?? '');

    if (username.length === 0 || firstName.length === 0 || lastName.length === 0 || password.length === 0) {
        return fail(400, { invalid: true });
    }

    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (user) {
        await createAudit({
            id: -1,
            auditType: 'Register Fail',
            ipAddress: 'localhost',
            userName: username,
            description: 'Username already exists',
        } as Audit);
        return fail(400, { user: true });
    }

    const organization = await getOrganizationByName(defaultOrganization);
    //console.log(organization);

    await createUser(
        {
            username,
            firstName,
            lastName,
            passwordHash: await bcrypt.hash(password, 10),
            userAuthToken: crypto.randomUUID(),
            organizationId: organization?.id,
        } as User,
        ROLE.USER
    );

    await createAudit({
        id: -1,
        auditType: 'Register Success',
        ipAddress: 'localhost',
        userName: username,
        description: 'Registered new user',
    } as Audit);

    throw redirect(303, '/login');
};

export const actions: Actions = { register };
