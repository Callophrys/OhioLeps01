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
