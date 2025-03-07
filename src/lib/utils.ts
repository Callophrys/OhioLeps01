import { ROLE, WEATHER } from "$lib/types.js";
import type { DateTracking } from "$lib/types.js";
import type { SiteDateObservation } from "@prisma/client";

type DateStyle = Intl.DateTimeFormatOptions["dateStyle"];
type TimeStyle = Intl.DateTimeFormatOptions["timeStyle"];
type TimeZone = Intl.DateTimeFormatOptions["timeZone"];

export function convertFtoC(f: number | null): string {
  if (!f) return "";
  return (((f - 32) * 5) / 9).toFixed(1);
}

export function convertMphToKm(f: number | null): string {
  if (!f) return "";
  // numeric: Math.round(val * 100) / 100
  return (f * 1.609344).toFixed(1);
}

export function decodeWeather(k: string | null): string {
  if (!k) return "";
  switch (k) {
    case "U":
      return WEATHER.U;
    case "O":
      return WEATHER.O;
    case "R":
      return WEATHER.R;
    case "S":
      return WEATHER.S;
    case "H":
      return WEATHER.H;
    default:
      return "";
  }
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

export function formatDate(
  date: string,
  dateStyle: DateStyle = undefined,
  timeStyle: TimeStyle = undefined,
  timeZone: TimeZone = undefined,
  locales: string = "en-US",
): string {
  const dateToFormat = new Date(date);
  const dateFormatter = new Intl.DateTimeFormat(locales, {
    dateStyle,
    timeStyle,
    timeZone,
  });
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
  return camel[0].toLocaleUpperCase() + camel.slice(1).replaceAll(regex, " $&");

  // use with
  // Object.getOwnPropertyNames(object1).forEach(x => console.log(camelToFriendly(x)));
}

export function toProperNoun(noun: string) {
  noun = noun.trim().replaceAll("_", " ");
  return noun.toLowerCase().replace(/\b\S/g, (t) => t.toUpperCase());
}

export function compareNumeric(a: number, b: number) {
  return a - b;
}

export function compareYearWeek(a: DateTracking, b: DateTracking) {
  if (!a.recordDate) return -1;
  if (!b.recordDate) return 1;
  return compareNumeric(a.recordDate.getTime(), b.recordDate.getTime());
}

//export const sortByNumericProperty = <K extends string, T extends Record<K, any>>(
export const sortByNumericProperty = (
  items: any[],
  propertyName: string,
  ascending: boolean | null = true,
) =>
  items.sort(
    (a, b) => (a[propertyName] - b[propertyName]) * (ascending ? 1 : -1),
  );

//export const sortByStringProperty = <K extends string, T extends Record<K, any>>(
export const sortByStringProperty = (
  items: any[],
  propertyName: string,
  ascending: boolean | null = true,
) =>
  items.sort((a, b) => {
    if (a[propertyName] > b[propertyName]) return 1 * (ascending ? 1 : -1);
    if (a[propertyName] < b[propertyName]) return -1 * (ascending ? 1 : -1);
    return 0;
  });

export const isDate = (d: any) => d instanceof Date && isFinite(Number(d));

/**
    Return if data entry can edit the current data.  Has to be one's own data and not marked reviewed.
    NOTE: Might want to allow reviewers to edit one another's data.
*/
export const isEditable = (sdo: SiteDateObservation, user: any) => {
  return (
    !sdo.confirmed &&
    (user.role === ROLE.SUPER ||
      user.role === ROLE.ADMIN ||
      (user.role === ROLE.ENTRY && sdo.createdById === user.id))
  );
};

/**
    Return if reviewer can confirm unreviewed data and set or unset reveiwed status on own data.
    NOTE: Might want to allow reviewers to edit one another's data.
*/
export const isReviewable = (sdo: SiteDateObservation, user: any) => {
  return (
    user.role === ROLE.SUPER ||
    user.role === ROLE.ADMIN ||
    (user.role === ROLE.REVIEWER &&
      (!sdo.confirmById || sdo.confirmById === user.id))
  );
};

export const isRecent = (sdo: SiteDateObservation, days: number) => {
  let c = Date.now().valueOf() - days * 24 * 60 * 60 * 1000;
  let x = Math.max(
    new Date(sdo.createdAt ?? 0).valueOf(),
    new Date(sdo.updatedAt ?? 0).valueOf(),
    new Date(sdo.confirmAt ?? 0).valueOf(),
  );
  return x > c;
};

// Do not forget month is 0 to 11

/**
 * @param weekOfDate
 * @param [sinceDate=new Date(1999, 3, 1)]
 * @param [useSameYear=true]
 * @returns Week of the year for the survey entry (weekOfDate).
 * @description Week is determined from the sinceDate argument.
 */
export function weekOfYearSince(
  weekOfDate: Date,
  sinceDate: Date = new Date(1999, 3, 1),
  useSameYear: boolean = true,
): number | null {
  //console.log(typeof weekOfDate, weekOfDate);
  if (!isDate(weekOfDate)) {
    return null;
  }
  if (useSameYear) {
    sinceDate.setFullYear(weekOfDate.getFullYear());
  }
  let daysPassed =
    (weekOfDate.valueOf() - sinceDate.valueOf()) / 24 / 60 / 60 / 1000;
  return 1 + Math.floor(daysPassed / 7);
}

export function isEmpty(obj: object): boolean {
  for (let _ in obj) {
    return false;
  }
  return true;
}

/**
 * @param val
 * @returns Boolean to indicate if val is a primative or not
 * @description If val is undefined let it the exception occur
 */
export function isPrimative(val: any): boolean {
  if (val === null) return true;
  if (typeof val === "object" || typeof val === "function") return false;
  return true;
}

export function isNullOrWhiteSpace(token?: any | null): boolean {
  if (typeof token === "undefined") return true;
  if (token === null) return true;
  return token.toString().trim().length === 0;
}

export function roleNameLong(roleName: string): string {
  switch (roleName) {
    case "SUPER":
      return "Super user";
    case "ADMIN":
      return "Administrator";
    case "REVIEWER":
      return "Reviewer";
    case "ENTRY":
      return "Entry";
    case "USER":
      return "User";
    default:
      return "Unknown";
  }
}

export function scientificName(
  genus: string,
  species: string,
  subSpecies: string,
) {
  return `${genus.charAt(0).toLocaleUpperCase() + genus.slice(1).toLocaleLowerCase()} ${species.toLocaleLowerCase()}${subSpecies ? " " + subSpecies.toLocaleLowerCase() : ""}`;
}

export function toBool(value: any) {
  if (typeof value === "undefined") return false;
  let val = String(value);
  switch (val) {
    case "false":
      return false;
    case "true":
      return true;
    case "on":
      return true;
    case "0":
      return false;
    case "1":
      return true;
    case "-1":
      return true;
    default:
      return false;
  }
}

export const setDifferenceByProp = (a: any, b: any, prop: string) =>
  new Set([...a].filter((x) => !b.some((z: any) => z[prop] === x[prop])));
export const setDifference = (a: any, b: any) =>
  new Set([...a].filter((x) => !b.has(x)));
export const setIntersection = (a: any, b: any) =>
  new Set([...a].filter((x) => b.has(x)));
export const setUnion = (a: any, b: any) => new Set([...a, ...b]);

export function getTaxonIndent(taxonType: string) {
  if (taxonType === "SF") return "indent-4";
  if (taxonType === "G") return "indent-8";
  if (taxonType === "S") return "indent-16";
  if (taxonType === "SS") return "indent-20";
  return "";
}

/*
// Old way was to stringify and parse
// Make sure dates are formatted and zoned correctly
const s = JSON.stringify(v);
return JSON.parse(s);
*/

// Example usage
// const safeSites = convertSafeJson(sites);
export function convertSafeJson<T>(input: T): T {
  if (typeof input === "bigint") {
    return input.toString() as T;
  }

  if (input instanceof Date) {
    return input.toString() as T;
  }

  if (Array.isArray(input)) {
    return input.map(convertSafeJson) as T;
  }

  if (typeof input === "object" && input !== null) {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [
        key,
        convertSafeJson(value),
      ]),
    ) as T;
  }

  return input;
}

// // Example usage
// const parsedSites = restoreBigInt(JSON.parse(jsonSites));
export function restoreBigInt<T>(input: T): T {
  if (typeof input === "string" && /^\d+n?$/.test(input)) {
    return BigInt(input.replace("n", "")) as T;
  }

  if (Array.isArray(input)) {
    return input.map(restoreBigInt) as T;
  }

  if (typeof input === "object" && input !== null) {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [key, restoreBigInt(value)]),
    ) as T;
  }

  return input;
}

// function isDate(value) {
//   return value instanceof Date;
// }
//
// // works in any js context
// function isDate(value) {
//   return Object.prototype.toString.call(value) === "[object Date]";
// }

function isValidDate(value) {
  return value instanceof Date && !isNaN(value.getTime());
}

// Example usage
// console.log(canBeDate("2024-02-24")); // ✅ true
// console.log(canBeDate("Not a date")); // ❌ false
// console.log(canBeDate(1708771200000)); // ✅ true (timestamp)
function canBeDate(value) {
  return !isNaN(new Date(value).getTime());
}
