<script lang="ts">
  import { getContext, setContext } from "svelte";

  let sites = getContext("sites");
  let { selectedSiteState }: { seletectSite: number } = $props();

  $effect(
    () => console.log("selectedSite changed", selectedSiteState),
    // console.log("selectedSite changed", selectedSiteState.selectedSite),
  );
</script>

<div class="w-80">
  <div>Sites - Selected {selectedSiteState.selectedSite}</div>
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
