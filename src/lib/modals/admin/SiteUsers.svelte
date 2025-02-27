<script lang="ts">
  import type { Site, User } from "$lib/types";
  import {
    fetchUsersBySite,
    removeUserFromSite,
  } from "$lib/database/siteusers";
  import { onMount } from "svelte";

  export let site: Site | null = null;
  let users: User[] = [];

  async function loadUsers() {
    if (site) users = await fetchUsersBySite(site.id);
  }

  async function removeUser(userId: string) {
    if (site) {
      await removeUserFromSite(site.id, userId);
      loadUsers();
    }
  }

  onMount(loadUsers);
</script>

{#if site}
  <div class="p-4 bg-gray-800 rounded-lg">
    <h2 class="text-lg font-bold">{site.name} - Users</h2>
    <ul class="space-y-2">
      {#each users as user}
        <li class="flex justify-between p-2 bg-gray-700 rounded-md">
          <span>{user.name}</span>
          <button on:click={() => removeUser(user.id)} class="text-red-500"
            >Remove</button
          >
        </li>
      {/each}
    </ul>
  </div>
{/if}
