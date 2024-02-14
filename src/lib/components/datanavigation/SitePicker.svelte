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
{#if $$slots.label}
    <slot name="label" />
{/if}
<div class="btn-group variant-soft scale-90 my-auto">
    <button class="!px-2">◀</button>
    <button class="min-w-32 max-w-54" use:popup={popupSites}>
        <span class="h-full text-nowrap overflow-hidden text-ellipsis">
            {currentSite.siteName}
        </span>
        <span>↓</span>
    </button>
    <button class="!px-2">▶</button>
</div>

<div data-popup="popupSites">
    <div class="card w-48 shadow-xl py-2">
        <slot />
    </div>
</div>
