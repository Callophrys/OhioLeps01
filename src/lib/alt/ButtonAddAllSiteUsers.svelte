<script lang="ts">
  import {
    addAllSiteUsers,
    loadUserSets,
  } from "$lib/alt/internal/SiteUserMethods.ts";
  import { getContext } from "svelte";
  const context = getContext("usersContext");
</script>

<button
  type="button"
  class="btn variant-filled"
  onclick={async () => {
    await addAllSiteUsers(context.siteId);
    await loadUserSets(context);
  }}>Add all</button
>
