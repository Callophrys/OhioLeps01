<script lang="ts">
  /*-- Imports */
  import DataOptions from "$lib/components/datanavigation/DataOptions.svelte";
  import SiteDate from "$lib/components/pages/SiteDate.svelte";
  import SiteDateObservations from "$lib/components/pages/SiteDateObservations.svelte";
  import FlexContainer from "$lib/components/FlexContainer.svelte";
  import YearWeek from "$lib/components/datanavigation/YearWeek.svelte";
  import {
    formatDate,
    weekOfYearSince,
    convertFtoC,
    convertMphToKm,
    isRecent,
    decodeWeather,
  } from "$lib/utils";
  import { setContext } from "svelte";

  let element: HTMLElement | undefined;
  /*-- -- Data -- */
  /*-- Exports */
  let {
    data,
    recordYear = $bindable(new Date().getUTCFullYear()),
    recordWeek = $bindable(new Date().getUTCFullYear()),
    recordSdoCount = $bindable(0),
  }: {
    data: any;
    recordYear: number;
    recordWeek: number;
    recordSdoCount: number;
  } = $props();

  setContext("sites", data.sites);
  setContext("siteDates", data.siteDates);
  setContext("checklistsSiteDateObs", data.checklistsSiteDateObs);
  setContext("checklistsSite", data.checklistsSite);
  setContext("checklistsAll", data.checklistsAll);

  let showRecentEdits = $state(false);
  let showDeletedData = $state(false);
</script>

{#snippet outerPane()}
  <YearWeek year={recordYear} week={recordWeek} sdoCount={recordSdoCount} />
  <DataOptions
    bind:showRecentEdits
    bind:showDeletedData
    showMultipleRows={false}
    showMyDataOnly={false}
    showUnreviewedOnly={false}
    isEditing={false}
  />
{/snippet}

{#snippet leftPane()}
  <SiteDate {data} bind:showRecentEdits bind:showDeletedData />
{/snippet}

{#snippet centerPane()}
  <SiteDateObservations
    data={data.sdoData}
    siteDate={data.siteDate}
    checklistSiteDateObs={data.checklistSiteDateObs}
  />
{/snippet}

<FlexContainer {outerPane} {leftPane} {centerPane} />
