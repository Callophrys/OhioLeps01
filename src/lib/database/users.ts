import prisma from '$lib/prisma';
import type { User } from '@prisma/client';

export async function getUser(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            role: true,
        },
    });

    return user;
}

export async function createUser(user: User, roleName: string) {
    const role = await prisma.role.findFirst({
        where: { name: roleName },
    });

    const newUser = await prisma.user.create({
        data: {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            passwordHash: user.passwordHash,
            userAuthToken: user.userAuthToken,
            organizationId: user.organizationId,
            roleId: role?.id,
            disabled: false,
            passwordRetries: 0,
            delayedRetries: 0,
        },
    });

    return newUser;
}
