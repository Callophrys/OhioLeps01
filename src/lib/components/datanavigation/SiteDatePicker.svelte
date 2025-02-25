<script lang="ts">
  /*-- Imports */
  import type { CssClasses, PopupSettings } from "@skeletonlabs/skeleton";
  import type {
    DateTracking,
    SiteDateYear,
    SiteDateYearSiteDates,
  } from "$lib/types.js";
  import { goto } from "$app/navigation";
  import { ListBox, ListBoxItem, popup } from "@skeletonlabs/skeleton";
  import { compareYearWeek, formatDate, weekOfYearSince } from "$lib/utils";

  /*-- -- Data -- */
  /*-- Exports */
  let {
    currentSiteId = $bindable(), // TODO make current Site id do something
    currentSiteDateId = $bindable(),

    heading = $bindable(),
    yearPrefix = $bindable(),
    weekPrefix = $bindable(),

    dropdownPointers = $bindable(true),
    dropdownShowDate = $bindable(false),

    controlOuter = "",
    controlBody = "",
    buttonLeft = "",
    buttonYear = "",
    buttonWeek = "",
    buttonRight = "",
    prefixYear = "",
    prefixWeek = "",
    suffixYear = dropdownPointers ? "before:content-['↓']" : "",
    suffixWeek = dropdownPointers ? "before:content-['↓']" : "",
    popupInner = "",
    popupStyles = "",
    labelledby = "Select site-date",
  }: {
    currentSiteId: number;
    currentSiteDateId: number;

    heading: any;
    yearPrefix: any;
    weekPrefix: any;

    dropdownPointers: boolean;
    dropdownShowDate: boolean;

    controlOuter: CssClasses;
    controlBody: CssClasses;
    buttonLeft: CssClasses;
    buttonYear: CssClasses;
    buttonWeek: CssClasses;
    buttonRight: CssClasses;
    prefixYear: CssClasses;
    prefixWeek: CssClasses;
    suffixYear: CssClasses;
    suffixWeek: CssClasses;
    popupInner: CssClasses;
    popupStyles: string;
    labelledby: string;
  } = $props();

  buttonYear = dropdownPointers
    ? prefixYear
      ? "w-28"
      : "w-20"
    : prefixYear
      ? "w-24"
      : "w-16";
  buttonWeek = dropdownPointers
    ? prefixYear
      ? "w-28"
      : "w-20"
    : prefixYear
      ? "w-24"
      : "w-16";

  //console.log('SiteDatePicker:currentSiteId', currentSiteId, 'currentSiteDateId', currentSiteDateId);

  /* Show down arrow with year and week labels to indicate dropdown.  Default: true */
  /* Includes date in weeks dropdown.  Default: false */

  /*-- Context */

  let siteDates: SiteDateYearSiteDates[] = $state([]);
  let isDisabled: boolean = $state(true);

  // siteDate list for respective site via Context
  //const siteDates: SiteDateYearSiteDates[] = $state(getContext('siteDates') ?? []);
  //console.log('siteDates - 1:', siteDates);
  //console.log('SiteDatePicker:siteDates', siteDates);

  /*-- -- Styling -- */
  /*-- Properties (styles) */

  // Properties (a11y)
  /** Provide the ARIA labelledby value.  Default: "Select site-date" */

  /*-- Constants (styles) */
  const cControlOuter = "block lg:flex lg:flex-row gap-0 md:gap-1 lg:gap-2";
  const cControlBody = "btn-group variant-soft my-auto";
  const cButtonLeft = "";
  const cButtonYear = "";
  const cButtonWeek = "";
  const cButtonRight = "";
  const cPrefixYear = "";
  const cPrefixWeek = "";
  const cSuffixYear = "";
  const cSuffixWeek = "";
  const cPopupInner = "card w-48 shadow-xl py-2 overflow-y-auto";
  const cPopupStyles = "max-height: calc(100vh - 272px);";

  /*-- Reactives (styles) */
  // (Post-SV4) Does not support native class atribute anymore, TODO: see about restoring this in SV5
  let classesControlOuter = $derived.by(
    () => `${cControlOuter} ${controlOuter}`,
  ); // ${this.className ?? ''}`);
  let classesControlBody = $derived(`${cControlBody} ${controlBody}`); // ${this.className ?? ''}`);
  let classesButtonLeft = $derived(`${cButtonLeft} ${buttonLeft}`); // ${this.className ?? ''}`);
  let classesButtonYear = $derived(`${cButtonYear} ${buttonYear}`); // ${this.className ?? ''}`);
  let classesButtonWeek = $derived(`${cButtonWeek} ${buttonWeek}`); // ${this.className ?? ''}`);
  let classesButtonRight = $derived(`${cButtonRight} ${buttonRight}`); // ${this.className ?? ''}`);
  let classesPrefixYear = $derived(`${cPrefixYear} ${prefixYear}`); // ${this.className ?? ''}`);
  let classesPrefixWeek = $derived(`${cPrefixWeek} ${prefixWeek}`); // ${this.className ?? ''}`);
  let classesSuffixYear = $derived(`${cSuffixYear} ${suffixYear}`); // ${this.className ?? ''}`);
  let classesSuffixWeek = $derived(`${cSuffixWeek} ${suffixWeek}`); // ${this.className ?? ''}`);
  let classesPopupInner = $derived(`${cPopupInner} ${popupInner}`); // ${this.className ?? ''}`);
  let stylesPopup = $derived(`${cPopupStyles} ${popupStyles}`); // ${this.style ?? ''}`);

  /*-- -- Coding -- */
  /*-- Enums */
  type SdoWeek = {
    week: number;
    siteDateId: number;
    fDate: string;
  };

  /*-- Constants (functional) */
  const popupSiteDateYears: PopupSettings = {
    event: "focus-click",
    target: "popupComboSiteDateYears",
    placement: "bottom",
    closeQuery: ".listbox-item",
  };

  let popupWeeksOpenCount: number = 0;

  const popupSiteDateWeeks: PopupSettings = {
    event: "focus-click",
    target: "popupComboSiteDateWeeks",
    placement: "bottom",
    closeQuery: ".listbox-item",
    state: (e: Record<string, boolean>) => {
      popupWeeksOpenCount = e.state ? 1 : 0;
    },
  };

  /*-- Properties (functional) */
  let cmbWeeks: HTMLDivElement;

  const uniqueYears: string[] = $state([]);
  const yearDates: any = $derived(
    siteDates
      .filter((x: SiteDateYear) => x.year.toString() === recordYear)
      .map<SdoWeek>((y: SiteDateYear) => ({
        fDate: y.recordDate
          ? formatDate(new Date(y.recordDate).toISOString())
          : "",
        siteDateId: y.id,
        week: y.week,
      })),
  );

  const trackedWeeks: DateTracking[] = [];
  // $inspect(trackedWeeks);

  /*-- Variables and objects */
  let recordYear: string = $state("");
  let recordWeek: string = $state("");

  /*-- Run first stuff */
  /*-- onMount, beforeUpdate, afterUpdate */
  let isSdo = false;
  $effect(() => {
    isSdo = document.location.pathname
      .toLowerCase()
      .includes("sitedateobservations");
  });

  /*-- Handlers */
  const handleSelectYear = (event: Event & { currentTarget: any }) => {
    let targetYear = event.currentTarget.value;
    let idx = trackedWeeks.findIndex(
      (x) => (x.year ?? -1).toString() === targetYear,
    );
    console.log("yearDates", yearDates.slice(0, 2));

    if (idx > -1) {
      event.preventDefault();
      updatePerHandler(idx);
    }
  };

  const handleSelectWeek = (event: Event & { currentTarget: any }) => {
    let idx = trackedWeeks.findIndex(
      (x) => x.siteDateId === parseInt(event.currentTarget.value),
    );
    if (idx > -1) {
      event.preventDefault();
      updatePerHandler(idx);
    }
  };

  const handleClickWeek = (event: Event) => {
    console.log("handleClickWeek", typeof currentSiteDateId, currentSiteDateId);
    event.preventDefault();
    if (popupWeeksOpenCount > 1 && trackedWeeks) {
      // reset to zero and close dropdown in case of clicking on same
      popupWeeksOpenCount = 0;
      cmbWeeks.inert = true;
      cmbWeeks.style.opacity = "0";
      if (isSdo) {
        goto(`/api/sitedateobservations/${currentSiteDateId}/${currentSiteId}`);
      } else {
        goto(`/api/sitedate/${currentSiteId}/${currentSiteDateId}`);
      }
      return true;
    }
    popupWeeksOpenCount++;
    return false;
  };

  const handleClickPrior = (event: Event) => {
    let idx = trackedWeeks.findIndex((x) => x.siteDateId === currentSiteDateId);
    if (idx > 0) {
      event.preventDefault();
      updatePerHandler(idx - 1);
    }
  };

  const handleClickNext = (event: Event) => {
    let idx = trackedWeeks.findIndex((x) => x.siteDateId === currentSiteDateId);
    if (idx < trackedWeeks.length - 1) {
      event.preventDefault();
      updatePerHandler(idx + 1);
    }
  };

  function updatePerHandler(idx: number) {
    console.log("updatePerHandler.idx:", idx);
    const tw = trackedWeeks[idx];
    recordYear = (tw.year ?? -1).toString();
    recordWeek = (tw.week ?? -1).toString();
    currentSiteDateId = tw.siteDateId ?? -1;
    if (isSdo) {
      goto(`/api/sitedateobservations/${currentSiteDateId}/${currentSiteId}`);
    } else {
      goto(`/api/sitedate/${currentSiteId}/${tw.siteDateId}`);
    }
  }

  /*-- Methods */
  /*-- Reactives (functional) */
  let trackedWeekIndex = $derived(
    trackedWeeks.findIndex(
      (x: DateTracking) => x.siteDateId === currentSiteDateId,
    ),
  );
  let nextDisabled = $derived(trackedWeekIndex > trackedWeeks.length - 2);
  let prevDisabled = $derived(trackedWeekIndex < 1);

  /*-- Other */

  async function fetchData(siteId: number) {
    if (isNaN(siteId)) {
      console.warn("siteId in SiteDatePicker is NaN");
      return;
    }

    //console.log("siteId in SiteDatePicker is ", siteId);
    let sdpath = `/api/sitedate/c/${siteId}`;
    isDisabled = true;
    recordYear = "...";
    recordWeek = "...";

    try {
      const response = await fetch(`${sdpath}`);
      const data = await response.json();

      siteDates = data.siteDates;
      //console.log("SiteDatePicker inner data:", data);
      if (siteDates && siteDates.length > 0) {
        trackedWeeks.length = 0;
        trackedWeeks.push(
          ...Array.from(siteDates)
            .map<DateTracking>((w: SiteDateYearSiteDates) => ({
              siteDateId: w.id,
              year: w.year ?? -1,
              week: w.recordDate ? weekOfYearSince(new Date(w.recordDate)) : -1,
              recordDate: new Date(w.recordDate),
              fDate: w.recordDate
                ? formatDate(new Date(w.recordDate).toISOString())
                : "",
            }))
            .sort(compareYearWeek),
        );

        uniqueYears.length = 0;
        uniqueYears.push(...new Set(siteDates.map((x) => x.year.toString())));
        recordYear = uniqueYears.length > 0 ? uniqueYears[0] : "";
        recordWeek =
          siteDates.length > 0
            ? (
                trackedWeeks.find((x) => x.siteDateId === currentSiteDateId)
                  ?.week ?? siteDates[0].week
              ).toString()
            : "";
        isDisabled = false;
      }
    } catch (error) {
      console.error("Error fetching data:", error, "from sdpath", sdpath);
    }
  }

  // Call fetchData initially to populate the data
  $effect(() => {
    fetchData(currentSiteId);
  });

  // $effect(() => {
  //   console.log("Effected: ", currentSiteDateId);
  // });
</script>

<!--
{#if siteDates}
    <ul>
        {#each siteDates as item}
            <li>{item}</li>
        {/each}
    </ul>
{:else}
    <p>Loading...</p>
{/if}
-->

{#snippet sHeading()}
  {#if heading}
    <div class="my-auto">
      {@render heading()}
    </div>
  {/if}
{/snippet}

{#snippet sPrefixYear()}
  {#if yearPrefix}
    <span class={classesPrefixYear}>
      {@render yearPrefix()}
    </span>
  {/if}
{/snippet}

{#snippet sPrefixWeek()}
  {#if weekPrefix}
    <span class={classesPrefixWeek}>
      {@render weekPrefix()}
    </span>
  {/if}
{/snippet}

{#snippet sListBoxYears()}
  <ListBox rounded="rounded-none" labelledby="Years for site">
    {#each uniqueYears as year}
      <ListBoxItem
        bind:group={recordYear}
        name="years"
        on:change={handleSelectYear}
        value={year}
      >
        {year}
      </ListBoxItem>
    {/each}
  </ListBox>
{/snippet}

{#snippet sListBoxWeeks()}
  <ListBox rounded="rounded-none" labelledby="Weeks in timeframe">
    {#each yearDates as week}
      <ListBoxItem
        bind:group={currentSiteDateId}
        name="weeks"
        on:change={handleSelectWeek}
        on:click={handleSelectWeek}
        value={week.siteDateId}
      >
        {@render sPrefixWeek()}{`${week.week}${dropdownShowDate ? " - " + week.fDate : ""}`}
      </ListBoxItem>
    {/each}
  </ListBox>
{/snippet}

<div class={classesControlOuter}>
  {@render sHeading()}

  <div class={classesControlBody} aria-labelledby={labelledby}>
    <button
      type="button"
      class={classesButtonLeft}
      onclick={handleClickPrior}
      disabled={isDisabled || prevDisabled}>◀</button
    >
    <button
      type="button"
      class={classesButtonYear}
      use:popup={popupSiteDateYears}
      disabled={isDisabled || (prevDisabled && nextDisabled)}
    >
      {@render sPrefixYear()}
      <span>{recordYear}</span>
      <span class={classesSuffixYear}></span>
    </button>
    <button
      type="button"
      class={classesButtonWeek}
      use:popup={popupSiteDateWeeks}
      disabled={isDisabled || (prevDisabled && nextDisabled)}
      onclick={handleClickWeek}
      onkeydown={handleClickWeek}
    >
      {@render sPrefixWeek()}
      <span>{recordWeek}</span>
      <span class={classesSuffixWeek}></span>
    </button>
    <button
      type="button"
      class={classesButtonRight}
      onclick={handleClickNext}
      disabled={isDisabled || nextDisabled}>▶</button
    >
  </div>

  <div data-popup="popupComboSiteDateYears" class="z-10">
    <div class={classesPopupInner} style={stylesPopup}>
      {@render sListBoxYears()}
    </div>
  </div>

  <div data-popup="popupComboSiteDateWeeks" bind:this={cmbWeeks} class="z-20">
    {#if yearDates}
      <div
        class={`${classesPopupInner} ${dropdownShowDate ? "w-44" : "w-28"}`}
        style={stylesPopup}
      >
        {@render sListBoxWeeks()}
      </div>
    {/if}
  </div>
</div>
