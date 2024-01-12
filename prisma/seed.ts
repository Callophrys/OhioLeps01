import { PrismaClient } from "@prisma/client"
const db = new PrismaClient()

/*
import seedStates from "./seed.state"; await seedStates();
import seedStatusCode from './seed.statuscode'; await seedStatusCode();
*/
import seedSite from './seed.site'; await seedSite();
import seedSiteStatus from './seed.sitestatus'; await seedSiteStatus();

import seedSiteDate from './seed.sitedate'; await seedSiteDate();
import seedChecklist from './seed.checklist'; await seedChecklist();
import seedSiteObservation from './seed.siteobservation'; await seedSiteObservation();
await updateSiteObservationForSiteDate();
await updateSiteObservationForChecklist();
import seedTaxonomy from "./seed.taxonomy"; await seedTaxonomy();
await updateRoles();
import seedNameAddress from './seed.nameaddress'; await seedNameAddress();
/*
*/
/*
*/

// Consider making into ENUM
async function updateRoles() {
  console.log('Creating Roles');
  await db.role.createMany({
    data: [
      { id: 1, name: 'USER' },
      { id: 2, name: 'ADMIN' },
    ]
  });
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