<script lang="ts">
    /*-- Imports */
    import type { StateRegion } from '@prisma/client';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';

    /*-- -- Data -- */
    /*-- Exports */
    export let currentStateRegion: StateRegion;

    /*-- Context */
    /*-- -- Styling -- */
    /*-- Properties (styles) */
    /*-- Constants (styles) */
    /*-- Reactives (styles) */
    /*-- -- Coding -- */
    /*-- Enums */
    /*-- Constants (functional) */
    const popupStateRegions: PopupSettings = {
        event: 'focus-click',
        target: 'popupStateRegions',
        placement: 'bottom',
    };

    /*-- Properties (functional) */
    /*-- Variables and objects */
    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */
    /*-- Methods */
    /*-- Reactives (functional) */
</script>

{#if $$slots.label}
    <slot name="label" />
{/if}
<div class="btn-group variant-soft scale-90 my-auto">
    <button class="!px-2">◀</button>
    <button class="w-24" use:popup={popupStateRegions}>
        <span class="h-full text-nowrap overflow-hidden text-ellipsis">
            {currentStateRegion.name}
        </span>
        <span>↓</span>
    </button>
    <button class="!px-2">▶</button>
</div>

<div data-popup="popupStateRegions">
    <div class="card w-48 shadow-xl py-2">
        <slot />
    </div>
</div>
