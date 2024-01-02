import { PrismaClient } from "@prisma/client"
const db = new PrismaClient()

/*
import seedStatusCode from './seed.statuscode'
import seedSiteStatus from './seed.sitestatus'
import seedStateCounty from './seed.statecounty'
import seedSite from './seed.site'
import seedNameAddress from './seed.nameaddress'
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
await updateSiteForCounty();
await seedNameAddress();
*/

/*
await seedSiteDate();
await seedSiteObservation();
await seedChecklist();
await updateSiteObservationForSiteDate();
await updateSiteObservationForChecklist();
*/

async function updateSiteForCounty() {
  /* will migration stuff remove this?
     Be careful with un/commenting in seed.ts
  */
  let result = await db.$executeRaw`
    UPDATE site s JOIN statecounty y ON s.county = y.county SET s.stateCountyId = y.stateCountyId`;
  console.log("Updated " + result + " site records for relation to county.")
  
  /*
  result = await db.$executeRaw`
    ALTER TABLE site ALTER COLUMN stateCountyId DROP DEFAULT`
  console.log("Default to 0 removed from stateCountyId of site table.")

  result = await db.$executeRaw`
    ALTER TABLE Site ADD CONSTRAINT Site_stateCountyId_fkey
    FOREIGN KEY (stateCountyId)
    REFERENCES StateCounty(stateCountyId) ON DELETE RESTRICT ON UPDATE CASCADE`;
  console.log("Added foreign key to site table to state-county table.")
  */
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