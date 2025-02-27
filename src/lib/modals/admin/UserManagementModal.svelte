<script lang="ts">
  import { Modal } from "@skeletonlabs/skeleton";
  import SiteUsers from "$lib/components/admin/SiteUsers.svelte";
  // import { siteStoreContext } from "$lib/stores/admin/siteStore";
  import { getContext, setContext } from "svelte";

  const siteContext = siteStoreContext();
</script>

<Modal
  bind:open={siteContext.selectedSite}
  on:close={() => siteContext.selectedSite.set(null)}
>
  <div class="p-4">
    <h2 class="text-xl font-bold">Manage Users</h2>
    <SiteUsers />
  </div>
</Modal>
