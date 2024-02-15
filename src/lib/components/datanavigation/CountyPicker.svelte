<script lang="ts">
    import type { County } from '@prisma/client';
    import { popup } from '@skeletonlabs/skeleton';
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import type { SiteCountySiteDates } from '$lib/types.js';
    import { getContext } from 'svelte';

    export let currentCounty: County;

    $: currentCounty = currentCounty;

    let allCounties: County[] = getContext('counties') ?? [];
    console.log(allCounties);
    console.log(currentCounty);

    const popupCounties: PopupSettings = {
        event: 'focus-click',
        target: 'popupCounties',
        placement: 'bottom',
    };

    function countyPrior(e: any) {
        if (currentCounty.id !== allCounties[0].id) {
            let idx = allCounties.findIndex((c) => {
                return c.id === currentCounty.id;
            });
            if (idx > 0) {
                currentCounty = allCounties[idx - 1];
            }
        }
    }

    function countyNext(e: any) {
        if (currentCounty.id !== allCounties[allCounties.length - 1].id) {
            let idx = allCounties.findIndex((c) => {
                return c.id === currentCounty.id;
            });
            if (idx > 0) {
                currentCounty = allCounties[idx + 1];
            }
        }
    }

    function countySelect(e: any) {
        console.log(e.currentTarget.value);
        let idx = allCounties.findIndex((c) => {
            return c.id === parseInt(e.currentTarget.value);
        });
        if (idx > -1) {
            console.log('Found and setting to:', allCounties[idx]);
            currentCounty = allCounties[idx];
        } else {
            console.log('Index not found');
        }
    }
</script>

{#if $$slots.label}
    <slot name="label" />
{/if}
<div class="btn-group variant-soft scale-90 my-auto">
    <!--TODO: Still breaks and/or locks up when arrowing to Adams county -->
    <button class="!px-2" on:click={countyPrior}>◀</button>
    <button class="w-44" use:popup={popupCounties}>
        <span class="h-full text-nowrap overflow-hidden text-ellipsis">
            {currentCounty.name}
        </span>
        <span>↓</span>
    </button>
    <button class="!px-2" on:click={countyNext}>▶</button>
</div>

<div data-popup="popupCounties">
    <div class="card w-48 shadow-xl py-2">
        <!--TODO: Either make this scrollable or switch to another control -->
        <!--TODO: If staying with listbox this must close out right after clicking -->
        <ListBox rounded="rounded-none">
            {#each allCounties as county}
                <ListBoxItem bind:group={currentCounty.id} name="medium" on:change={countySelect} value={county.id} class="capitalize">{county.name}</ListBoxItem>
            {/each}
        </ListBox>
    </div>
</div>
