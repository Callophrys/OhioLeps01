import { dev } from '$app/environment';

export const defaultOrganization = 'Ohio Lepidoperists';
/* -------------------------------------------------------------------------- */

export const modeDebug = true

export const owner = 'Ohio Lepidopterists &copy;1995'
//export const title = 'Butterfly Monitoring Database'
export const title = 'Learn Svelte(kit), Vite, TailwindCSS, SkeletonUI and Prisma'
export const description = "Ohio Lepidopterists' Long-Term Monitering of Ohio Butterflies"
export const url = dev ? 'http://localhost:5173/' : 'https://mylongwindedurl.sfx/'
export const showAnimatedIcon = false // Shows as normal Account button when false
export const showAppBar = true
export const showFooter = false
export const showAvatar = false
export const showStateProvince = false
export const monitorStartYear = 1995
export const monitorSeason = {
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
}
export const initialDateRangeChoice = true
export const initialHideUnmonitedChoice = true
export const initialUseLatinChoice = true
