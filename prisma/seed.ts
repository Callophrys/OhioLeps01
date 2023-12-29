import { PrismaClient } from "@prisma/client"
const db = new PrismaClient()

/*
import seedStatusCode from './seed.statuscode'
import seedSiteStatus from './seed.sitestatus'
import seedStateCounty from './seed.statecounty'
import seedSite from './seed.site'
*/

/*
import seedSiteDate from './seed.sitedate'
import seedSiteObservation from './seed.siteobservation'
import seedChecklist from './seed.checklist'
*/

/*
await seedStatusCode();
await seedSiteStatus();
await seedStateCounty();
await seedSite();
*/
await updateSiteForCounty();

/*
await seedSiteDate();
await seedSiteObservation();
await updateSiteObservationForSiteDate();
await updateSiteObservationForChecklist();
await seedChecklist();
*/

async function updateSiteForCounty() {
  /* will migration stuff remove this? */
  let result = await db.$executeRaw`
    ALTER TABLE site ADD COLUMN stateCountyId INTEGER NOT NULL DEFAULT 0`
  console.log("Added stateCountyId to site table.")

  result = await db.$executeRaw`
    update site s join statecounty y on s.county = y.county
      set s.stateCountyId = y.stateCountyId`;
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