import { PrismaClient } from '@prisma/client';


/*
https://www.prisma.io/docs/orm/prisma-client/client-extensions/type-utilities
https://www.prisma.io/docs/orm/prisma-client/type-safety/operating-against-partial-structures-of-model-types
https://www.prisma.io/docs/orm/prisma-client/queries/computed-fields#using-a-computation-function

*/


// Adding new computed field to replace combinedLatinName
// May have to trim or account for missing parts. E.g. subspecies
const prisma = new PrismaClient().$extends({
    result: {
        checklist: {
            xname: {
                needs: { genus: true, species: true, subspecies: true },
                compute(checklist) {
                    return `${checklist.genus} ${checklist.species}${checklist.subspecies ? ' ' + checklist.subspecies : ''}`
                }
            }
        },
        stateCounty: {
            isMonitored: {
                needs: { sites: true },
                compute(stateCounty) {
                    return stateCounty.sites.length !== 0;
                }
            }
        }
    }
});

export default prisma;