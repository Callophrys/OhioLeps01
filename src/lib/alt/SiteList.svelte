<script lang="ts">
  import { getContext, setContext } from "svelte";

  let sites = getContext("sites");
  let {
    selectedSiteState,
  }: { selectedSite: number; selectedSiteName: string } = $props();

  $effect(
    () => console.log("selectedSite changed", selectedSiteState),
    // console.log("selectedSite changed", selectedSiteState.selectedSite),
  );
  export async function removeAllSiteUsers(siteId: number) {
    console.log("Removing");
    if (siteId > 0) {
      await fetch(`/admin/siteuser/${siteId}`, {
        method: "DELETE",
      });

      await userObj.loadUserSets(siteId);
    }
  }
</script>

<div class="">
  <div class="h-12">
    <div>Selected Site:</div>
    <div class="pl-4 contrast-more">{selectedSiteState.selectedSiteName}</div>
  </div>
  <ul class="list">
    {#each sites as site}
      <li class="flex justify-between p-2 bg-gray-700 rounded-md">
        <button
          onclick={() => {
            console.log(
              "clicked",
              site.siteName,
              typeof site.id,
              typeof selectedSiteState,
              typeof selectedSiteState.selectedSite,
            );
            selectedSiteState.selectedSiteName = site.siteName;
            selectedSiteState.selectedSite = site.id;
          }}
          aria-labelledby=" "
        >
          {site.siteName}
        </button>
      </li>
    {/each}
  </ul>
</div>
