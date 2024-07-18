import type { Action, Actions, PageServerLoad } from './$types';
import type { Audit } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '$lib/prisma';
import { createAudit } from '$lib/database/audit';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    // redirect user if logged in
    if (locals.user) {
        throw redirect(302, '/');
    }
};

const login: Action = async ({ cookies, request }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    //  console.log('trying to log in ', username, password);
    if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
        return fail(400, { invalid: true });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
        await createAudit({
            id: -1,
            auditType: 'Login Fail',
            ipAddress: 'localhost',
            userName: username,
            description: 'Invalid username',
        } as Audit);
        return fail(400, { credentials: true });
    }

    const userPassword = await bcrypt.compare(password, user.passwordHash);

    if (!userPassword) {
        await createAudit({
            id: -1,
            auditType: 'Login Fail',
            ipAddress: 'localhost',
            userName: username,
            description: 'Invalid password',
        } as Audit);
        return fail(400, { credentials: true });
    }

    // generate new auth token just in case
    const authenticatedUser = await prisma.user.update({
        where: { username: user.username },
        data: { userAuthToken: crypto.randomUUID() },
    });

    cookies.set('session', authenticatedUser.userAuthToken, {
        // send cookie for every page
        path: '/',

        // server side only cookie so you can't use `document.cookie`
        httpOnly: true,

        // only requests from same site can send cookies
        // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
        sameSite: 'strict',

        // only sent over HTTPS in production
        secure: process.env.NODE_ENV === 'production',

        // set cookie to expire after a month
        maxAge: 60 * 60 * 24 * 30,
    });

    //console.log('log in....okay?', user);
    await createAudit({
        id: -1,
        auditType: 'Login Success',
        ipAddress: 'localhost',
        userName: username,
        description: 'Successful login',
    } as Audit);

    // redirect the user
    throw redirect(302, '/');
};

export const actions: Actions = { login };
