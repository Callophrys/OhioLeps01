import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export default async function () {
  console.log("Creating statusCode records");
  await db.statusCode.createMany({
    data: [
      { id: 1, code: "M", description: "Site monitored" },
      { id: 2, code: "MR", description: "Received datasheets" },
      { id: 3, code: "E", description: "Entered into database" },
      { id: 4, code: "N", description: "Not monitored" },
      { id: 5, code: "U", description: "Unknown status" },
    ],
  });
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
