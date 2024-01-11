type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];
type TimeStyle = Intl.DateTimeFormatOptions['timeStyle'];
type TimeZone = Intl.DateTimeFormatOptions['timeZone'];

export function formatDate(date: string, dateStyle: DateStyle = 'short', timeStyle: TimeStyle = 'short', timeZone: TimeZone = 'EST', locales = 'en') {
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