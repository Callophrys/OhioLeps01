import { dev } from '$app/environment';
//import { getAppConfigsByOrgName } from './database/appconfig';

export const defaultOrganization = 'Ohio Lepidoperists';
/* -------------------------------------------------------------------------- */

export const modeDebug = true

export let owner = 'Ohio Lepidopterists &copy;1995'
//export let title = 'Butterfly Monitoring Database'
export let title = 'Learn Svelte(kit), Vite, TailwindCSS, SkeletonUI and Prisma'
export let description = "Ohio Lepidopterists' Long-Term Monitering of Ohio Butterflies"
export let url = dev ? 'http://localhost:5173/' : 'https://mylongwindedurl.sfx/'
export let showAnimatedIcon = false // Shows as normal Account button when false
export let showAppBar = true
export let showFooter = false
export let showAvatar = false
export let showStateProvince = false
export let monitorStartYear = 1995
export let monitorSeason = {
    start: {
        year: 1995,
        month: 4,
        day: 1
    },
    end: {
        year: 9999,
        month: 10,
        day: 1
    }
};

export let initialDateRangeChoice = true;
export let initialHideUnmonitedChoice = true;
export let initialUseLatinChoice = true;


/*
const appConfigs = await getAppConfigsByOrgName(defaultOrganization);
const configLookup: any = {};
for (const c of appConfigs) {
    configLookup[c.configName] = {
        configValue: c.configValue,
    };
}

if (appConfigs) {
    owner = configLookup['owner'];
    title = configLookup['title'];
    description = configLookup['description'];
    url = configLookup['url'];
    showAnimatedIcon = configLookup['showAnimatedIcon'];
    showAppBar = configLookup['showAppBar'];
    showFooter = configLookup['showFooter'];
    showAvatar = configLookup['showAvatar'];
    showStateProvince = configLookup['showStateProvince'];
    monitorStartYear = configLookup['monitorStartYear'];
    initialDateRangeChoice = configLookup['initialDateRangeChoice'];
    initialHideUnmonitedChoice = configLookup['initialHideUnmonitedChoice'];
    initialUseLatinChoice = configLookup['initialUseLatinChoice'];
    //monitorSeason = JSON.parse(configLookup['monitorSeason']);
}
*/