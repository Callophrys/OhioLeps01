import type { dateTracking } from '$lib/types.js';

type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];
type TimeStyle = Intl.DateTimeFormatOptions['timeStyle'];
type TimeZone = Intl.DateTimeFormatOptions['timeZone'];

export function convertFtoC(f: number | null) {
    if (f === null) return;
    return Math.floor((f - 32) * 5 / 9);
}

export function daysIntoYear(date: Date): number {
    return (
        (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
            Date.UTC(date.getFullYear(), 0, 0)) /
        24 /
        60 /
        60 /
        1000
    );
}

export function formatDate(date: string,
    dateStyle: DateStyle = undefined,
    timeStyle: TimeStyle = undefined,
    timeZone: TimeZone = undefined,
    locales: string = 'en-US'): string {

    const dateToFormat = new Date(date);
    const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle, timeStyle, timeZone });
    /*
        new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'full',
            timeStyle: 'long',
            timeZone: 'Australia/Sydney',  // <-- timeZoneName
          }).format(date),
    */
    return dateFormatter.format(dateToFormat);
}

export function camelToFriendly(camel: string) {
    const regex = /[A-Z]+/g;
    return camel[0].toLocaleUpperCase() + camel.slice(1).replaceAll(regex, ' $&');

    // use with
    // Object.getOwnPropertyNames(object1).forEach(x => console.log(camelToFriendly(x)));
}

export function compareNumeric(a: number, b: number) {
    return a - b;
}

export function compareYearWeek(a: dateTracking, b: dateTracking) {
    return a.year > b.year ? 1 : a.week - b.week;
}

//export const sortByNumericProperty = <K extends string, T extends Record<K, any>>(
export const sortByNumericProperty = (
    items: any[],
    propertyName: string,
    ascending: boolean | null = true
) => items.sort((a, b) => (a[propertyName] - b[propertyName]) * (ascending ? 1 : -1));

//export const sortByStringProperty = <K extends string, T extends Record<K, any>>(
export const sortByStringProperty = (
    items: any[],
    propertyName: string,
    ascending: boolean | null = true
) => items.sort((a, b) => {
    if (a[propertyName] > b[propertyName]) return 1 * (ascending ? 1 : -1);
    if (a[propertyName] < b[propertyName]) return -1 * (ascending ? 1 : -1);
    return 0;
});

// Do not forget month is 0 to 11
export function weekOfYearSince(
    weekOfDate: Date,
    sinceDate: Date = new Date(1999, 3, 1),
    useSameYear: boolean = true
): number {
    if (useSameYear) sinceDate.setFullYear(weekOfDate.getFullYear());
    let daysPassed = (weekOfDate.getTime() - sinceDate.getTime()) / 24 / 60 / 60 / 1000;
    return 1 + Math.floor(daysPassed / 7);
}

export function isEmpty(obj: object): boolean {
    for (var x in obj) { return false; }
    return true;
}

/**
 * @param val
 * @returns Boolean to indicate if val is a primative or not
 * @description If val is undefined let it the exception occur
 */
export function isPrimative(val: any): boolean {
    if (val === null) return true;
    if (typeof val === 'object' || typeof val === 'function') return false;
    return true;
}

export function isNullOrWhiteSpace(token?: any | null): boolean {
    if (typeof token === 'undefined') return true;
    if (token === null) return true;
    return token.toString().trim().length === 0;
}

export function roleNameLong(roleName: string): string {
    switch (roleName) {
        case 'SUPER':
            return 'Super user';
        case 'ADMIN':
            return 'Administrator';
        case 'REVIEWER':
            return 'Reviewer';
        case 'ENTRY':
            return 'Entry';
        case 'USER':
            return 'User';
        default:
            return 'Unknown';
    }
}

export function scientificName(genus: string, species: string, subSpecies: string) {
    return `${genus.charAt(0).toLocaleUpperCase() + genus.slice(1).toLocaleLowerCase()} ${species.toLocaleLowerCase()}${subSpecies ? ' ' + subSpecies.toLocaleLowerCase() : ''}`;
}

export function toBool(value: any) {
    if (typeof value === 'undefined') return false;
    let val = String(value);
    switch (val) {
        case 'false': return false;
        case 'true': return true;
        case 'on': return true;
        case '0': return false;
        case '1': return true;
        case '-1': return true;
        default: return false;
    }
}



