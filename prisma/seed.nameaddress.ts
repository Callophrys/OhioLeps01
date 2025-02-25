import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export default async function () {
  console.log("Creating NameAddress records");

  await db.nameAddress.create({
    data: {
      fullName: "Alice Phillips",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Metro Parks Serving Summit County",
      address: "1383 Delia Avenue",
      cityStateZip: "Akron, Ohio  44320",
      phone: "330 867-5482",
      mobile: null,
      emailAddress: null,
      notes: "Top of the World - 1999",
      notes2: null,
      createdAt: new Date("3/28/2000 1:44:50 PM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "B. J. Cole",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Johnny Appleseed Metro Park",
      address: "1522 N. Adams Street",
      cityStateZip: "Lima, Ohio  45801",
      phone: "419 224-6421",
      mobile: null,
      emailAddress: null,
      notes: "Heston's Wood Lot - 1999",
      notes2: null,
      createdAt: new Date("3/27/2000 2:15:50 PM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Barbara K. Coleman",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Cleveland Museum Of Natural History",
      address: "14916 Arden Avenue",
      cityStateZip: "Lakewood, Ohio  44107",
      phone: "216 226-0391",
      mobile: null,
      emailAddress: "CMNHdocent@aol.com",
      notes: "10 - Kelleys Island - 1997, 1998, 1999",
      notes2: "William G. Coleman",
      createdAt: new Date("3/27/2000 2:28:31 PM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Brad Phillips",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Eric Metro Parks",
      address: "28 E. Main Street P. O. Box 46",
      cityStateZip: "Berlin Heights, Ohio  44814",
      phone: "419 588-2497",
      mobile: null,
      emailAddress: "bradleyd@accnorwalk.com",
      notes:
        "Castalia Quarry Reserve-1999; James McBride Arboretum - 1999; Osborn Park-1999; Krebs Farm - 1999",
      notes2: null,
      createdAt: new Date("3/27/2000 2:23:08 PM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Deb Marcinski",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Cleveland Metroparks",
      address: "3037 SOM Center Road",
      cityStateZip: "Willoughby Hills, Ohio  44094",
      phone: "440 473-3370",
      mobile: null,
      emailAddress: null,
      notes: "4 - North Chagrin -1996 & 1997",
      notes2: null,
      createdAt: new Date("11/2/1999 2:26:07 PM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Denise Gehring",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Metroparks Of Toledo",
      address: "5100 W. Central",
      cityStateZip: "Toledo, Ohio 43615",
      phone: "419 535-3058",
      mobile: null,
      emailAddress: "NATURALIST@GLASSCITY.NET",
      notes: "Oak Openings - 1999",
      notes2: null,
      createdAt: new Date("3/27/2000 2:15:03 PM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Diane Hohler-Johnson",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Erie Metro Parks",
      address: "9502 Church Road",
      cityStateZip: "Huron, Ohio  44839",
      phone: "419 588-2779",
      mobile: null,
      emailAddress: null,
      notes: "James McBride Arboretum-1999",
      notes2: null,
      createdAt: new Date("2/10/2000 11:52:16 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Donald P. Pagath",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: null,
      address: "3765 Cornerstone Lane",
      cityStateZip: "Duncan Falls, Ohio  43734",
      phone: "740 674-6374",
      mobile: null,
      emailAddress: null,
      notes: "Will monitor Duncan Falls Area in 2000",
      notes2: null,
      createdAt: new Date("2/10/2000 11:43:26 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Edward M. Binic",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Lake County Sites",
      address: "220 Ridgecrest Drive",
      cityStateZip: "Painesville, Ohio  44077",
      phone: "440 350-2543",
      mobile: null,
      emailAddress: "ebinic@lcghd.org",
      notes: "Lake County sites",
      notes2: "Fax- 440 350-2548",
      createdAt: new Date("2/10/2000 11:59:43 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Erin Pearson",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Toledo Metroparks",
      address: "5100 West Central Road",
      cityStateZip: "Toledo, Ohio",
      phone: "419 535-3058",
      mobile: null,
      emailAddress: null,
      notes: "26 - Oak Openings - 1999",
      notes2: null,
      createdAt: new Date("1/6/2000 10:13:46 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Harriet Clark",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Cincinnati Nature Center",
      address: "4949 Tealtown Road",
      cityStateZip: "Milford, Ohio  45150",
      phone: "513 831-1711",
      mobile: null,
      emailAddress: null,
      notes: "Cincinnati Nature Center (Rowe Woods)",
      notes2: null,
      createdAt: new Date("3/27/2000 1:14:36 PM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Heather Summerville",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Greenacres Foundation",
      address: "8255 Spooky Hollow Road",
      cityStateZip: "Greenacres Foundation",
      phone: "513 891-4227",
      mobile: null,
      emailAddress: "hsummerville@greenacres.org",
      notes: null,
      notes2: null,
      createdAt: new Date("3/27/2000 2:08:29 PM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Heidi Wintersteen",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Jackson Field",
      address: "South Chagrin Reservation",
      cityStateZip: "Cleveland, Ohio",
      phone: null,
      mobile: null,
      emailAddress: null,
      notes: null,
      notes2: null,
      createdAt: new Date("2/24/2000 11:46:59 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Helen Bresley",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Metro Parks Serving Summit County",
      address: "1868 Lillian Road",
      cityStateZip: "Stow, Ohio  44224",
      phone: "330 940-3878",
      mobile: null,
      emailAddress: null,
      notes: "Naturealm - 1999",
      notes2: null,
      createdAt: new Date("3/28/2000 11:35:42 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Jennifer McAnlis",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Lake County Parks",
      address: "8668 Kirtland-Chardon Road",
      cityStateZip: "Kirtland, Ohio  44094",
      phone: "440 256-2106",
      mobile: null,
      emailAddress: "pg@lakemetroparks.com",
      notes:
        "16 - Lakeshore Reservation - 1998; Huntoon Road; Girdled Road; Lakeshore Reservation",
      notes2: null,
      createdAt: new Date("3/28/2000 1:27:40 PM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Jerome L. Wiedmann-Girdled Road Park",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Lake County Metroparks",
      address: "12764 Huntoon Road",
      cityStateZip: "Painesville, Ohio  44077",
      phone: "216 254-4230",
      mobile: null,
      emailAddress: "wiedmann_j@ricerca.com",
      notes: "11 - Girdled Road Park - 1997, 1998, 1999",
      notes2: "See also Penitentiary Glen & Huntoon Road",
      createdAt: new Date("1/6/2000 10:24:08 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Jerome L. Wiedmann-Huntoon",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Lake County Metroparks",
      address: "12764 Huntoon Road",
      cityStateZip: "Painesville, Ohio  44077",
      phone: "216 254-4230",
      mobile: null,
      emailAddress: "wiedmann_j@ricerca.com",
      notes: "8 - Huntoon Road - 1997, 1998, 1999",
      notes2: "See also Penitentiary Glen & Girdled Road Park",
      createdAt: new Date("1/6/2000 10:24:17 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Jerome L. Wiedmann-Pententiary Glen",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Lake County Metroparks",
      address: "12764 Huntoon Road",
      cityStateZip: "Painesville, Ohio  44077",
      phone: "216 254-4230",
      mobile: null,
      emailAddress: "wiedmann_j@ricerca.com",
      notes: "7 - Penitentiary Glen - 1996, 1997, 1998, 1999",
      notes2: "See also Huntoon Road & Girdled Road Park",
      createdAt: new Date("1/6/2000 10:24:25 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Jim Ciha",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Cleveland Museum Of Natural History",
      address: "3481 West 52nd Street",
      cityStateZip: "Cleveland, Ohio  44102-5862",
      phone: "216 631-3952",
      mobile: null,
      emailAddress: null,
      notes: "1 - Caley Wildlife Area - 1995, 1996, 1997, 1998, 1999",
      notes2: null,
      createdAt: new Date("1/6/2000 10:24:34 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Jocele Meyer",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: null,
      address: "24516 TR 167",
      cityStateZip: "Fresno, Ohio 43834",
      phone: null,
      mobile: null,
      emailAddress: "jocelem@clover.net",
      notes: "20-Coshocton Area",
      notes2: null,
      createdAt: new Date("2/1/2000 11:12:10 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Joe Riddlebarger",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: null,
      address: "610 Greenspring Drive",
      cityStateZip: "Gibsonia, PA",
      phone: "724 443-5718",
      mobile: null,
      emailAddress: "alyfab@ccia.com",
      notes: "OR79-147JER-1999",
      notes2: null,
      createdAt: new Date("3/28/2000 12:01:04 PM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "John & Cindy Cooper",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Blacklick Park",
      address: "11781 Julie Drive",
      cityStateZip: "Baltimore, Ohio 43105",
      phone: "740 862-6373",
      mobile: null,
      emailAddress: "john_cooper@dscc.dla.mil",
      notes: null,
      notes2: null,
      createdAt: new Date("3/2/2000 10:12:38 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "John Pogacnik",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Lake County Parks",
      address: "8668 Kirtland-Chardon Road",
      cityStateZip: "Kirtland, Ohio  44094",
      phone: "440 256-1404",
      mobile: null,
      emailAddress: null,
      notes: "Lakeshore Metro Parks - 1999",
      notes2: null,
      createdAt: new Date("3/28/2000 11:02:02 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "John Watts",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Metropolitan Park District Of Columbus",
      address: "1069 West Main Street",
      cityStateZip: "Westerville, Ohio  43081",
      phone: "614 891-0700",
      mobile: null,
      emailAddress: null,
      notes:
        "17 - Battelle-Darby Creek - 1998; Blacklick Woods; Clear Creek Metro Park",
      notes2: "Fax-614 895-6208",
      createdAt: new Date("3/2/2000 10:08:06 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Judy Evans",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: null,
      address: "12109 Dayton-Farmersville Road",
      cityStateZip: "Jackson, Ohio 45325",
      phone: "937 696-2063",
      mobile: null,
      emailAddress: null,
      notes: "Jude's Butterfly Trail - 1999",
      notes2: null,
      createdAt: new Date("3/27/2000 2:26:33 PM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Julianne Loomis",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: null,
      address: "5749 SOM Center Rd.",
      cityStateZip: "Willoughby, Ohio  44094-3013",
      phone: "440 942-9183",
      mobile: null,
      emailAddress: null,
      notes: "Girdled Road-1999, Penitentiary Glen-1999",
      notes2: null,
      createdAt: new Date("2/10/2000 12:12:36 PM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Karen Menard",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Metroparks Of Toledo",
      address: "5100 W. Central",
      cityStateZip: "Toledo, Ohio  43615",
      phone: "419 535-3058",
      mobile: null,
      emailAddress: "NATURALIST@GLASSCITY.NET",
      notes: "Oak Openings - 1999",
      notes2: "Fax-419 535-3053",
      createdAt: new Date("3/27/2000 2:14:52 PM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Keith Summerville",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Greenacres Foundation",
      address: null,
      cityStateZip: "Cincinnati, Ohio 45242",
      phone: "513 524-8996",
      mobile: null,
      emailAddress: null,
      notes: null,
      notes2: null,
      createdAt: new Date("3/27/2000 2:06:30 PM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Kevin Metcalf",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "North Chagrin Nature Center",
      address: "3037 SOM Center Road",
      cityStateZip: "Willoughby Hills, Ohio  44094",
      phone: "440 473-3370",
      mobile: null,
      emailAddress: null,
      notes: "North Chagrin sites",
      notes2: null,
      createdAt: new Date("3/28/2000 11:41:58 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Lois TerVeen",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Erie County Metroparks",
      address: "3910 East Perkins Road",
      cityStateZip: "Huron, Ohio  44939",
      phone: "419 625-7783",
      mobile: null,
      emailAddress: null,
      notes:
        "Castalia Quarry Reserve-1999; James McBride Arboretum-1999; Osborne Park-1999",
      notes2: "fas-419 621-4217",
      createdAt: new Date("2/10/2000 11:47:35 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Lynn Lanning",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: null,
      address: "610 Greenspring Drive",
      cityStateZip: "Gibsonia, PA",
      phone: "724 443-5718",
      mobile: null,
      emailAddress: "alyfab@ccia.com",
      notes: "OR79-147JER-1999",
      notes2: null,
      createdAt: new Date("3/28/2000 12:01:38 PM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Lynn T. Holtzman",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Beaver Creek Wildlife Area",
      address: "1076 Old Springfield Park",
      cityStateZip: "Zenia, Ohio 45385",
      phone: "937 372-9261",
      mobile: null,
      emailAddress: "Lynn.Holtzman@dnr.state.oh.us",
      notes: "Beaver Creek Wildlife Area-1999",
      notes2: "Fax-937 376-3011",
      createdAt: new Date("2/10/2000 12:03:03 PM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Mark Rzeszotarski",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Geauga County Metroparks",
      address: "12811 Vincent Drive",
      cityStateZip: "Chesterland, Ohio  44026",
      phone: "440 729-8102",
      mobile: null,
      emailAddress: null,
      notes: "5 - Koelliker Fen -1995, 1996, 1997, 1998, 1999",
      notes2: null,
      createdAt: new Date("1/6/2000 10:25:04 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Mark Swiger",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Muskingum Watershed Conservancy District",
      address: "1319 Third Street NW Box 349",
      cityStateZip: "New Philadelphia, OH 44663-0349",
      phone: "330 343-6649",
      mobile: null,
      emailAddress: "mecd@raex.com",
      notes: "Chief Naturalist -",
      notes2: null,
      createdAt: new Date("3/27/2000 1:47:19 PM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Meg Benke Plona",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Cuyahoga Valley National Recreation Area",
      address: "15610 Vaughan Road",
      cityStateZip: "Brecksville, Ohio  44141",
      phone: "330 342-0764",
      mobile: null,
      emailAddress: "meg_benke@nps.gov",
      notes: "#2 - Terra Vista - 1998, 1999",
      notes2: "Fax - 440 546-5943",
      createdAt: new Date("2/10/2000 11:41:40 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Pat Rydquist",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "National Park Service",
      address: "1828 Smith Road",
      cityStateZip: "Akron, Ohio  44313",
      phone: "330 656-2028",
      mobile: null,
      emailAddress: null,
      notes: "2 - Terra Vista - 1998 and 3 - Armington Pond - 1998",
      notes2: "See Naturealm ; 2274 Victoria Parkway, Hudson, Ohio  44236",
      createdAt: new Date("3/27/2000 11:44:00 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Pat Rydquist-Naturealm",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Metroparks Serving Summitt County",
      address: "1828 Smith Road",
      cityStateZip: "Akron, Ohio  44313",
      phone: "330 865-8065",
      mobile: null,
      emailAddress: null,
      notes: "12 - Naturealm - 1998, 1999",
      notes2: "Home - 2274 Victoria Parkway, Hudson, Ohio  44236",
      createdAt: new Date("1/6/2000 10:25:57 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Pat Rydquist-Top Of The World",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Metroparks Serving Serving Summit County",
      address: "1828 Smith Road",
      cityStateZip: "Akron, Ohio  44313",
      phone: "330 656-2028",
      mobile: null,
      emailAddress: null,
      notes: "27 - Top of the World - 1999",
      notes2: "Home - 2274 Victoria Parkway, Hudson, Ohio  44236",
      createdAt: new Date("8/26/1999 11:44:13 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Penny Borgman",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Hamilton Metroparks",
      address: "4711 Hanley Road",
      cityStateZip: "Cincinnati, Ohio 45147",
      phone: "513 385-4811",
      mobile: null,
      emailAddress: null,
      notes: "19 - Farbach-Werner - 1998, 1999",
      notes2: null,
      createdAt: new Date("1/6/2000 10:26:26 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Rita Thelan, Naturalist",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Johnny Appleseed Metropolitan Park Distr",
      address: "2355 Ada Road",
      cityStateZip: "Lima, Ohio  45801",
      phone: "419 221-1232",
      mobile: null,
      emailAddress: "jampd@wcoil.com",
      notes: "13-Kiracofe Prairie - 1999",
      notes2: "Others: B. J. Cole, Bob Overmyer, Frank Prauff",
      createdAt: new Date("3/28/2000 11:11:45 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Rob Thorn",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Metropolitan Park District Of Columbus",
      address: null,
      cityStateZip: "Denison University",
      phone: null,
      mobile: null,
      emailAddress: null,
      notes: "Blendon Woods",
      notes2: null,
      createdAt: new Date("3/27/2000 1:27:16 PM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Robert W. Hawes",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Wilderness Center",
      address: "9877 Alabama Avenue S.W.",
      cityStateZip: "Wilmot, Ohio  44689-0202",
      phone: "330 359-5235",
      mobile: null,
      emailAddress: null,
      notes: "18 - The Wilderness Center - 1998",
      notes2: null,
      createdAt: new Date("1/6/2000 10:18:40 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Sonja Teraguchi",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Cleveland  Museum Of Natural History",
      address: null,
      cityStateZip: null,
      phone: null,
      mobile: null,
      emailAddress: null,
      notes: "6 - Luce Creek - 1996, 1997, 1998",
      notes2: null,
      createdAt: new Date("5/25/1999 11:13:37 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Sonja Teraguchi - Resthaven",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Cleveland Museum Of Natural History",
      address: null,
      cityStateZip: null,
      phone: null,
      mobile: null,
      emailAddress: null,
      notes: "9 - Resthaven Nature Preserve -  1997, 1998",
      notes2: null,
      createdAt: new Date("5/25/1999 11:14:19 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Stephanie Gall",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Cleveland Museum Of Natural History",
      address: "1240 Cross Creek Drive, # 48",
      cityStateZip: "Brunswick, Ohio",
      phone: "330 273-1336",
      mobile: null,
      emailAddress: "steph@popbit.com",
      notes: "6 - Luce Creek - 1999",
      notes2: "Work-216 397-3077",
      createdAt: new Date("3/28/2000 11:17:18 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Steven E. Smith",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Oak Openings",
      address: "103 Grant Street",
      cityStateZip: "Blissfield, MI 49228",
      phone: "517 486-2854",
      mobile: null,
      emailAddress: "sesmith61@hot mail.com",
      notes: "1999-Oak Openings",
      notes2: "Fax-419 445-1562",
      createdAt: new Date("3/2/2000 10:05:58 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Tim Krynak",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "North Chagrin-Cleveland Metroparks",
      address: "3037 SOM Center Road",
      cityStateZip: "Willoughby Hills, Ohio  44081",
      phone: "440 473-3370",
      mobile: null,
      emailAddress: null,
      notes: "14 - Jackson Field - 1996, 1997, 1998",
      notes2: null,
      createdAt: new Date("5/25/1999 11:14:48 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Tim Krynak - Rocky River",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Cleveland Metroparks",
      address: "24000 Valley Parkway",
      cityStateZip: "North Olmsted, Ohio 44070",
      phone: "440-734-6660",
      mobile: null,
      emailAddress: "TKrynak@aol.com",
      notes:
        "14 - Jackson Field - 1996, 1997, 1998; Rocky River Reservation - 1999?",
      notes2: null,
      createdAt: new Date("2/1/2000 11:05:51 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Tom D.Schultz",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Denison University Biological Reserve",
      address: "Dept Of Biology, Denison University",
      cityStateZip: "Granville, Ohio  43023",
      phone: "740 587-6218",
      mobile: null,
      emailAddress: "schultz@denison.edu",
      notes: "Aleutz Traansect",
      notes2: null,
      createdAt: new Date("2/10/2000 11:33:01 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Yarina Hynd",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Cleveland Museum Of Natural History",
      address: "3750 E. Via Palomita",
      cityStateZip: "Tucson, Arizonia 85718",
      phone: "520-299-3764",
      mobile: null,
      emailAddress: "birdhunter56@yahoo.com",
      notes: "15 - Mentor Marsh - 1998",
      notes2: null,
      createdAt: new Date("1/6/2000 10:31:34 AM GMT-5"),
    },
  });

  await db.nameAddress.create({
    data: {
      fullName: "Yvonne M. Mohlman, M.D.",
      lastName: null,
      firstName: null,
      middleName: null,
      nameSuffix: null,
      postNominal: null,
      nameAddend: null,
      organization: "Cincinnati Nature Center",
      address: "P.O. Box 27028",
      cityStateZip: "Cincinnati, Ohio  45227",
      phone: "513 677-0571",
      mobile: null,
      emailAddress: null,
      notes: "Cincinnati Nature Center - Phone 513 281-4116",
      notes2: null,
      createdAt: new Date("3/27/2000 1:11:05 PM GMT-5"),
    },
  });
}
