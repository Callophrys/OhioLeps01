// See https://kit.svelte.dev/docs/types#app

import type { defaultOrganization } from "$lib/config"

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
    interface Locals {
      user: {
        id: string
        name: string
        firstLast: string
        lastFirst: string
        role: string
        organizationId: string
      },
      config: {}
    }
  }
}

/*  // moved this stuff up 
declare namespace App {
  interface Locals {
    user: {
      name: string
      role: string
    }
  }

  // interface PageData {}

  // interface Platform {}
}
*/

export { };