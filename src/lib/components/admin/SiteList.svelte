<script lang="ts">
  import { getContext } from "svelte";
  import { getSites } from "$lib/database/sites";
  import { SiteContextKey } from "$lib/context";

  type Site = { id: string; name: string };

  let sites: Site[] = $state([]);
  let { selectedSite } = getContext(SiteContextKey);

  async function fetchSites() {
    sites = await getSites();
    // const res = await fetch("/api/organizations");
    // sites = await res.json();
  }

  $effect(async () => await fetchSites());
</script>

<ul class="space-y-2">
  {#each sites as site}
    <li class="p-4 bg-gray-800 rounded-lg cursor-pointer">
      <button onclick={() => (selectedSite = site.id)}>
        {site.name}
      </button>
    </li>
  {/each}
</ul>
