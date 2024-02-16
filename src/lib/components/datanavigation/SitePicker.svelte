<script lang="ts">
    import type { Site } from '@prisma/client';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    export let currentSite: Site;

    const popupSites: PopupSettings = {
        event: 'focus-click',
        target: 'popupSites',
        placement: 'bottom',
    };
</script>

<!--
<button class="btn variant-filled w-32 justify-between" use:popup={popupComboboxHelp}>
    <span class="capitalize">Help</span>
    <span>↓</span>
</button>
-->
<div class="flex flex-col lg:flex-row gap-0 md:gap-1 lg:gap-2">
    {#if $$slots.heading}
        <div class="my-auto">
            <slot name="heading" />
        </div>
    {/if}
    <div class="btn-group variant-soft my-auto">
        <button class="!px-2">◀</button>
        <button class="w-54" use:popup={popupSites}>
            <span class="h-full text-nowrap overflow-hidden text-ellipsis">
                {currentSite.siteName}
            </span>
            <span>↓</span>
        </button>
        <button class="!px-2">▶</button>
    </div>
</div>

<div data-popup="popupSites">
    <div class="card w-48 shadow-xl py-2">
        <slot />
    </div>
</div>
