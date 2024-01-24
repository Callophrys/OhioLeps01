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
                compute(siteDate): number {
                    return siteDate.recordDate.getUTCFullYear();
                }
            }
        },
        siteObservation: {
            total: {
                compute(o) {
                    return Number(o.s1)
                        + Number(o.s2)
                        + Number(o.s3)
                        + Number(o.s4)
                        + Number(o.s5)
                        + Number(o.s6)
                        + Number(o.s7)
                        + Number(o.s8)
                        + Number(o.s9)
                        + Number(o.s10)
                        + Number(o.s11)
                        + Number(o.s12)
                        + Number(o.s13)
                        + Number(o.s14)
                        + Number(o.s15);
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