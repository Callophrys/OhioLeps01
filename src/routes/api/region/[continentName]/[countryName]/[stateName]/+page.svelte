<script lang="ts">
  import type { PopupSettings } from "@skeletonlabs/skeleton";
  import Container from "$lib/components/layouts/Container.svelte";
  import FlexContainer from "$lib/components/FlexContainer.svelte";
  import { onMount } from "svelte";
  import { popup } from "@skeletonlabs/skeleton";

  import { initialize, addListeners } from "$lib/scripts/interactive.js";
  import "$lib/styles/interactive.css";

  let { data }: { data: any } = $props();

  const popupFeatured: PopupSettings = {
    // Represents the type of event that opens/closed the popup
    event: "click",
    // Matches the data-popup value on your popup element
    target: "popupFeatured",
    // Defines which side of your trigger the popup will appear
    placement: "bottom",
  };

  let svgId: string = $state(data.svgId);

  $effect(() => {
    initialize(psvgs, data, svgId);
  });

  const psvgs = [];
</script>

{#snippet leftPaneBody()}
  <div
    class="opacity-0 font-semibold text-white capitalize absolute"
    id="svg_hover"
  ></div>

  <div>{data.stateName}, HI HI HI {data.countryName}</div>
  <div class="flex gap-2 justify-between">
    <div use:addListeners>{@html data.svgContent}</div>
    <div class="space-y-2 max-w-44">
      <label class="flex items-center space-x-2">
        <input
          class="radio"
          type="radio"
          checked
          name="radio-direct"
          value="1"
        />
        <p>Species present</p>
      </label>
      <label class="flex items-center space-x-2">
        <input
          class="radio"
          type="radio"
          disabled
          name="radio-direct"
          value="2"
        />
        <p>Counties with species</p>
      </label>
      <button class="btn variant-filled" use:popup={popupFeatured}
        >How to select<br />counties</button
      >
      <div
        class="card p-4 w-80 shadow-xl bg-surface-100-800-token"
        data-popup="popupFeatured"
      >
        <div class="text-center"><p>Instructions</p></div>
        <ul class="list-disc ml-2">
          <li>Left-click mouse and drag to create sets of counties</li>
          <li>
            Press and hold down control key while clicking or dragging to add or
            remove
          </li>
          <li>
            Press and hold both control and shift keys to add or remove entire
            regions of counties
          </li>
        </ul>
        <div class="arrow shadow-xl bg-surface-100-800-token"></div>
      </div>
    </div>
  </div>
{/snippet}

{#snippet rightPaneHead()}
  <div class="grid grid-cols-2">
    <div>
      <div id="selected-counties-count">Selected counties (0)</div>
    </div>
    <div>
      <div id="species-in-selection">Species in selection (0)</div>
    </div>
  </div>
{/snippet}
{#snippet rightPaneBody()}
  <div class="grid grid-cols-2">
    <ul id="selected-counties-list" class="list ml-4"></ul>
    <ul id="species-in-selection-list" class="list ml-4"></ul>
  </div>
{/snippet}
{#snippet rightPaneTail()}
  <div class="text-xs text-secondary-500 mb-[-1em]">
    * Not monitored / no species observed
  </div>
{/snippet}

{#snippet leftPane()}
  <Container body={leftPaneBody} outerBodyClasses="px-0" />
{/snippet}

{#snippet rightPane()}
  <Container
    head={rightPaneHead}
    body={rightPaneBody}
    tail={rightPaneTail}
    outerBodyClasses="px-0"
  />
{/snippet}

<FlexContainer {leftPane} {rightPane} />

<div class="hidden polygon-select"></div>
