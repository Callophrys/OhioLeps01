import { PrismaClient } from "@prisma/client"
const db = new PrismaClient()

import seedStates from "./seed.state";
import seedStatusCode from './seed.statuscode';
import seedSite from './seed.site';
import seedSiteStatus from './seed.sitestatus';
import seedSiteDate from './seed.sitedate';
import seedChecklist from './seed.checklist';
import seedSiteDateObservation from './seed.sitedateobservation';
import seedTaxonomy from "./seed.taxonomy";
import seedNameAddress from './seed.nameaddress';

/*
*/
await seedStates();
await seedStatusCode();
await seedSite();
await seedSiteStatus();
await seedSiteDate();
await seedChecklist();
await seedSiteDateObservation();
await seedTaxonomy();
await seedNameAddress();
await updateRoles();
/*
*/

// Consider making role into ENUM
async function updateRoles() {
  console.log('Creating Roles and Users');

  await db.role.create({
    data: {
      id: 1,
      name: 'USER', // view all data and reports
      users: {
        create: {
          username: "stella",
          passwordHash: "$2b$10$bjXz/irXJrUh8gvG8fidZepQN0BrN2/d2R2RshizCHYSI.FP74s8G",
          userAuthToken: "dc1c44da-fa33-4fb7-82cc-b5baa7522c4d",
        }
      }
    }
  });

  await db.role.create({
    data: {
      id: 2,
      name: 'ENTRY', // edit new data and unconfirmed data; view reports
      users: {
        create: [{
          username: "snell",
          passwordHash: "$2b$10$iAIf7B4I9aUy9ZklbY.yy.GuJ0U3HjpttqEMiHb5zwvoMsYOqDXFy",
          userAuthToken: "70e2e703-06d9-4ebc-bc39-889d85f9db4d",
        }]
      }
    },
  });

  await db.role.create({
    data: {
      id: 3,
      name: 'ADMIN', // view and edit anything, e.g. data AND lists AND historic; confirm, e.g. sign off, on new data
      users: {
        create: [{
          username: "nate",
          passwordHash: "$2b$10$09GTBhmT0rC41GOoOvgw6.oGTbMEKZaxQ3spCEwRnmXjc6jxusoEC",
          userAuthToken: "10b4f4bc-8a3d-4df4-8112-98eea730fc24",
        }]
      }
    },
  });
  console.log('  done creating Roles and Users');
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
