import { PrismaClient } from "@prisma/client"
const db = new PrismaClient()

/*
import seedStates from "./seed.state"; await seedStates();
import seedStatusCode from './seed.statuscode'; await seedStatusCode();
*/

// seems a pause is needed here
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

// Consider making role into ENUM
async function updateRoles() {
  console.log('Creating Roles and Users');
  await db.role.createMany({
    data: [
      {
        id: 1,
        name: 'USER',
        users: {
          create: {
            username: "stella",
            passwordHash: "$2b$10$bjXz/irXJrUh8gvG8fidZepQN0BrN2/d2R2RshizCHYSI.FP74s8G",
            userAuthToken: "dc1c44da-fa33-4fb7-82cc-b5baa7522c4d",
            roleId: 1
          }
        }
      },
      {
        id: 2,
        name: 'ADMIN',
        users: {
          create: {
            username: "nate",
            passwordHash: "$2b$10$iAIf7B4I9aUy9ZklbY.yy.GuJ0U3HjpttqEMiHb5zwvoMsYOqDXFy",
            userAuthToken: "70e2e703-06d9-4ebc-bc39-889d85f9db4d",
            roleId: 2
          }
        }
      },
    ]
  });
  console.log('  done creating Roles and Users');
}

async function updateSiteObservationForChecklist() {
  let result = await db.$executeRaw`
    update siteObservation o join checklist k on o.hodges = k.hodges
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