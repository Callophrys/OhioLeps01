<script lang="ts">
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import { getContext } from "svelte";
  import { loadUserSets } from "$lib/alt/internal/SiteUserMethods";

  const context = getContext("usersContext");
  console.log("UsersIncl usersContext", context);

  let siteId = $derived.by(() => context.siteId);

  let users = $derived.by(() => {
    console.log("Included users", context.includedUsers);
    return context.includedUsers ?? [];
  });

  async function updateSiteUser(
    siteId: number,
    userId: string,
    privilege: string,
  ) {
    console.log("Updating privilege");
    if (siteId > 0) {
      const fd = new FormData();
      fd.append("privilege", privilege);

      await fetch(`/admin/siteuser/${siteId}/${userId}`, {
        method: "PUT",
        body: fd,
      });

      await loadUserSets(context);
    }
  }

  export async function removeSiteUser(siteId: number, userId: string) {
    console.log("Removing");
    if (siteId > 0) {
      await fetch(`/admin/siteuser/${siteId}/${userId}`, {
        method: "DELETE",
      });

      await loadUserSets(context);
    }
  }

  function getPrivilegeName(priv: string) {
    switch (priv) {
      case "V":
        return "View/Run reports";
      case "E":
        return "Data entry";
      case "R":
        return "Review/Sign off data";
      case "S":
        return "Super user";
      default:
        return "Default/Fall back to user's role";
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
          <SlideToggle
            name={`toggle_s_${user.id}`}
            size="sm"
            checked={user.siteUsers.length > 0
              ? user.siteUsers[0].privilege === "S"
              : false}
            on:click={async () => await updateSiteUser(siteId, user.id, "S")}
          ></SlideToggle>
          <SlideToggle
            name={`toggle_r_${user.id}`}
            size="sm"
            checked={user.siteUsers.length > 0
              ? user.siteUsers[0].privilege === "R"
              : false}
            on:click={async () => await updateSiteUser(siteId, user.id, "R")}
          ></SlideToggle>
          <SlideToggle
            name={`toggle_u_${user.id}`}
            size="sm"
            checked={user.siteUsers.length > 0
              ? user.siteUsers[0].privilege === "E"
              : false}
            on:click={async () => await updateSiteUser(siteId, user.id, "E")}
          ></SlideToggle>
          <SlideToggle
            name={`toggle_v_${user.id}`}
            size="sm"
            checked={user.siteUsers.length > 0
              ? user.siteUsers[0].privilege === "V"
              : false}
            on:click={async () => await updateSiteUser(siteId, user.id, "V")}
          ></SlideToggle>
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
