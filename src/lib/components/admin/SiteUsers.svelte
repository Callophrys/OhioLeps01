<script lang="ts">
  import { getContext } from "svelte";
  import { SiteContextKey } from "$lib/context";

  const context = getContext(SiteContextKey);
  let selectedSite = $state(context?.selectedSite);
  let users = $state(context.users ?? []);
  const loadUsers = context.loadUsers;

  $effect(() => {
    if (selectedSite !== 0) loadUsers(selectedSite);
  });

  async function removeUser(userId: string) {
    if (selectedSite) {
      await fetch(`/api/sites/${selectedSite}/users/${userId}`, {
        method: "DELETE",
      });
    }
  }
</script>

<div class="p-4 bg-gray-800 rounded-lg">
  <h2 class="text-lg font-bold">Users in Site</h2>
  <ul class="space-y-2">
    {#each users as user}
      <li class="flex justify-between p-2 bg-gray-700 rounded-md">
        <span>{user.name}</span>
        <button onclick={() => removeUser(user.id)} class="text-red-500"
          >Remove</button
        >
      </li>
    {/each}
  </ul>
</div>
