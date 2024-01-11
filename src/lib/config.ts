import { dev } from '$app/environment';

//export const title: string = 'Butterfly Monitoring Database';
export const title: string = 'Learn Svelte(kit), Vite, TailwindCSS, SkeletonUI and Prisma'; 'Butterfly Monitoring Database';
export const description: string = "Ohio Lepidopterists' Long-Term Monitering of Ohio Butterflies";
export const url: string = dev ? 'http://localhost:5173/' : 'https://mylongwindedurl.sfx/';
export const showAnimatedIcon: boolean = false; // Shows as normal Account button when false
export const showAppBar: boolean = true;
export const showAvatar: boolean = false;
export const showStateProvince: boolean = false;
export const monitorStartYear = 1996
export const monitorSeason = {
    start: {
        year: 1996,
        month: 4,
        day: 1
    },
    end: {
        year: 9999,
        month: 10,
        day: 1
    }
}
export const initialDateRangeChoice = 1;
export const initialHideUnmonitedChoice = 1;
export const initialUseLatinChoice = 1;