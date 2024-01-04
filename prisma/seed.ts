import { PrismaClient } from "@prisma/client"
const db = new PrismaClient()

import seedNameAddress from './seed.nameaddress'; await seedNameAddress();
import seedStatusCode from './seed.statuscode'; await seedStatusCode();
import seedStateCounty from './seed.statecounty'; await seedStateCounty();
import seedSite from './seed.site'; await seedSite();
import seedSiteStatus from './seed.sitestatus'; await seedSiteStatus();
await updateSiteForCounty(); // then update these in schema
import seedSiteDate from './seed.sitedate'; await seedSiteDate();
import seedChecklist from './seed.checklist'; await seedChecklist();
import seedSiteObservation from './seed.siteobservation'; await seedSiteObservation();
/*
*/

await updateSiteObservationForSiteDate();
await updateSiteObservationForChecklist();

/*
*/

/*
import seedTaxonomyFamily from "./seed.taxonomy.family"; seedTaxonomyFamily();
*/

/*
*/

async function updateSiteForCounty() {
  let result = await db.$executeRaw`
    UPDATE site s JOIN statecounty y ON s.county = y.county SET s.stateCountyId = y.stateCountyId`;
  console.log("Updated " + result + " site records for relation to county.")
}

async function updateSiteObservationForChecklist() {
  let result = await db.$executeRaw`
    update siteObservation o join checklist k on o.checklistKey = k.checklistKey
      set o.checklistId = k.checklistId`;
  console.log("Updated " + result + " siteObservation records for relation to checklist.")
}

async function updateSiteObservationForSiteDate() {
  let result = await db.$executeRaw`
    update siteObservation o join siteDate d on o.seqId = d.seqId
      set o.siteDateId = d.siteDateId`;
  console.log("Updated " + result + " siteObservation records for relation to siteDate.")
}

/*
seed()
  .catch((error) => {
    console.error("Seeding error:", error);
  })
  .finally(async () => {
    await db.$disconnect();
  });

*/