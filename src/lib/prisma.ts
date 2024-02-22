import { PrismaClient } from '@prisma/client';
import { scientificName } from '$lib/utils.js';
import type { AppConfig, Checklist, SiteDateObservation, SiteDate, User } from '@prisma/client';


/*
https://www.prisma.io/docs/orm/prisma-client/client-extensions/type-utilities
https://www.prisma.io/docs/orm/prisma-client/type-safety/operating-against-partial-structures-of-model-types
https://www.prisma.io/docs/orm/prisma-client/queries/computed-fields#using-a-computation-function
https://github.com/prisma/prisma-client-extensions

*/


// Adding new computed field to replace combinedLatinName
// May have to trim or account for missing parts. E.g. subspecies
const prisma = new PrismaClient().$extends({
    result: {
        county: {
            isMonitored: {
                needs: { sites: true },
                compute(county) {
                    return county.sites.length > 0;
                }
            },
            siteCount: {
                needs: { sites: true },
                compute(county) {
                    return county.sites.length;
                }
            },
        },
        siteDate: {
            year: {
                compute(siteDate: SiteDate): number {
                    return siteDate.recordDate.getUTCFullYear();
                }
            },
            siteName: {
                needs: { site: true },
                compute(siteDate) {
                    return siteDate.site.siteName;
                }
            }
        },
        siteDateObservation: {
            total: {
                compute(o: SiteDateObservation) {
                    return Number(o.section1)
                        + Number(o.section2)
                        + Number(o.section3)
                        + Number(o.section4)
                        + Number(o.section5)
                        + Number(o.section6)
                        + Number(o.section7)
                        + Number(o.section8)
                        + Number(o.section9)
                        + Number(o.section10)
                        + Number(o.section11)
                        + Number(o.section12)
                        + Number(o.section13)
                        + Number(o.section14)
                        + Number(o.section15);
                }
            }
        },
        checklist: {
            scientificName: {
                compute(checklist: Checklist): string {
                    return scientificName(checklist.genus ?? '', checklist.species ?? '', checklist.subspecies ?? '');
                }
            }
        },
        appConfig: {
            checked: {
                compute(appConfig: AppConfig): boolean {
                    return appConfig.configType === 'boolean' ? appConfig.configValue === 'true' : false;
                }
            },
            formKey: {
                compute(appConfig: AppConfig): string {
                    return appConfig.id + '_' + appConfig.configName;
                }
            }
        },
        user: {
            firstLast: {
                compute(user: User): string {
                    return user.firstName + ' ' + user.lastName;
                }
            },
            lastFirst: {
                compute(user: User): string {
                    return user.lastName + ', ' + user.firstName;
                }
            }
        }
    }
});

export default prisma;