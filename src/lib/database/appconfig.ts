import prisma from '$lib/prisma';
import type { AppConfig } from '@prisma/client';

export async function getAppConfigById(appConfigId: number) {
    const appConfig = await prisma.appConfig.findUnique({
        where: {
            id: appConfigId
        }
    })
    return appConfig;
}

export async function getAppConfigByName(name: string, organizationId: string) {
    const appConfig = await prisma.appConfig.findFirst({
        where: {
            configName: name,
            organizationId: organizationId,
        }
    })
    return appConfig;
}

export async function getAppConfigsByOrgId(organizationId: string) {
    const appConfigs = await prisma.appConfig.findMany({
        where: {
            organizationId: organizationId
        }
    })

    return appConfigs;
}

export async function getAppConfigsByOrgName(organizationName: string) {
    const appConfigs = await prisma.appConfig.findMany({
        where: {
            organization: {
                name: organizationName
            }
        }
    })

    return appConfigs;
}

export async function getTemplateAppConfig(configName: string) {
    const appConfigs = await prisma.appConfig.findFirst({
        where: {
            configName: configName,
            organization: {
                name: 'TEMPLATE'
            }
        }
    })

    return appConfigs;
}

export async function getTemplateAppConfigs() {
    return await getAppConfigsByOrgName('TEMPLATE');
}

export async function updateAppConfig(appConfig: AppConfig) {
    const updatedAppConfig = await prisma.appConfig.update({
        where: {
            id: appConfig.id
        },
        data: {
            configName: appConfig.configName,
            configType: appConfig.configType,
            configValue: appConfig.configValue
        }
    });

    return updatedAppConfig;
}

export async function updateAllAppConfigs(appConfigs: AppConfig[]) {
    const promises: Promise<AppConfig>[] = [];
    appConfigs.forEach(p => promises.push(updateAppConfig(p)));
    return await Promise.all(promises);
}

export async function resetAppConfig(appConfig: AppConfig) {
    return await getTemplateAppConfig(appConfig.configName)
        .then(config => prisma.appConfig.update({
            where: {
                id: appConfig.id
            },
            data: {
                configValue: config?.configValue
            }
        }));
}

export async function resetAllAppConfigs(organizationId: string) {
    throw 'need to get template values to set the ref org values with';
    const promises: Promise<AppConfig>[] = [];
    (await getAppConfigsByOrgId(organizationId)).forEach(c => promises.push(resetAppConfig(c)));
    return await Promise.all(promises);
}

