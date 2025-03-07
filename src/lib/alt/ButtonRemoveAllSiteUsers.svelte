<script lang="ts">
  import { selectedSiteState } from "$lib/alt/internal/selectedSiteState.svelte.ts";
  import { removeAllSiteUsers } from "$lib/alt/internal/SiteUserMethods.ts";

  // let { reloadUsers = $bindable() } = $props();
  //
  // if (reloadUsers) await reloadUsers(siteId);
</script>

<button
  type="button"
  class="btn variant-filled"
  onclick={async () => await removeAllSiteUsers(selectedSiteState.selectedSite)}
  >Remove all</button
>
