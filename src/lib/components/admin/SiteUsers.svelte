<script lang="ts">
  import { getContext } from "svelte";
  import { SiteContextKey } from "$lib/context";

  const { selectedSite, users, loadUsers } = getContext(SiteContextKey);

  async function removeUser(userId: string) {
    if (selectedSite) {
      await fetch(`/api/sites/${selectedOrganization}/users/${userId}`, {
        method: "DELETE",
      });
      loadUsers(selectedSite);
    }
  }
</script>

<div class="p-4 bg-gray-800 rounded-lg">
  <h2 class="text-lg font-bold">Users in Site</h2>
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
