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
let orgId: number = await updateOrganizations();
await updateRoles(orgId);
/*
*/

async function updateOrganizations(): number {
  console.log('Creating Organizations');

  const tt = await db.organization.create({
    data: {
      name: 'TEMPLATE'
    }
  });

  let templateOrganizationId = tt.id;

  const ll = await db.organization.create({
    data: {
      name: 'Ohio Lepidopterists'
    }
  });

  let mainOrganizationId = ll.id;

  console.log('Creating App Configs');
  await db.appConfig.createMany({
    data: [
      { configName: 'modeDebug', configType: 'boolean', configValue: 'true', organizationId: templateOrganizationId },
      { configName: 'owner', configType: 'string', configValue: 'Template Owner', organizationId: templateOrganizationId },
      { configName: 'title', configType: 'string', configValue: 'Template Title', organizationId: templateOrganizationId },
      { configName: 'description', configType: 'string', configValue: 'Template Description', organizationId: templateOrganizationId },
      { configName: 'url', configType: 'string', configValue: 'http://localhost:5173/', organizationId: templateOrganizationId },
      { configName: 'showAnimatedIcon', configType: 'boolean', configValue: 'false', organizationId: templateOrganizationId },
      { configName: 'showAppBar', configType: 'boolean', configValue: 'true', organizationId: templateOrganizationId },
      { configName: 'showFooter', configType: 'boolean', configValue: 'false', organizationId: templateOrganizationId },
      { configName: 'showAvatar', configType: 'boolean', configValue: 'false', organizationId: templateOrganizationId },
      { configName: 'showStateProvince', configType: 'boolean', configValue: 'false', organizationId: templateOrganizationId },
      { configName: 'monitorStartYear', configType: 'number', configValue: '1995', organizationId: templateOrganizationId },
      { configName: 'monitorSeason', configType: 'object', configValue: '{"start":{"year":1995,"month":4,"day":1},"end":{"year":9999,"month":10,"day":1}}', organizationId: templateOrganizationId },
      { configName: 'initialDateRangeChoice', configType: 'boolean', configValue: 'true', organizationId: templateOrganizationId },
      { configName: 'initialHideUnmonitedChoice', configType: 'boolean', configValue: 'true', organizationId: templateOrganizationId },
      { configName: 'initialUseLatinChoice', configType: 'boolean', configValue: 'true', organizationId: templateOrganizationId },
    ]
  });

  await db.appConfig.createMany({
    data: [
      { configName: 'modeDebug', configType: 'boolean', configValue: 'true', organizationId: mainOrganizationId },
      { configName: 'owner', configType: 'string', configValue: 'Ohio Lepidopterists &copy;1995', organizationId: mainOrganizationId },
      { configName: 'title', configType: 'string', configValue: 'Learn Svelte(kit), Vite, TailwindCSS, SkeletonUI and Prisma', organizationId: mainOrganizationId },
      { configName: 'description', configType: 'string', configValue: "Ohio Lepidopterists' Long-Term Monitering of Ohio Butterflies", organizationId: mainOrganizationId },
      { configName: 'url', configType: 'string', configValue: 'http://localhost:5173/', organizationId: mainOrganizationId },
      { configName: 'showAnimatedIcon', configType: 'boolean', configValue: 'false', organizationId: mainOrganizationId },
      { configName: 'showAppBar', configType: 'boolean', configValue: 'true', organizationId: mainOrganizationId },
      { configName: 'showFooter', configType: 'boolean', configValue: 'false', organizationId: mainOrganizationId },
      { configName: 'showAvatar', configType: 'boolean', configValue: 'false', organizationId: mainOrganizationId },
      { configName: 'showStateProvince', configType: 'boolean', configValue: 'false', organizationId: mainOrganizationId },
      { configName: 'monitorStartYear', configType: 'number', configValue: '1995', organizationId: mainOrganizationId },
      { configName: 'monitorSeason', configType: '', configValue: '{"start":{"year":1995,"month":4,"day":1},"end":{"year":9999,"month":10,"day":1}}', organizationId: mainOrganizationId },
      { configName: 'initialDateRangeChoice', configType: 'boolean', configValue: 'true', organizationId: mainOrganizationId },
      { configName: 'initialHideUnmonitedChoice', configType: 'boolean', configValue: 'true', organizationId: mainOrganizationId },
      { configName: 'initialUseLatinChoice', configType: 'boolean', configValue: 'true', organizationId: mainOrganizationId },
    ]
  });

  return mainOrganizationId;
}

// Consider making role into ENUM
async function updateRoles(orgId: number) {
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
          organizationId: orgId
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
          organizationId: orgId
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
          organizationId: orgId
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
