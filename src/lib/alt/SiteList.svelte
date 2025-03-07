<script lang="ts">
  import { getContext } from "svelte";

  let sites = getContext("sites");
  let {
    selectedSiteState,
  }: { selectedSite: number; selectedSiteName: string } = $props();

  $effect(
    () => console.log("selectedSite changed", selectedSiteState),
    // console.log("selectedSite changed", selectedSiteState.selectedSite),
  );
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
        <!-- <div class="w-fit flex flex-row border-b-2 border-b-red-100"> -->
        <!--     <div class="w-80">Site Name</div> -->
        <!--     <div class="w-36">County</div> -->
        <!--     <div class="w-24">State</div> -->
        <!--     <div class="w-80"></div> -->
        <!-- </div> -->
        <!-- {#each data.sites as site} -->
        <!--     <div class="flex flex-row space-y-1"> -->
        <!--         <div class="w-80">{site.siteName}</div> -->
        <!--         <div class="w-36">{site.county.name}</div> -->
        <!--         <div class="w-36">{site.county.state.name}</div> -->
        <!-- ... -->
      </li>
    {/each}
  </ul>
</div>
