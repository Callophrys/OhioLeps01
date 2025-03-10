<script lang="ts">
  import { getContext } from "svelte";
  import { loadUserSets } from "$lib/alt/internal/SiteUserMethods";
  import SiteUserToggle from "./SiteUserToggle.svelte";

  const context = getContext("usersContext");
  console.log("UsersIncl usersContext", context);

  let siteId = $derived.by(() => context.siteId);

  let users = $derived.by(() => {
    console.log("Included users", context.includedUsers);
    return context.includedUsers ?? [];
  });

  export async function removeSiteUser(siteId: number, userId: string) {
    console.log("Removing");
    if (siteId > 0) {
      await fetch(`/admin/siteuser/${siteId}/${userId}`, {
        method: "DELETE",
      });

      await loadUserSets(context);
    }
  }
</script>

<div class="pl-2">
  <!-- <div class="h-12"> -->
  <!-- </div> -->
  <div class="flex flex-row justify-between">
    <div>Site Users</div>
    <div>total: {users.length}</div>
  </div>
  <div class="flex flex-row space-x-2">
    <span class="w-6">Del</span>
    <span class="w-12">Super</span>
    <span class="w-12">Review</span>
    <span class="w-12">Entry</span>
    <span class="w-12">View</span>
  </div>
  <ul class="list">
    {#each users as user}
      <li class="flex justify-between p-2 bg-gray-700 rounded-md">
        <div class="flex flex-row space-x-2">
          <button
            onclick={async () => await removeSiteUser(siteId, user.id)}
            class="text-red-500">X</button
          >
          <SiteUserToggle {user} {siteId} privilege="S" />
          <SiteUserToggle {user} {siteId} privilege="A" />
          <SiteUserToggle {user} {siteId} privilege="R" />
          <SiteUserToggle {user} {siteId} privilege="E" />
          <SiteUserToggle {user} {siteId} privilege="V" />
        </div>
        <div class="flex flex-row space-x-2">
          <span>{user.role.name}</span>
          <span>{user.firstLast}</span>
          <span>
            {user.siteUsers.length > 0 ? user.siteUsers[0].privilege : "_"}
          </span>
        </div>
      </li>
    {/each}
  </ul>
</div>
