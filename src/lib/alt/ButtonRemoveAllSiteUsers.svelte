<script lang="ts">
  import {
    removeAllSiteUsers,
    loadUserSets,
  } from "$lib/alt/internal/SiteUserMethods.ts";
  import { getContext } from "svelte";
  const context = getContext("usersContext");
</script>

<button
  type="button"
  class="btn variant-filled"
  onclick={async () => {
    await removeAllSiteUsers(context.siteId);
    await loadUserSets(context);
  }}>Remove all</button
>
