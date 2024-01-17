import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';


/*
https://www.prisma.io/docs/orm/prisma-client/client-extensions/type-utilities
https://www.prisma.io/docs/orm/prisma-client/type-safety/operating-against-partial-structures-of-model-types
https://www.prisma.io/docs/orm/prisma-client/queries/computed-fields#using-a-computation-function
https://github.com/prisma/prisma-client-extensions

*/


// Adding new computed field to replace combinedLatinName
// May have to trim or account for missing parts. E.g. subspecies
/*
const prisma = new PrismaClient().$extends({
    result: {
        county: {
            isMonitored: {
                needs: { sites: true },
                compute(county) {
                    return String(county.sites.length !== 0);
                }
            },
            siteCount: {
                needs: { sites: true },
                compute(county) {
                    return county.sites.length;
                }
            }
        }
    }
});

*/
const prisma = new PrismaClient().$extends({
    result: {
        siteDate: {
            year: {
                compute(siteDate): number {
                    return siteDate.recordDate.getUTCFullYear();
                }
            }
        },
        checklist: {
            scientificName: {
                compute(checklist): string {
                    return checklist.genus + ' ' + checklist.species + (checklist.subspecies ? ' ' + checklist.subspecies : '');
                }
            }
        }
    }
});

export default prisma;