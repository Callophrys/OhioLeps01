<script lang="ts">
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import { getContext } from "svelte";

  let { userObj } = $props();

  const context = getContext("selectedSiteState");

  let siteId = $derived.by(() => context.selectedSite);

  let users = $derived.by(() => {
    console.log("userSet", userObj.users);
    return userObj.users;
  });

  async function createSiteUser(
    siteId: int,
    userId: string,
    privilege: string,
  ) {
    console.log("Adding");

    if (siteId > 0) {
      const fd = new FormData();
      fd.append("siteId", siteId);
      fd.append("userId", userId);
      fd.append("privilege", privilege);

      await fetch(`/admin/siteuser`, {
        method: "POST",
        body: fd,
      });

      await userObj.loadUserSets(siteId);
    }
  }
</script>

<div class="w-72">
  <div>Candidate Users ({siteId})</div>
  <ul class="list">
    {#each users as user}
      <li class="flex justify-between p-2 bg-gray-700 rounded-md">
        <button
          onclick={async () => await createSiteUser(siteId, user.id, "V")}
          class="text-red-500">Add {user.firstLast}</button
        >
        <span>{user.name}</span>
      </li>
    {/each}
  </ul>
</div>
