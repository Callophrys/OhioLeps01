<script lang="ts">
  import { Modal } from "@skeletonlabs/skeleton";
  import SiteUsers from "$lib/components/admin/SiteUsers.svelte";
  import { getContext } from "svelte";
  import { SiteContextKey } from "$lib/context";

  let { selectedSite } = getContext(SiteContextKey);
</script>

<Modal bind:open={selectedSite} on:close={() => (selectedSite = 0)}>
  <div class="p-4">
    <h2 class="text-xl font-bold">Manage Users</h2>
    <SiteUsers />
  </div>
</Modal>
