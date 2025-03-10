<script lang="ts">
  import { GOTYPE } from "$lib/types.js";
  import type { ModalSettings, ModalComponent } from "@skeletonlabs/skeleton";
  import type { SiteDateYear } from "$lib/types.js";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import DataOptions from "$lib/components/datanavigation/DataOptions.svelte";
  import Container from "$lib/components/layouts/Container.svelte";
  import SiteDate from "$lib/components/pages/SiteDate.svelte";
  import SiteDateObservations from "$lib/components/pages/SiteDateObservations.svelte";
  import FlexContainer from "$lib/components/FlexContainer.svelte";
  import GoBack from "$lib/components/datanavigation/GoBack.svelte";
  import GoNext from "$lib/components/datanavigation/GoNext.svelte";
  import MemoryToggle from "$lib/components/data/MemoryToggle.svelte";
  import ModalSiteDate from "$lib/components/ModalSiteDate.svelte";
  import ModalSiteDateObservation from "$lib/components/ModalSiteDateObservation.svelte";
  // import SiteDatePicker from "$lib/components/datanavigation/SiteDatePicker.svelte";
  import { getModalStore } from "@skeletonlabs/skeleton";
  import { goto } from "$app/navigation";
  import {
    formatDate,
    weekOfYearSince,
    convertFtoC,
    convertMphToKm,
    isRecent,
    decodeWeather,
  } from "$lib/utils";

  let {
    data,
    showRecentEdits = $bindable(false),
    showDeletedData = $bindable(false),
  }: {
    data: any;
    showRecentEdits: boolean;
    showDeletedData: boolean;
  } = $props();

  let siteDate: SiteDateYearSdo = data.siteDate;

  let useFarenheit: string = $state("F");
  const temperatureSetting = "useFarenheit";
  const temperatureUnits = { F: "&deg;F", C: "&deg;C" };
  let temperatureStart = $derived(
    useFarenheit === "F"
      ? data.siteDate.startTemp
      : convertFtoC(data.siteDate.startTemp),
  );
  let temperatureEnd = $derived(
    useFarenheit === "F"
      ? data.siteDate.endTemp
      : convertFtoC(data.siteDate.endTemp),
  );
  let temperatureUnit = $derived(
    new Map(Object.entries(temperatureUnits)).get(useFarenheit),
  );

  let useMph: string = $state("M");
  const windSetting = "useMph";
  const windUnits = { M: "Mph", K: "Kmph" };
  let windStart = $derived(
    useMph === "M"
      ? data.siteDate.startWindMPH
      : convertMphToKm(data.siteDate.startWindMPH),
  );
  let windEnd = $derived(
    useMph === "M"
      ? data.siteDate.endWindMPH
      : convertMphToKm(data.siteDate.endWindMPH),
  );
  let windUnit = $derived(new Map(Object.entries(windUnits)).get(useMph));

  // Accordian open-close defaults
  let accA: boolean = $state(false);
  let accB: boolean = $state(false);
  let accC: boolean = $state(false);
  let accD: boolean = $state(false);
  let accE: boolean = $state(false);
  let accF: boolean = $state(false);
  let accG: boolean = $state(false);
  let accH: boolean = $state(false);
  let accI: boolean = $state(false);
  let accJ: boolean = $state(false);

  /*-- Context */

  /*-- -- Styling -- */
  /*-- Properties (styles) */
  /*-- Constants (styles) */
  const cClassesObservation = "card flex";

  /*-- Variables (styles) */
  /*-- Reactives (styles) */
  /*-- -- Coding -- */
  /*-- Enums */
  /*-- Constants (functional) */
  /*-- Properties (functional) */
  let isEditing = $state(false);

  // Accordian open-close actual states for function and also for local storage
  let optAccA: boolean = $state(false);
  let optAccB: boolean = $state(false);
  let optAccC: boolean = $state(false);
  let optAccD: boolean = $state(false);
  let optAccE: boolean = $state(false);
  let optAccF: boolean = $state(false);
  let optAccG: boolean = $state(false);
  let optAccH: boolean = $state(false);
  let optAccI: boolean = $state(false);
  let optAccJ: boolean = $state(false);

  /*-- Variables and objects */

  /*-- Run first stuff */
  const modalStore = getModalStore();
  let siteId = data.siteDate.siteId;
  // console.log('sd', data.siteDate);
  // console.log('sd ##', data.siteDates);
  // console.log(data.siteDateSiteDates);
  // console.log(uniqueYears);
  // console.log(trackedWeeks);
  // console.log(data.siteDateObservations[0]);

  /*-- onMount, beforeUpdate, afterUpdate */
  $effect(() => {
    let x: string;

    // Obtain Accordian open-close states from local storage
    x = localStorage?.optAccA;
    optAccA = x ? x === "true" : accA;
    x = localStorage?.optAccB;
    optAccB = x ? x === "true" : accB;
    x = localStorage?.optAccC;
    optAccC = x ? x === "true" : accC;
    x = localStorage?.optAccD;
    optAccD = x ? x === "true" : accD;
    x = localStorage?.optAccE;
    optAccE = x ? x === "true" : accE;
    x = localStorage?.optAccF;
    optAccF = x ? x === "true" : accF;
    x = localStorage?.optAccG;
    optAccG = x ? x === "true" : accG;
    x = localStorage?.optAccH;
    optAccH = x ? x === "true" : accH;
    x = localStorage?.optAccI;
    optAccI = x ? x === "true" : accI;
    x = localStorage?.optAccJ;
    optAccJ = x ? x === "true" : accJ;

    x = localStorage?.showRecentEdits;
    if (x && x.length) {
      showRecentEdits = x === "1";
    }

    x = localStorage?.showDeletedData;
    if (x && x.length) {
      showDeletedData = x === "1";
    }
  });

  $effect(() => {
    // Store Accordian open-close states to local storage
    localStorage.setItem("optAccA", optAccA.toString());
    localStorage.setItem("optAccB", optAccB.toString());
    localStorage.setItem("optAccC", optAccC.toString());
    localStorage.setItem("optAccD", optAccD.toString());
    localStorage.setItem("optAccE", optAccE.toString());
    localStorage.setItem("optAccF", optAccF.toString());
    localStorage.setItem("optAccG", optAccG.toString());
    localStorage.setItem("optAccH", optAccH.toString());
    localStorage.setItem("optAccI", optAccI.toString());
    localStorage.setItem("optAccJ", optAccJ.toString());

    localStorage.setItem("showRecentEdits", showRecentEdits ? "1" : "0");
    localStorage.setItem("showDeletedData", showDeletedData ? "1" : "0");
  });

  /*-- Handlers */
  /*-- Methods */
  let inUse = $derived(
    data.siteDateObservations
      .filter((x: any) => !x.isDeleted)
      .map((x: any) => x.checklistId),
  );
  let availableChecklistItems = $derived(
    data.checklistsAll.filter((x: any) => !inUse.includes(x.checklistId)),
  );

  function modalComponentSiteDate(
    isNewRecord: boolean,
    unitTemp: string,
    unitSpeed: string,
    siteDate: SiteDateYear | null,
    siteId: number,
  ): void {
    const c: ModalComponent = { ref: ModalSiteDate };
    console.log(
      data.siteDate.recordDate,
      formatDate(data.siteDate.recordDate),
      formatDate(new Date(data.siteDate.recordDate).toISOString()),
      data.siteDate.id,
      currentSiteDateId,
    );
    const componentTitle = isNewRecord
      ? "Add New Date Record"
      : `Edit Date Record - ${formatDate(new Date(data.siteDate.recordDate).toISOString())}, ${recordDate}`;
    const componentUrl = isNewRecord ? "?/createSiteDate" : "?/updateSiteDate";
    const componentValues = isNewRecord
      ? {
          siteId: siteId,
          siteDate: null,
          useMph: unitSpeed,
          useFarenheit: unitTemp,
          isNewRecord: isNewRecord,
        }
      : {
          siteId: siteId,
          siteDate: siteDate,
          useMph: unitSpeed,
          useFarenheit: unitTemp,
          isNewRecord: isNewRecord,
        };
    const modal: ModalSettings = {
      type: "component",
      component: c,
      title: componentTitle,
      body: "Complete the form below and then press submit.",
      value: componentValues,
      response: (r) => {
        if (typeof r === "object") {
          const formData = new FormData();
          for (const [k, v] of Object.entries(r) as [string, any])
            formData.append(k, v);

          fetch(componentUrl, {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status === 200) {
                const rdata = JSON.parse(data.data);
                console.log("rdata:", rdata);
                let siteDateId = rdata[rdata[0].id];
                //TODO: Assure that SiteDatePicker updates.  The following goto + invalidateAll does
                // not accomplish it.  Thought that udpating the bound currentSiteDateId would cause
                // the SiteDatePicker to update itself.  Hmmm.
                //currentSiteDateId = siteDateId;
                //NOTE: verified that invalidateAll assure that browsed for data renders after update
                goto(`/api/sitedate/${siteId}/${siteDateId}`, {
                  invalidateAll: true,
                });
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      },
    };
    modalStore.trigger(modal);
  }

  /*-- Reactives (functional) */
  let recordDate: string = $derived(
    formatDate(
      new Date(data.siteDate.recordDate).toISOString(),
      "short",
      undefined,
    ),
  );

  let recordYear: number = $derived(
    new Date(data.siteDate.recordDate).getFullYear(),
  );

  let recordWeek: number | null = $derived(
    weekOfYearSince(new Date(data.siteDate.recordDate)),
  );

  let recordSdoCount: number = $derived(
    data.siteDate.siteDateObservations.filter(
      (o: any) => showDeletedData || !o.deleted,
    ).length,
  );

  let currentSiteId: number = $state(data.siteDate.id);
  // $inspect(currentSiteId);

  let firstSdoId = $derived(
    recordSdoCount > 0 ? data.siteDate.siteDateObservations[0].id : -1,
  );

  // let startTemp = $derived(String(data.siteDate.startTemp));
  // let endTemp = $derived(String(data.siteDate.endTemp));

  // $inspect(showRecentEdits);
  // $inspect(showDeletedData);

  /*-- Other */
  let currentSiteDateId = $state(data.siteDate.id);
  // $inspect(currentSiteDateId);

  // console.log(data.siteDate);
  //

  let collapseAll = $state(false); // TODO: save this
  function setAccordionItemAll(open: boolean) {
    collapseAll = !open;
    optAccA = open;
    optAccB = open;
    optAccC = open;
    optAccD = open;
    optAccE = open;
    optAccF = open;
    optAccG = open;
    optAccH = open;
    optAccI = open;
    optAccJ = open;
  }
</script>

{#snippet clHead()}
  <h2 class="flex flex-row justify-between pb-2">
    <div class="overflow-hidden text-ellipsis text-nowrap w-80">
      {data.siteDate.siteName}
    </div>
    <div class="flex flex-row">
      <button
        type="button"
        class="btn variant-soft scale-90 translate-x-2"
        onclick={() =>
          modalComponentSiteDate(
            false,
            useMph,
            useFarenheit,
            data.siteDate,
            currentSiteId,
          )}
        title="Edit current date record"
      >
        <span
          class="text-green-700 dark:text-green-400 text-xl before:content-['✚']"
        ></span>
        <span>Edit</span>
      </button>
      <button
        type="button"
        class="btn variant-soft scale-90 translate-x-2"
        onclick={() =>
          modalComponentSiteDate(
            true,
            useMph,
            useFarenheit,
            null,
            currentSiteId,
          )}
        title="Add new date record for observations"
      >
        <span
          class="text-green-700 dark:text-green-400 text-xl before:content-['✚']"
        ></span>
        <span>Add</span>
      </button>
    </div>
  </h2>
  <hr />
{/snippet}
{#snippet clBody()}
  <div class="flex flex-row justify-between">
    <div class="flex mb-2">
      <!-- TODO: temporary hack pleasedo this correctly -->
      {#if !collapseAll}
        <button
          class="w-full px-1 cursor-pointer hover:animate-pulse"
          onclick={() => setAccordionItemAll(collapseAll)}
          aria-labelledby=" "
          type="button"
          title="Collapse all"
        >
          <div
            class="fill-current w-3 transition-tranform duration-[200mx] rotate-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
              ></path>
            </svg>
          </div>
        </button>
      {:else}
        <button
          class="bg-slate-200-800 text-white px-1 py-1 rounded cursor-pointer hover:animate-pulse"
          onclick={() => setAccordionItemAll(collapseAll)}
          aria-labelledby=" "
          type="button"
          title="Expand all"
        >
          <div
            class="fill-current w-3 transition-tranform duration-[200mx] -rotate-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
              ></path>
            </svg>
          </div>
        </button>
      {/if}
      <div class="ml-4 text-nowrap">
        Recorder: {data.siteDate.recorder}
      </div>
    </div>
    <div class="text-nowrap text-right pr-3">
      Record Date: {recordDate}
    </div>
  </div>
  <Accordion>
    <AccordionItem bind:open={optAccA}>
      <svelte:fragment slot="summary">Times</svelte:fragment>
      <svelte:fragment slot="content">
        <div class="pl-4 flex flex-row">
          <span class="basis-20 text-nowrap text-right">Start Time:</span>
          <span class="pl-2 w-24 text-right">
            {data.siteDate.startTime
              ? formatDate(
                  new Date(data.siteDate.startTime).toISOString(),
                  undefined,
                  "short",
                )
              : ""}
          </span>
        </div>
        <div class="pl-4 flex flex-row">
          <span class="basis-20 text-nowrap text-right">End Time:</span>
          <span class="pl-2 w-24 text-right">
            {data.siteDate.endTime
              ? formatDate(
                  new Date(data.siteDate.endTime).toISOString(),
                  undefined,
                  "short",
                )
              : ""}
          </span>
        </div>
      </svelte:fragment>
    </AccordionItem>
    <AccordionItem id="ftoc" bind:open={optAccB}>
      <svelte:fragment slot="summary">
        <div class="flex space-x-4">
          <span class="my-auto">Temperature</span>
          <MemoryToggle
            bind:toggleItem={useFarenheit}
            toggleName={temperatureSetting}
            toggleList={temperatureUnits}
            isHidden={!optAccB}
          ></MemoryToggle>
        </div>
      </svelte:fragment>
      <svelte:fragment slot="content">
        <div class="pl-4">
          Start Temp: {temperatureStart}
          {@html temperatureUnit}
        </div>
        <div class="pl-4">
          End Temp: {temperatureEnd}
          {@html temperatureUnit}
        </div>
      </svelte:fragment>
    </AccordionItem>
    <AccordionItem bind:open={optAccC}>
      <svelte:fragment slot="summary">Cloud cover (&percnt;)</svelte:fragment>
      <svelte:fragment slot="content">
        <div class="pl-4">
          Start Clouds: {data.siteDate.startClouds}
        </div>
        <div class="pl-4">
          End Clouds: {data.siteDate.endClouds}
        </div></svelte:fragment
      >
    </AccordionItem>
    <AccordionItem bind:open={optAccD}>
      <svelte:fragment slot="summary">
        <div class="flex space-x-4">
          <span class="my-auto">Wind</span>
          <MemoryToggle
            bind:toggleItem={useMph}
            toggleName={windSetting}
            toggleList={windUnits}
            isHidden={!optAccD}
          ></MemoryToggle>
        </div>
      </svelte:fragment>
      <svelte:fragment slot="content">
        <div class="pl-4">
          Start Wind Dir: {data.siteDate.startWindDir}
        </div>
        <div class="pl-4">
          End Wind Dir: {data.siteDate.endWindDir}
        </div>
        <div class="pl-4">
          Start Wind: {windStart} ({windUnit})
        </div>
        <div class="pl-4">
          End Wind: {windEnd} ({windUnit})
        </div></svelte:fragment
      >
    </AccordionItem>
    <AccordionItem bind:open={optAccE}>
      <svelte:fragment slot="summary">Weather</svelte:fragment>
      <svelte:fragment slot="content">
        <div class="pl-4">
          Weather 1: {decodeWeather(data.siteDate.weather1)}
        </div>
        <div class="pl-4">
          Weather 2: {decodeWeather(data.siteDate.weather2)}
        </div>
        <div class="pl-4">
          Weather 3: {decodeWeather(data.siteDate.weather3)}
        </div>
        <div class="pl-4">
          Weather 4: {decodeWeather(data.siteDate.weather4)}
        </div>
        <div class="pl-4">
          Weather 5: {decodeWeather(data.siteDate.weather5)}
        </div>
        <div class="pl-4">
          Weather 6: {decodeWeather(data.siteDate.weather6)}
        </div>
        <div class="pl-4">
          Weather 7: {decodeWeather(data.siteDate.weather7)}
        </div>
        <div class="pl-4">
          Weather 8: {decodeWeather(data.siteDate.weather8)}
        </div>
        <div class="pl-4">
          Weather 9: {decodeWeather(data.siteDate.weather9)}
        </div>
        <div class="pl-4">
          Weather 10: {decodeWeather(data.siteDate.weather10)}
        </div>
        <div class="pl-4">
          Weather 11: {decodeWeather(data.siteDate.weather11)}
        </div>
        <div class="pl-4">
          Weather 12: {decodeWeather(data.siteDate.weather12)}
        </div>
        <div class="pl-4">
          Weather 13: {decodeWeather(data.siteDate.weather13)}
        </div>
        <div class="pl-4">
          Weather 14: {decodeWeather(data.siteDate.weather14)}
        </div>
        <div class="pl-4">
          Weather 15: {decodeWeather(data.siteDate.weather15)}
        </div>
      </svelte:fragment>
    </AccordionItem>
    <AccordionItem bind:open={optAccF}>
      <svelte:fragment slot="summary">Larva food sources</svelte:fragment>
      <svelte:fragment slot="content">
        <div class="pl-4">
          larvalEnergy1: {@html data.siteDate.larvalEnergy1 ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          larvalEnergy2: {@html data.siteDate.larvalEnergy2 ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          larvalEnergy3: {@html data.siteDate.larvalEnergy3 ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          larvalEnergy4: {@html data.siteDate.larvalEnergy4 ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          larvalEnergy5: {@html data.siteDate.larvalEnergy5 ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          larvalEnergy6: {@html data.siteDate.larvalEnergy6 ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          larvalEnergy7: {@html data.siteDate.larvalEnergy7 ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          larvalEnergy8: {@html data.siteDate.larvalEnergy8 ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          larvalEnergy9: {@html data.siteDate.larvalEnergy9 ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          larvalEnergy10: {@html data.siteDate.larvalEnergy10 ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          larvalEnergy11: {@html data.siteDate.larvalEnergy11 ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          larvalEnergy12: {@html data.siteDate.larvalEnergy12 ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          larvalEnergy13: {@html data.siteDate.larvalEnergy13 ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          larvalEnergy14: {@html data.siteDate.larvalEnergy14 ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          larvalEnergy15: {@html data.siteDate.larvalEnergy15 ?? "&varnothing;"}
        </div></svelte:fragment
      >
    </AccordionItem>
    <AccordionItem bind:open={optAccG}>
      <svelte:fragment slot="summary">Larva</svelte:fragment>
      <svelte:fragment slot="content">
        <div class="pl-4">
          Larva Ob A: {@html data.siteDate.larvaObservedA ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          Larva Ob B: {@html data.siteDate.larvaObservedB ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          Larva Ob C: {@html data.siteDate.larvaObservedC ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          Larva Ob D: {@html data.siteDate.larvaObservedD ?? "&varnothing;"}
        </div></svelte:fragment
      >
    </AccordionItem>
    <AccordionItem bind:open={optAccH}>
      <svelte:fragment slot="summary">Energy/blooming</svelte:fragment>
      <svelte:fragment slot="content">
        <div class="pl-4">
          Energy Source 1: {@html data.siteDate.energySource1 ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          Energy Source 2: {@html data.siteDate.energySource2 ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          Energy Source 3: {@html data.siteDate.energySource3 ?? "&varnothing;"}
        </div>
        <div class="pl-4">
          Energy Source 4: {@html data.siteDate.energySource4 ?? "&varnothing;"}
        </div>
        <hr class="mx-4" />
        <div class="pl-4">
          Flowers in Bloom: {@html data.siteDate.flowersInBloom ??
            "&varnothing;"}
        </div>
      </svelte:fragment>
    </AccordionItem>
    <div class="pl-4">
      Field Notes: {data.siteDate.fieldNotes ?? ""}
    </div>
    <AccordionItem bind:open={optAccI}>
      <svelte:fragment slot="summary">Change history</svelte:fragment>
      <svelte:fragment slot="content">
        <div class="pl-4">
          Created By: {data.siteDate.createdBy?.lastFirst ?? ""}
        </div>
        <div class="pl-4">
          Created At: {data.siteDate.createdAt
            ? formatDate(
                new Date(data.siteDate.createdAt).toISOString(),
                "medium",
                "medium",
              )
            : ""}
        </div>
        <div class="pl-4">
          Updated By: {data.siteDate.updatedBy?.lastFirst ?? ""}
        </div>
        <div class="pl-4">
          Updated At: {data.siteDate.updatedAt ?? ""}
        </div>
        <div class="pl-4">
          Confirm By: {data.siteDate.confirmBy?.lastFirst ?? ""}
        </div>
        <div class="pl-4">
          Confirm At: {data.siteDate.confirmAt ?? ""}
        </div>
      </svelte:fragment>
    </AccordionItem>
  </Accordion>
{/snippet}

{#snippet leftPane()}{/snippet}
<Container head={clHead} body={clBody} outerBodyClasses="px-0" />
