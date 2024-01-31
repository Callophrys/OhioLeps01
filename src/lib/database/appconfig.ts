import prisma from '$lib/prisma';

export async function getAppConfigById(appConfigId: number) {
    const appConfig = await prisma.appConfig.findUnique({
        where: {
            id: appConfigId
        }
    })
    return appConfig;
}

export async function getAppConfigByName(name: string, organizationId: string) {
    const appConfig = await prisma.appConfig.findUnique({
        where: {
            name: name,
            organizationId: organizationId,
        }
    })
    return appConfig;
}

export async function getAppConfigs(organizationName: string) {
    const appConfigs = await prisma.appConfig.findMany({
        where: {
            organization: {
                name: organizationName
            }
        }
    })

    return appConfigs;
}

export async function getTemplateAppConfigs() {
    const appConfigs = await prisma.appConfig.findMany({
        where: {
            organization: {
                name: 'TEMPLATE'
            }
        }
    })

    return appConfigs;
}
