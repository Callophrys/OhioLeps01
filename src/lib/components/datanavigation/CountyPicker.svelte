<script lang="ts">
    import type { County } from '@prisma/client';
    import { popup } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
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
        state: (e: Record<string, boolean>) => console.log(e),
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

<div class="flex flex-col lg:flex-row gap-0 md:gap-1 lg:gap-2">
    {#if $$slots.heading}
        <div class="my-auto">
            <slot name="heading" />
        </div>
    {/if}
    <div class="btn-group variant-soft my-auto">
        <!--TODO: Still breaks and/or locks up when arrowing to Adams county -->
        <button class="!px-2" on:click={countyPrior}>◀</button>
        <button class="w-44" use:popup={popupCounties}>
            <span class="w-full text-left text-nowrap overflow-hidden text-ellipsis">
                {currentCounty.name}
            </span>
            <span class="flex-auto">↓</span>
        </button>
        <button class="!px-2" on:click={countyNext}>▶</button>
    </div>
</div>

<div data-popup="popupCounties">
    <div class="card w-48 shadow-xl py-2 overflow-y-auto" style="max-height: calc(100vh - 272px);">
        <!--TODO: Either make this scrollable or switch to another control -->
        <!--TODO: If staying with listbox this must close out right after clicking -->
        <ListBox rounded="rounded-none">
            {#each allCounties as county}
                <ListBoxItem bind:group={currentCounty.id} name="medium" on:change={countySelect} value={county.id} class="capitalize">{county.name}</ListBoxItem>
            {/each}
        </ListBox>
    </div>
</div>
