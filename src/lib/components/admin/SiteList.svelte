<script lang="ts">
  import { getContext } from "svelte";
  import { SiteContextKey } from "$lib/context";
  import type { Site } from "@prisma/client";

  console.log("inside SiteList component", SiteContextKey);

  let sites: Site[] = $state([]);

  console.log("get context");
  const context: any | null = getContext(SiteContextKey);
  console.log("context", context);
  if (!context) console.log("context is undefined");
  let selectedSite = $state(context?.selectedSite);
  console.log(getContext("x"));
  console.log(getContext("y"));
  console.log(getContext("z"));

  async function fetchSites() {
    console.log("in fetchSites");
    const res = await fetch("/admin/site");
    const data = await res.json();
    return data.sites;
  }

  async function loadSites() {
    console.log("in loadSites");
    sites = await fetchSites();
  }

  $effect(async () => {
    console.log("selected site change", selectedSite);
    await loadSites();
  });
</script>

<ul class="space-y-2">
  {#each sites as site}
    <li class="p-4 bg-gray-800 rounded-lg cursor-pointer">
      <button
        onclick={() => {
          console.log("clicked", site.id, site.siteName, selectedSite);
          selectedSite = site.id;
          console.log(" >> ", selectedSite);
        }}
      >
        {site.id} -
        {site.siteName}
      </button>
    </li>
  {/each}
</ul>
