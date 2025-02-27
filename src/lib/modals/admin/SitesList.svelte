<script lang="ts">
  import type { Site } from "$lib/types";
  import { onMount } from "svelte";
  import { fetchSites } from "$lib/database/siteusers";

  export let sites: Site[] = [];
  export let selectSite: (site: Site) => void;

  onMount(async () => {
    sites = await fetchSites();
  });
</script>

<ul class="space-y-2">
  {#each sites as site}
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <li
      class="p-4 bg-gray-800 rounded-lg cursor-pointer"
      onclick={() => selectSite(site)}
    >
      {org.name}
    </li>
  {/each}
</ul>
