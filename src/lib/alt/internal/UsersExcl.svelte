<script lang="ts">
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import { getContext } from "svelte";
  import { loadUserSets } from "$lib/alt/internal/SiteUserMethods";

  const context = getContext("usersContext");
  console.log("UsersExcl usersContext", context);

  let siteId = $derived.by(() => context.siteId);

  let users = $derived.by(() => {
    console.log("Excluded users", context.excludedUsers);
    return context.excludedUsers;
  });

  async function createSiteUser(
    siteId: number,
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

      await loadUserSets(context);
    }
  }

  function getDefaultPrivilege(role: string) {
    switch (role) {
      case "SUPER":
        return "S";
      case "REVIEWER":
        return "R";
      case "ENTRY":
        return "E";
      case "USER":
        return "V";
      default:
        throw "User role unknown.";
    }
  }
</script>

<div class="w-56 pl-2">
  <div class="h-12">Candidate Users</div>
  <ul class="list">
    {#each users as user}
      <li class="flex justify-between p-2 bg-gray-700 rounded-md">
        <button
          onclick={async () =>
            await createSiteUser(
              siteId,
              user.id,
              getDefaultPrivilege(user.role.name),
            )}
          class="text-red-500">+ {user.firstLast}</button
        >
        <!-- <div class="flex flex-row"> -->
        <!--   <div>{user.name}</div> -->
        <!--   <div>{user.lastFirst}</div> -->
        <!-- </div> -->
      </li>
    {/each}
  </ul>
</div>
