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

  export async function updateSiteUser(
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

      await userObj.loadUserSets(siteId);
    }
  }

  export async function removeSiteUser(siteId: number, userId: string) {
    console.log("Removing");
    if (siteId > 0) {
      await fetch(`/admin/siteuser/${siteId}/${userId}`, {
        method: "DELETE",
      });

      await userObj.loadUserSets(siteId);
    }
  }
</script>

<div>
  <div>Included Users {siteId}</div>
  <ul class="list">
    {#each users as user}
      <li class="flex justify-between p-2 bg-gray-700 rounded-md">
        <SlideToggle
          name={`toggle_s_${user.id}`}
          size="sm"
          on:click={async () => await updateSiteUser(siteId, user.id, "S")}
        ></SlideToggle>
        <SlideToggle
          name={`toggle_r_${user.id}`}
          size="sm"
          on:click={async () => await updateSiteUser(siteId, user.id, "R")}
        ></SlideToggle>
        <SlideToggle
          name={`toggle_u_${user.id}`}
          size="sm"
          on:click={async () => await updateSiteUser(siteId, user.id, "U")}
        ></SlideToggle>
        <SlideToggle
          name={`toggle_v_${user.id}`}
          size="sm"
          on:click={async () => await updateSiteUser(siteId, user.id, "V")}
        ></SlideToggle>
        <SlideToggle
          name={`toggle_x_${user.id}`}
          size="sm"
          on:click={async () => await updateSiteUser(siteId, user.id, "X")}
        ></SlideToggle>
        <span>{user.role.name}</span>
        <span>{user.firstLast}</span>
        <button
          onclick={async () => await removeSiteUser(siteId, user.id)}
          class="text-red-500">X</button
        >
        <span>
          {user.siteUsers[0].privilege}
        </span>
      </li>
    {/each}
  </ul>
</div>
