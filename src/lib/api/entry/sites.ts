import prisma from "$lib/prisma"

/*
let todos: Site[] = [
    {
        id: Date.now(),
        text: 'Learn how forms work',
        completed: false
    }
]
*/

export function getSite(siteId: number) {
    const sites = await prisma.site.findMany({
        include: {
            stateCounty: true
        }
    });

	sites.sort((first, second) => second.siteName > first.siteName ? 1 : 0);
	return sites
}

export function getSites() {

    const sites = await prisma.site.findMany({
        include: {
            stateCounty: true
      },
      order: {
        siteName: true
      }
    });

	sites.sort((first, second) => second.siteName > first.siteName ? 1 : 0);
	return sites
}
  return todos
}

export function addSite(text: string) {
  const todo: Site = {
    id: Date.now(),
    text,
    completed: false
  }
  todos.push(todo)
}

export function removeSite(id: number) {
  todos = todos.filter((todo) => todo.id !== id)
}

export function clearSites() {
  todos = []
}
