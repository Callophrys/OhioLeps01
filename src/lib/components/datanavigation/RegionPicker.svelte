<script lang="ts">
    /*-- Imports */
    import type { Region } from '@prisma/client';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';

    /*-- -- Data -- */
    /*-- Exports */
    export let currentRegion: Region;

    /*-- Context */
    /*-- -- Styling -- */
    /*-- Properties (styles) */
    /*-- Constants (styles) */
    /*-- Reactives (styles) */
    /*-- -- Coding -- */
    /*-- Enums */
    /*-- Constants (functional) */
    const popupRegions: PopupSettings = {
        event: 'focus-click',
        target: 'popupRegions',
        placement: 'bottom',
    };

    /*-- Properties (functional) */
    /*-- Variables and objects */
    /*-- Run first stuff */
    /*-- onMount, beforeNavigate, afterNavigate */
    /*-- Handlers */
    /*-- Methods */
    /*-- Reactives (functional) */

</script>

{#if $$slots.label}
    <slot name="label" />
{/if}
<div class="btn-group variant-soft scale-90 my-auto">
    <button class="!px-2">◀</button>
    <button class="w-24" use:popup={popupRegions}>
        <span class="h-full text-nowrap overflow-hidden text-ellipsis">
            {currentRegion.name}
        </span>
        <span>↓</span>
    </button>
    <button class="!px-2">▶</button>
</div>

<div data-popup="popupRegions">
    <div class="card w-48 shadow-xl py-2">
        <slot />
    </div>
</div>
