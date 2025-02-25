<script lang="ts">
  /* TODO Added overall control isDisabled or something for when there is no data or just want it off */
  /*-- Imports */
  import type { Site } from "@prisma/client";
  import type { SiteDateYearSiteDates } from "$lib/types.js";
  import type { Snippet } from "svelte";
  import type { PopupSettings } from "@skeletonlabs/skeleton";
  import type { CssClasses } from "@skeletonlabs/skeleton";
  import { goto } from "$app/navigation";
  import { popup, ListBox, ListBoxItem } from "@skeletonlabs/skeleton";
  import { getContext } from "svelte";

  /*-- -- Data -- */
  /*-- Exports */
  let {
    currentCountyId = $bindable(),
    currentSiteId = $bindable(),
    currentSiteDateId = $bindable(),
    filterByCounty = $bindable(false),
    dropdownPointers = true,
    heading,
    controlOuter = "",
    controlBody = "",
    buttonLeft = "",
    buttonCenter = "",
    buttonRight = "",
    scriptCenter = "",
    suffixCenter = "",
    popupInner = "",
    popupStyles = "",
    labelledby = "Select site-date",
  }: {
    currentCountyId: number;
    currentSiteId: number;
    currentSiteDateId: number;
    filterByCounty: boolean;
    dropdownPointers: boolean;
    heading: Snippet | null;
    controlOuter: CssClasses;
    controlBody: CssClasses;
    buttonLeft: CssClasses;
    buttonCenter: CssClasses;
    buttonRight: CssClasses;
    scriptCenter: CssClasses;
    suffixCenter: CssClasses;
    popupInner: CssClasses;
    popupStyles: string;
    labelledby: string;
  } = $props();

  /** Show down arrow with year and week labels to indicate dropdown.  Default: true */
  buttonCenter = dropdownPointers ? "w-20" : "w-16";
  suffixCenter = dropdownPointers ? "before:content-['↓']" : "";

  /*-- Context */
  const allSites: Site[] = getContext("sites") ?? [];
  const siteDates: SiteDateYearSiteDates[] = $state(
    getContext("siteDates") ?? [],
  );
  // console.log(allSites[0]);
  //$inspect(allSites);

  /*-- -- Styling -- */
  /*-- Properties (styles) */

  // Properties (a11y)
  /** Provide the ARIA labelledby value.  Default: "Select site-date" */

  /*-- Constants (styles) */
  const cControlOuter = "block lg:flex lg:flex-row gap-0 md:gap-1 lg:gap-2";
  const cControlBody = "btn-group variant-soft my-auto";
  const cButtonLeft = "";
  const cButtonCenter = "w-32 md:w-44 lg:w-56 xl:w-64";
  const cButtonRight = "";
  const cScriptCenter =
    "w-full text-left truncate overflow-hidden text-ellipsis";
  const cPopupInner = "card w-48 shadow-xl py-2 overflow-y-auto";
  const cPopupStyles = "max-height: calc(100vh - 272px);";

  /*-- Reactives (styles) */
  let classesControlOuter = $derived(`${cControlOuter} ${controlOuter}`); // } ${$$props.class ?? ''}`;
  let classesControlBody = $derived(`${cControlBody} ${controlBody}`); // } ${$$props.class ?? ''}`;
  let classesButtonLeft = $derived(`${cButtonLeft} ${buttonLeft}`); // } ${$$props.class ?? ''}`;
  let classesButtonCenter = $derived(`${cButtonCenter} ${buttonCenter}`); // } ${$$props.class ?? ''}`;
  let classesButtonRight = $derived(`${cButtonRight} ${buttonRight}`); // } ${$$props.class ?? ''}`;
  // let classesPrefixCenter = $derived(`${cPrefixCenter} ${prefixCenter}`); // } ${$$props.class ?? ''}`;
  let classesScriptCenter = $derived(`${cScriptCenter} ${scriptCenter}`); // } ${$$props.class ?? ''}`;
  // let classesSuffixCenter = $derived(`${cSuffixCenter} ${suffixCenter}`); // } ${$$props.class ?? ''}`;
  let classesPopupInner = $derived(`${cPopupInner} ${popupInner}`); // } ${$$props.class ?? ''}`;
  let stylesPopup = $derived(`${cPopupStyles} ${popupStyles}`); // } ${$$props.style ?? ''}`;

  /*-- -- Coding -- */
  /*-- Enums */
  /*-- Constants (functional) */
  const popupSites: PopupSettings = {
    event: "focus-click",
    target: "popupSites",
    placement: "bottom",
    closeQuery: ".listbox-item",
  };

  /*-- Properties (functional) */

  /*-- Variables and objects */
  /*-- Run first stuff */
  /*-- onMount, beforeUpdate, afterUpdate */
  /*-- Handlers */
  function handleSelect() {
    if (filteredSitesIndex > -1) {
      let index = filteredSitesIndex;
      updateCurrentIds(index);
      pickerGoto();
    }
  }

  // TODO: Implement ability to hand sitedate
  function handlePrev() {
    if (filteredSitesIndex > 0) {
      let index = filteredSitesIndex - 1;
      updateCurrentIds(index);
      pickerGoto();
    }
  }

  // TODO: Implement ability to hand sitedate
  function handleNext() {
    if (filteredSitesIndex < filteredSites.length - 1) {
      let index = filteredSitesIndex + 1;
      updateCurrentIds(index);
      pickerGoto();
    }
  }

  /*-- Methods */
  function updateCurrentIds(index: number) {
    currentCountyId = filteredSites[index].countyId;
    currentSiteId = filteredSites[index].id;
    let sd = siteDates.find((x) => x.siteId === currentSiteId);
    if (sd) currentSiteDateId = sd.id;
  }

  function pickerGoto() {
    if (location.toString().toLowerCase().includes("api/site/")) {
      goto(`/api/site/${currentSiteId}`);
    } else {
      let targetUrl =
        currentSiteDateId === -1
          ? `/api/sitedate/${currentSiteId}`
          : `/api/sitedate/${currentSiteId}/${currentSiteDateId}`;
      goto(targetUrl);
    }
  }

  /*-- Reactives (functional) */
  let filteredSites = $derived(
    filterByCounty
      ? allSites.filter((s: any) => s.countyId === currentSite?.countyId)
      : allSites,
  );
  let filteredSitesIndex = $derived(
    filteredSites.findIndex((s: any) => s.id === currentSiteId),
  );
  let currentSite = $derived(allSites.find((x) => x.id === currentSiteId));
  let prevDisabled = $derived(filteredSitesIndex < 1);
  let nextDisabled = $derived(filteredSitesIndex > filteredSites.length - 2);
  //$inspect(currentSite);
</script>

<!-- TODO: add help tooltip to show this is filtered and maybe an option of all and/or unfiltered -->
<div class={classesControlOuter}>
  {#if heading}
    <div class="my-auto">
      {@render heading()}
    </div>
  {/if}
  <div class={classesControlBody} aria-labelledby={labelledby}>
    <button
      type="button"
      class={classesButtonLeft}
      onclick={handlePrev}
      disabled={prevDisabled}>◀</button
    >
    <button
      type="button"
      class={classesButtonCenter}
      use:popup={popupSites}
      title={currentSite?.siteName}
    >
      <span class={classesScriptCenter}>
        {currentSite?.siteName}
      </span>
      <span>↓</span>
    </button>
    <button
      type="button"
      class={classesButtonRight}
      onclick={handleNext}
      disabled={nextDisabled}>▶</button
    >
  </div>
</div>

<div data-popup="popupSites">
  <div class={classesPopupInner} style={stylesPopup}>
    <ListBox rounded="rounded-none">
      {#each filteredSites as site}
        <ListBoxItem
          bind:group={currentSiteId}
          name="sites"
          on:change={handleSelect}
          value={site.id}
        >
          {site.siteName}
        </ListBoxItem>
      {/each}
    </ListBox>
  </div>
</div>
