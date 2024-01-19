type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];
type TimeStyle = Intl.DateTimeFormatOptions['timeStyle'];
type TimeZone = Intl.DateTimeFormatOptions['timeZone'];

export function formatDate(date: string,
    dateStyle: DateStyle = undefined,
    timeStyle: TimeStyle = undefined,
    timeZone: TimeZone = undefined,
    locales: string = 'en-US') {

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

export function isEmpty(obj: object) {
    for (var x in obj) { return false; }
    return true;
}