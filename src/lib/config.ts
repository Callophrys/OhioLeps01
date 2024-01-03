import { dev } from '$app/environment';

export const title: string = "Spel Nom"; // 'Butterfly Monitoring Database'
export const description: string = "Xzy Cba"; // "Ohio Lepidopterists' Long-Term Monitering of Ohio Butterflies";
export const url: string = dev ? 'http://localhost:5173/' : 'https://mylongwindedurl.sfx/';
export const showAnimatedIcon: boolean = false; //true;
export const showAppBar: boolean = true;
export const monitorStartYear = 1996
export const monitorSeason = {
    start: {
        month: 4,
        day: 1
    },
    end: {
        month: 10,
        day: 1
    }
}
export const initialDateRangeChoice = 1;
export const initialHideUnmonitedChoice = 1;
export const initialUseLatinChoice = 1;