import seedStatusCode from './seed.statuscode'
import seedSiteStatus from './seed.sitestatus'

/*
import seedStateCounty from './seed.statecounty'
import seedSite from './seed.site'
import seedSiteDate from './seed.sitedate'
import seedSiteObservation from './seed.siteobservation'
import seedChecklist from './seed.checklist'
*/

await seedStatusCode();
await seedSiteStatus();
/*
await seedStateCounty();
await seedSite();
await seedSiteDate();
await seedSiteObservation();
await seedChecklist();
*/

/*
seed()
  .catch((error) => {
    console.error("Seeding error:", error);
  })
  .finally(async () => {
    await db.$disconnect();
  });

*/