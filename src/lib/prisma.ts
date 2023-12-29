import { PrismaClient } from '@prisma/client';

// Adding new computed field to replace combinedLatinName
// May have to trim or account for missing parts. E.g. subspecies
const prisma = new PrismaClient().$extends({
    result: {
        checklist: {
            xname: {
                needs: { genus: true, species: true, subspecies: true },
                compute(checklist) {
                    return `${checklist.genus} ${checklist.species} ${checklist.subspecies}`
                }
            }
        }
    }
});

export default prisma;