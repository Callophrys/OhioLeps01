import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

/*
type Post = {
    title: string
    body: string
}

async function getPosts() {
    const response = await fetch('https://dummyjson.com/posts')
    const { posts } = await response.json()
    return posts as Post[]
}

function slugify(text: string) {
    return text
        .replace(/\s/g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '')
        .toLowerCase()
}
*/

async function main() {
  await db.stateCounty.create({ data: { stateCountyId: 1, state: 'OH', county: 'Adams' } });
    await db.stateCounty.create({ data: { stateCountyId: 2, state: 'OH', county: 'Allen' }});
    await db.stateCounty.create({ data: { stateCountyId: 3, state: 'OH', county: 'Ashland' }});
    await db.stateCounty.create({ data: { stateCountyId: 4, state: 'OH', county: 'Ashtabula' }});
    await db.stateCounty.create({ data: { stateCountyId: 5, state: 'OH', county: 'Athens' }});
    await db.stateCounty.create({ data: { stateCountyId: 6, state: 'OH', county: 'Auglaize' }});
    await db.stateCounty.create({ data: { stateCountyId: 7, state: 'OH', county: 'Belmont' }});
    await db.stateCounty.create({ data: { stateCountyId: 8, state: 'OH', county: 'Brown' }});
    await db.stateCounty.create({ data: { stateCountyId: 9, state: 'OH', county: 'Butler' }});
    await db.stateCounty.create({ data: { stateCountyId: 10, state: 'OH', county: 'Carroll' }});
    await db.stateCounty.create({ data: { stateCountyId: 11, state: 'OH', county: 'Champaign' }});
    await db.stateCounty.create({ data: { stateCountyId: 12, state: 'OH', county: 'Clark' }});
    await db.stateCounty.create({ data: { stateCountyId: 13, state: 'OH', county: 'Clermont' }});
    await db.stateCounty.create({ data: { stateCountyId: 14, state: 'OH', county: 'Clinton' }});
    await db.stateCounty.create({ data: { stateCountyId: 15, state: 'OH', county: 'Columbiana' }});
    await db.stateCounty.create({ data: { stateCountyId: 16, state: 'OH', county: 'Coshocton' }});
    await db.stateCounty.create({ data: { stateCountyId: 17, state: 'OH', county: 'Crawford' }});
    await db.stateCounty.create({ data: { stateCountyId: 18, state: 'OH', county: 'Cuyahoga' }});
    await db.stateCounty.create({ data: { stateCountyId: 19, state: 'OH', county: 'Darke' }});
    await db.stateCounty.create({ data: { stateCountyId: 20, state: 'OH', county: 'Defiance' }});
    await db.stateCounty.create({ data: { stateCountyId: 21, state: 'OH', county: 'Delaware' }});
    await db.stateCounty.create({ data: { stateCountyId: 22, state: 'OH', county: 'Erie' }});
    await db.stateCounty.create({ data: { stateCountyId: 23, state: 'OH', county: 'Fairfield' }});
    await db.stateCounty.create({ data: { stateCountyId: 24, state: 'OH', county: 'Fayette' }});
    await db.stateCounty.create({ data: { stateCountyId: 25, state: 'OH', county: 'Franklin' }});
    await db.stateCounty.create({ data: { stateCountyId: 26, state: 'OH', county: 'Fulton' }});
    await db.stateCounty.create({ data: { stateCountyId: 27, state: 'OH', county: 'Gallia' }});
    await db.stateCounty.create({ data: { stateCountyId: 28, state: 'OH', county: 'Geauga' }});
    await db.stateCounty.create({ data: { stateCountyId: 29, state: 'OH', county: 'Greene' }});
    await db.stateCounty.create({ data: { stateCountyId: 30, state: 'OH', county: 'Guernsey' }});
    await db.stateCounty.create({ data: { stateCountyId: 31, state: 'OH', county: 'Hamilton' }});
    await db.stateCounty.create({ data: { stateCountyId: 32, state: 'OH', county: 'Hancock' }});
    await db.stateCounty.create({ data: { stateCountyId: 33, state: 'OH', county: 'Hardin' }});
    await db.stateCounty.create({ data: { stateCountyId: 34, state: 'OH', county: 'Harrison' }});
    await db.stateCounty.create({ data: { stateCountyId: 35, state: 'OH', county: 'Henry' }});
    await db.stateCounty.create({ data: { stateCountyId: 36, state: 'OH', county: 'Highland' }});
    await db.stateCounty.create({ data: { stateCountyId: 37, state: 'OH', county: 'Hocking' }});
    await db.stateCounty.create({ data: { stateCountyId: 38, state: 'OH', county: 'Holmes' }});
    await db.stateCounty.create({ data: { stateCountyId: 39, state: 'OH', county: 'Huron' }});
    await db.stateCounty.create({ data: { stateCountyId: 40, state: 'OH', county: 'Jackson' }});
    await db.stateCounty.create({ data: { stateCountyId: 41, state: 'OH', county: 'Jefferson' }});
    await db.stateCounty.create({ data: { stateCountyId: 42, state: 'OH', county: 'Knox' }});
    await db.stateCounty.create({ data: { stateCountyId: 43, state: 'OH', county: 'Lake' }});
    await db.stateCounty.create({ data: { stateCountyId: 44, state: 'OH', county: 'Lawrence' }});
    await db.stateCounty.create({ data: { stateCountyId: 45, state: 'OH', county: 'Licking' }});
    await db.stateCounty.create({ data: { stateCountyId: 46, state: 'OH', county: 'Logan' }});
    await db.stateCounty.create({ data: { stateCountyId: 47, state: 'OH', county: 'Lorain' }});
    await db.stateCounty.create({ data: { stateCountyId: 48, state: 'OH', county: 'Lucas' }});
    await db.stateCounty.create({ data: { stateCountyId: 49, state: 'OH', county: 'Madison' }});
    await db.stateCounty.create({ data: { stateCountyId: 50, state: 'OH', county: 'Mahoning' }});
    await db.stateCounty.create({ data: { stateCountyId: 51, state: 'OH', county: 'Marion' }});
    await db.stateCounty.create({ data: { stateCountyId: 52, state: 'OH', county: 'Medina' }});
    await db.stateCounty.create({ data: { stateCountyId: 53, state: 'OH', county: 'Meigs' }});
    await db.stateCounty.create({ data: { stateCountyId: 54, state: 'OH', county: 'Mercer' }});
    await db.stateCounty.create({ data: { stateCountyId: 55, state: 'OH', county: 'Miami' }});
    await db.stateCounty.create({ data: { stateCountyId: 56, state: 'OH', county: 'Monroe' }});
    await db.stateCounty.create({ data: { stateCountyId: 57, state: 'OH', county: 'Montgomery' }});
    await db.stateCounty.create({ data: { stateCountyId: 58, state: 'OH', county: 'Morgan' }});
    await db.stateCounty.create({ data: { stateCountyId: 59, state: 'OH', county: 'Morrow' }});
    await db.stateCounty.create({ data: { stateCountyId: 60, state: 'OH', county: 'Muskingum' }});
    await db.stateCounty.create({ data: { stateCountyId: 61, state: 'OH', county: 'Noble' }});
    await db.stateCounty.create({ data: { stateCountyId: 62, state: 'OH', county: 'Ottawa' }});
    await db.stateCounty.create({ data: { stateCountyId: 63, state: 'OH', county: 'Paulding' }});
    await db.stateCounty.create({ data: { stateCountyId: 64, state: 'OH', county: 'Perry' }});
    await db.stateCounty.create({ data: { stateCountyId: 65, state: 'OH', county: 'Pickaway' }});
    await db.stateCounty.create({ data: { stateCountyId: 66, state: 'OH', county: 'Pike' }});
    await db.stateCounty.create({ data: { stateCountyId: 67, state: 'OH', county: 'Portage' }});
    await db.stateCounty.create({ data: { stateCountyId: 68, state: 'OH', county: 'Preble' }});
    await db.stateCounty.create({ data: { stateCountyId: 69, state: 'OH', county: 'Putnam' }});
    await db.stateCounty.create({ data: { stateCountyId: 70, state: 'OH', county: 'Richland' }});
    await db.stateCounty.create({ data: { stateCountyId: 71, state: 'OH', county: 'Ross' }});
    await db.stateCounty.create({ data: { stateCountyId: 72, state: 'OH', county: 'Sandusky' }});
    await db.stateCounty.create({ data: { stateCountyId: 73, state: 'OH', county: 'Scioto' }});
    await db.stateCounty.create({ data: { stateCountyId: 74, state: 'OH', county: 'Seneca' }});
    await db.stateCounty.create({ data: { stateCountyId: 75, state: 'OH', county: 'Shelby' }});
    await db.stateCounty.create({ data: { stateCountyId: 76, state: 'OH', county: 'Stark' }});
    await db.stateCounty.create({ data: { stateCountyId: 77, state: 'OH', county: 'Summit' }});
    await db.stateCounty.create({ data: { stateCountyId: 78, state: 'OH', county: 'Trumbull' }});
    await db.stateCounty.create({ data: { stateCountyId: 79, state: 'OH', county: 'Tuscarawas' }});
    await db.stateCounty.create({ data: { stateCountyId: 80, state: 'OH', county: 'Union' }});
    await db.stateCounty.create({ data: { stateCountyId: 81, state: 'OH', county: 'Van Wert' }});
    await db.stateCounty.create({ data: { stateCountyId: 82, state: 'OH', county: 'Vinton' }});
    await db.stateCounty.create({ data: { stateCountyId: 83, state: 'OH', county: 'Warren' }});
    await db.stateCounty.create({ data: { stateCountyId: 84, state: 'OH', county: 'Washington' }});
    await db.stateCounty.create({ data: { stateCountyId: 85, state: 'OH', county: 'Wayne' }});
    await db.stateCounty.create({ data: { stateCountyId: 86, state: 'OH', county: 'Williams' }});
    await db.stateCounty.create({ data: { stateCountyId: 87, state: 'OH', county: 'Wood' }});
    await db.stateCounty.create({ data: { stateCountyId: 88, state: 'OH', county: 'Wyandot' }});
    await db.stateCounty.create({ data: { stateCountyId: 89, state: 'OH', county: 'UNKNOWN' }});
}


  main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })