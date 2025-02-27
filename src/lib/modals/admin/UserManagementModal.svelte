<script lang="ts">
  import { Modal } from "@skeletonlabs/skeleton";
  import type { Site, User } from "$lib/types";
  import {
    fetchUsersBySite,
    addUserToSite,
    removeUserFromSite,
  } from "$lib/database/siteusers";

  export let site: Site | null = null;
  let users: User[] = [];

  async function loadUsers() {
    if (site) users = await fetchUsersBySite(site.id);
  }

  async function addUser(userId: string) {
    if (site) {
      await addUserToSite(site.id, userId);
      loadUsers();
    }
  }

  async function removeUser(userId: string) {
    if (site) {
      await removeUserFromSite(site.id, userId);
      loadUsers();
    }
  }
</script>

<Modal bind:open={site} on:close={() => (site = null)}>
  <div class="p-4">
    <h2 class="text-xl font-bold">Manage Users in {site?.name}</h2>
    <ul>
      {#each users as user}
        <li class="flex justify-between p-2 bg-gray-700 rounded-md">
          <span>{user.name}</span>
          <button on:click={() => removeUser(user.id)} class="text-red-500"
            >Remove</button
          >
        </li>
      {/each}
    </ul>
    <button
      on:click={() => addUser("new-user-id")}
      class="mt-4 p-2 bg-blue-500 rounded">Add User</button
    >
  </div>
</Modal>
