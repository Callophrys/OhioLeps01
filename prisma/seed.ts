import { Organization, PrismaClient } from "@prisma/client"
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
let organization = await updateOrganizations();
await updateRoles(organization);
/*
*/

async function updateOrganizations(): Promise<Organization> {
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
      { configName: 'initialHideUnmonitoredChoice', configType: 'boolean', configValue: 'true', organizationId: templateOrganizationId },
      { configName: 'initialUseLatinChoice', configType: 'boolean', configValue: 'true', organizationId: templateOrganizationId },

      // Password expires in x days
      { configName: 'expiresDays', configType: 'number', configValue: '90', organizationId: templateOrganizationId },

      // Maximum logins failures before lock; Reset counter for user on success
      { configName: 'maxLoginRetries', configType: 'number', configValue: '12', organizationId: templateOrganizationId },

      // Count of logins failures for wait feature to invoke
      // Reset counter for user on post-wait attempt
      // Keep going until success or when maxLoginRetries causes account lock
      { configName: 'attemptsBeforeDelay', configType: 'number', configValue: '3', organizationId: templateOrganizationId },

      // Delay wait time in seconds
      { configName: 'loginDelayTime', configType: 'number', configValue: '90', organizationId: templateOrganizationId },

      /* Max login failures in xxx days before lock */
      // Max login failures in maxLoginDelaysDays days before lock
      { configName: 'maxLoginFailures', configType: 'number', configValue: '30', organizationId: templateOrganizationId },
      // If set to zero or negative or something super high then maxLoginDelays simply becomes lock accout when reaching maxLoginDelays number of times
      // I.e. Allow maxLoginFailures failures (even after successes) inside maxLoginFailuresDays; Else lock
      // Probably requires a set field or mini-queue of some kind for implementation
      { configName: 'maxLoginFailuresDays', configType: 'number', configValue: '30', organizationId: templateOrganizationId },

      /* Max login wait delays in yyy days before lock */
      // Max login failure delays in maxLoginDelaysDays days before lock
      { configName: 'maxLoginDelays', configType: 'number', configValue: '3', organizationId: templateOrganizationId },
      // If set to zero or negative or something super high then maxLoginDelays simply becomes lock accout when reaching maxLoginDelays number of times
      // I.e. login delay scenario is only allowed to happen x times inside of y days
      // Probably requires a set field or mini-queue of some kind for implementation
      { configName: 'maxLoginDelaysDays', configType: 'number', configValue: '3', organizationId: templateOrganizationId },

    ]
  });

  await db.appConfig.createMany({
    data: [
      { configName: 'modeDebug', configType: 'boolean', configValue: 'true', organizationId: mainOrganizationId },
      { configName: 'owner', configType: 'string', configValue: 'Ohio Lepidopterists &copy;1995', organizationId: mainOrganizationId },
      { configName: 'title', configType: 'string', configValue: 'Learn Svelte(kit), Vite, TailwindCSS, SkeletonUI and Prisma', organizationId: mainOrganizationId },
      { configName: 'description', configType: 'string', configValue: "Ohio Lepidopterists' Long-Term Monitoring of Ohio Butterflies", organizationId: mainOrganizationId },
      { configName: 'url', configType: 'string', configValue: 'http://localhost:5173/', organizationId: mainOrganizationId },
      { configName: 'showAnimatedIcon', configType: 'boolean', configValue: 'false', organizationId: mainOrganizationId },
      { configName: 'showAppBar', configType: 'boolean', configValue: 'true', organizationId: mainOrganizationId },
      { configName: 'showFooter', configType: 'boolean', configValue: 'false', organizationId: mainOrganizationId },
      { configName: 'showAvatar', configType: 'boolean', configValue: 'false', organizationId: mainOrganizationId },
      { configName: 'showStateProvince', configType: 'boolean', configValue: 'false', organizationId: mainOrganizationId },
      { configName: 'monitorStartYear', configType: 'number', configValue: '1995', organizationId: mainOrganizationId },
      { configName: 'monitorSeason', configType: 'object', configValue: '{"start":{"year":1995,"month":4,"day":1},"end":{"year":9999,"month":10,"day":1}}', organizationId: mainOrganizationId },
      { configName: 'initialDateRangeChoice', configType: 'boolean', configValue: 'true', organizationId: mainOrganizationId },
      { configName: 'initialHideUnmonitoredChoice', configType: 'boolean', configValue: 'true', organizationId: mainOrganizationId },
      { configName: 'initialUseLatinChoice', configType: 'boolean', configValue: 'true', organizationId: mainOrganizationId },

      { configName: 'expiresDays', configType: 'number', configValue: '90', organizationId: mainOrganizationId },
      { configName: 'maxLoginRetries', configType: 'number', configValue: '12', organizationId: mainOrganizationId },
      { configName: 'attemptsBeforeDelay', configType: 'number', configValue: '3', organizationId: mainOrganizationId },
      { configName: 'loginDelayTime', configType: 'number', configValue: '90', organizationId: mainOrganizationId },
      { configName: 'maxLoginFailures', configType: 'number', configValue: '30', organizationId: mainOrganizationId },
      { configName: 'maxLoginFailuresDays', configType: 'number', configValue: '30', organizationId: mainOrganizationId },
      { configName: 'maxLoginDelays', configType: 'number', configValue: '3', organizationId: mainOrganizationId },
      { configName: 'maxLoginDelaysDays', configType: 'number', configValue: '3', organizationId: mainOrganizationId },
    ]
  });

  return ll;
}

// Consider making role into ENUM
async function updateRoles(organization: Organization) {
  console.log('Creating Roles and Users');

  // Super user/admin
  // View and edit anything, e.g. data AND lists AND historic
  // Review-confirm, e.g. sign off, on new data
  // System configuration
  // Manage any account
  const rr = await db.role.create({
    data: {
      name: 'SUPER',
      users: {
        create: [{
          username: "super",
          firstName: "Super",
          lastName: "Person",
          passwordHash: "$2b$10$VN2pirOBvSfrOBL42kqzSOkmEF0Ib9O0x4NIdrD1umXq7b1bQmafe",
          userAuthToken: "958fa8b0-61a2-4a61-9801-8516df1a7914",
          organizationId: organization.id
        }]
      }
    },
  });

  await db.role.create({
    data: {
      name: 'ADMIN',
      users: {
        create: [{
          username: "admin",
          firstName: "Admin",
          lastName: "Person",
          passwordHash: "$2b$10$DM2lV0aubsQ4hejId4KcK.t0S04MEy0wDsbhYcmDCFqHN.Y4wo156",
          userAuthToken: "4a961ba9-8ef9-4cb1-ba1b-da6273bc6fd3",
          organizationId: organization.id
        }]
      }
    },
  });

  await db.role.create({
    data: {
      name: 'USER', // view all data and reports
      users: {
        create: {
          username: "user",
          firstName: "User",
          lastName: "Person",
          passwordHash: "$2b$10$wQjU6kog6V88e2/PdTNtFeSNJtXajLyfCRdB1is5afqU0XAEul/h2",
          userAuthToken: "00af2745-316f-45f1-a7a4-743b4064e798",
          organizationId: organization.id
        }
      }
    }
  });

  // May enter new data and unconfirmed data; view reports
  // Edits to another's unconfirmed data might be a specific privilege
  await db.role.create({
    data: {
      name: 'ENTRY',
      users: {
        create: [{
          username: "entry",
          firstName: "Entry",
          lastName: "Person",
          passwordHash: "$2b$10$Yeujo.WcyvQX/5PW/eKYS.2OqoRKPcbXF8aVyyD7f8s6I64TZJ56S",
          userAuthToken: "8926adca-f09d-4f8c-a884-190707bf3037",
          organizationId: organization.id
        }]
      }
    },
  });

  // Review and confirm data is valid; Can unlock own confirmations; View reports
  await db.role.create({
    data: {
      name: 'REVIEWER',
      users: {
        create: [{
          username: "reviewer",
          firstName: "Reviewer",
          lastName: "Person",
          passwordHash: "$2b$10$Pk7GN1mKdSHHuU6hSGgBTuxzEPvliTfEDd1xbARKOLPRt8FC3eVL.",
          userAuthToken: "30a1611b-77be-4b93-9a1a-7034f8560749",
          organizationId: organization.id
        }]
      }
    },
  });

  await db.user.create({
    data: {
      username: "nate",
      firstName: "Mortimer",
      lastName: "Snerd",
      passwordHash: "$2b$10$09GTBhmT0rC41GOoOvgw6.oGTbMEKZaxQ3spCEwRnmXjc6jxusoEC",
      userAuthToken: "10b4f4bc-8a3d-4df4-8112-98eea730fc24",
      roleId: rr.id,
      organizationId: organization.id
    }
  })

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
