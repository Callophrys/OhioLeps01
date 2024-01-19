type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];
type TimeStyle = Intl.DateTimeFormatOptions['timeStyle'];
type TimeZone = Intl.DateTimeFormatOptions['timeZone'];

function daysIntoYear(date: Date): number {
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