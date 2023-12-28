import { PrismaClient } from "@prisma/client"
const db = new PrismaClient()

export default async function() {
    console.log('Creating statusCode records');
    await db.statusCode.createMany({ data: [
        { statusCodeId: 1, code: 'M', description: 'Site monitored' },
        { statusCodeId: 2, code: 'MR', description: 'Received datasheets' },
        { statusCodeId: 3, code: 'E', description: 'Entered into database' },
        { statusCodeId: 4, code: 'N', description: 'Not monitored' },
        { statusCodeId: 5, code: 'U', description: 'Unknown status' }
    ]});
}

/*
main()
.then(async () => {
    await db.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
})
*/