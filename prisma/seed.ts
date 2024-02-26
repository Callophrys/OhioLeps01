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
  
  const uu = await db.organization.create({
    data: {
      name: 'Unauthenticated'
    }
  });

  let unauthOrganizationId = uu.id;
  
  

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

  await db.appConfig.createMany({
    data: [
      { configName: 'modeDebug', configType: 'boolean', configValue: 'true', organizationId: unauthOrganizationId },
      { configName: 'owner', configType: 'string', configValue: '', organizationId: unauthOrganizationId },
      { configName: 'title', configType: 'string', configValue: '', organizationId: unauthOrganizationId },
      { configName: 'description', configType: 'string', configValue: '', organizationId: unauthOrganizationId },
      { configName: 'url', configType: 'string', configValue: 'http://localhost:5173/', organizationId: unauthOrganizationId },
      { configName: 'showAnimatedIcon', configType: 'boolean', configValue: 'false', organizationId: unauthOrganizationId },
      { configName: 'showAppBar', configType: 'boolean', configValue: 'true', organizationId: unauthOrganizationId },
      { configName: 'showFooter', configType: 'boolean', configValue: 'false', organizationId: unauthOrganizationId },
      { configName: 'showAvatar', configType: 'boolean', configValue: 'false', organizationId: unauthOrganizationId },
      { configName: 'showStateProvince', configType: 'boolean', configValue: 'false', organizationId: unauthOrganizationId },
      { configName: 'initialDateRangeChoice', configType: 'boolean', configValue: 'true', organizationId: unauthOrganizationId },
      { configName: 'initialHideUnmonitoredChoice', configType: 'boolean', configValue: 'true', organizationId: unauthOrganizationId },
      { configName: 'initialUseLatinChoice', configType: 'boolean', configValue: 'true', organizationId: unauthOrganizationId },
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
        },
        {
          username: "nate",
          firstName: "Mortimer",
          lastName: "Snerd",
          passwordHash: "$2b$10$09GTBhmT0rC41GOoOvgw6.oGTbMEKZaxQ3spCEwRnmXjc6jxusoEC",
          userAuthToken: "10b4f4bc-8a3d-4df4-8112-98eea730fc24",
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
          username: "admin1",
          firstName: "First",
          lastName: "Admin",
          passwordHash: "$2b$10$/10FU9HawFQRclgobUUvieBzjFPEcgPHnxj6vFQXppZlCA.GllNSi",
          userAuthToken: "d7659c42-d646-4a66-b1c3-17b4bac9104c",
          organizationId: organization.id
        },
        {
          username: "admin2",
          firstName: "Second",
          lastName: "Admin",
          passwordHash: "$2b$10$7E1py4B1Z/92b91WwvyyH.paGvSXu3woJyP39dchA0au4nzi.Zp6q",
          userAuthToken: "04a530dc-a87a-4309-a2f4-51d2733b9c14",
          organizationId: organization.id
        }]
      }
    },
  });

  await db.role.create({
    data: {
      name: 'USER', // view all data and reports
      users: {
        create: [{
          username: "user1",
          firstName: "First",
          lastName: "User",
          passwordHash: "$2b$10$56GJhxPT4DjabrILVNuTyOhuiy9getA/XcTzMa3dkbK7mNZngk1Ie",
          userAuthToken: "65bd36a0-93bc-462a-ad94-563fa09a5d9e",
          organizationId: organization.id
        },
        {
          username: "user2",
          firstName: "Second",
          lastName: "User",
          passwordHash: "$2b$10$EGaoT8pcITEpMpOi3L57.O6sxs.3.7Tzo/U/Ui6WhofIKRzy/i21a",
          userAuthToken: "0d696358-3d55-4c61-ae8b-2c0a87ff848a",
          organizationId: organization.id
        }]
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
          username: "entry1",
          firstName: "First",
          lastName: "Entry",
          passwordHash: "$2b$10$LXMmdw48Q73UftCVFCmtm.oLRDQeO6hhdXXt.e3c3wXenSBATn95O",
          userAuthToken: "6544d888-ac88-43f1-bfb9-b028d677d028",
          organizationId: organization.id
        },
        {
          username: "entry2",
          firstName: "Second",
          lastName: "Entry",
          passwordHash: "$2b$10$R3dg.kcIX6R9bMeTlwQ4texkjFMz.sdukrABksoRnIhGzQSSEjYb6",
          userAuthToken: "a2bb619d-541f-4310-8e68-75ee7f9fd516",
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
          username: "reviewer1",
          firstName: "First",
          lastName: "Reviewer",
          passwordHash: "$2b$10$.WNNr6C6eeqcDzNX4HLsEOMWXsu0MAAGQya1wWLnl5Vi0n3Ct1jqe",
          userAuthToken: "ea94fcd5-41c9-4541-8baa-7dd8734ee72d",
          organizationId: organization.id
        },
        {
          username: "reviewer2",
          firstName: "Second",
          lastName: "Reviewer",
          passwordHash: "$2b$10$7QJ786uW3jnDSslxwswNs.NikiI9VKoq2fC0jPHo0oIN/EADJjJf2",
          userAuthToken: "81aeae4b-b02c-4948-8ecf-26084d7dbc3d",
          organizationId: organization.id
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
