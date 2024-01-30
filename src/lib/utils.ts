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

export function camelToLabel(camel: string) {
    const regex = /[A-Z]+/g;
    return camel[0].toLocaleUpperCase() + camel.slice(1).replaceAll(regex, ' $&');

    // use with 
    // Object.getOwnPropertyNames(object1).forEach(x => console.log(camelToLabel(x)));
}

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

export function scientificName(genus: string, species: string, subSpecies: string) {
    return `${genus.charAt(0).toLocaleUpperCase() + genus.slice(1).toLocaleLowerCase()} ${species.toLocaleLowerCase()}${subSpecies ? ' ' + subSpecies.toLocaleLowerCase() : ''}`;
}