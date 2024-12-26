<script lang="ts">
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import DoubledContainer from '$lib/components/DoubledContainer.svelte';
    import { onMount } from 'svelte';
    import { popup } from '@skeletonlabs/skeleton';
    import jalisco from '$lib/assets/svg/north_america/mexico/jalisco.svg';

    import { handleBlur, handleMouseDown, handleMouseMove, handleMouseUp, initialize, getViewBox } from '$lib/scripts/interactive.js';
    import '$lib/styles/interactive.css';

    const stateId: string = 'jalisco';
    const svgPath = '$lib/assets/svg/north_america/mexico/jalisco.svg';
    // const svgModules = import.meta.glob(svgPath);
    // console.log(svgModules);

    let { data }: { data: any } = $props();

    console.log(data);

    let svgContent: string = $state('');

    onMount(async () => {
        console.log('in onMount');
        const response = await fetch(`$lib/assets/svg/north_america/mexico/jalisco.svg`);
        console.log(response);
        svgContent = await response.text();
        console.log(svgContent);
    });

    const popupFeatured: PopupSettings = {
        // Represents the type of event that opens/closed the popup
        event: 'click',
        // Matches the data-popup value on your popup element
        target: 'popupFeatured',
        // Defines which side of your trigger the popup will appear
        placement: 'bottom',
    };

    let svgId: string = $state(`svg_${stateId}`);
    // let viewBox: string = $state('0 0 600 800');

    $effect(() => {
        initialize(psvgs, data, stateId);
        // viewBox = getViewBox(psvgs);
    });

    const psvgs = [];
</script>

<DoubledContainer>
    <svelte:fragment slot="leftBody">
        <div class="opacity-0 font-semibold text-white capitalize absolute" id="svg_hover"></div>

        <div class="flex gap-2 justify-between">
            <div>{@html svgContent}</div>
            <!-- <svg id="svg_{svgId}" width="100vmin" height="100vmin" class="outline-none" onmousedown={handleMouseDown} onmouseup={handleMouseUp} onmousemove={handleMouseMove} onblur={handleBlur} role="figure" /> -->
            <!-- <svg id="svg_{svgId}" width="100vmin" height="100vmin" class="outline-none" onmousedown={handleMouseDown} onmouseup={handleMouseUp} onmousemove={handleMouseMove} onblur={handleBlur} role="figure"> -->
            <!--     <use href="{jalisco}#svg_state"></use> -->
            <!-- </svg> -->
            <div class="space-y-2 max-w-44">
                <label class="flex items-center space-x-2">
                    <input class="radio" type="radio" checked name="radio-direct" value="1" />
                    <p>Species present</p>
                </label>
                <label class="flex items-center space-x-2">
                    <input class="radio" type="radio" disabled name="radio-direct" value="2" />
                    <p>Counties with species</p>
                </label>
                <button class="btn variant-filled" use:popup={popupFeatured}>How to select<br />counties</button>
                <div class="card p-4 w-80 shadow-xl bg-surface-100-800-token" data-popup="popupFeatured">
                    <div class="text-center"><p>Instructions</p></div>
                    <ul class="list-disc ml-2">
                        <li>Left-click mouse and drag to create sets of counties</li>
                        <li>Press and hold down control key while clicking or dragging to add or remove</li>
                        <li>Press and hold both control and shift keys to add or remove entire regions of counties</li>
                    </ul>
                    <div class="arrow shadow-xl bg-surface-100-800-token"></div>
                </div>
            </div>
        </div>
    </svelte:fragment>

    <svelte:fragment slot="rightHead">
        <div class="grid grid-cols-2">
            <div>
                <div id="selected-counties-count">Selected counties (0)</div>
            </div>
            <div>
                <div id="species-in-selection">Species in selection (0)</div>
            </div>
        </div>
    </svelte:fragment>
    <svelte:fragment slot="rightBody">
        <div class="grid grid-cols-2">
            <ul id="selected-counties-list" class="list ml-4"></ul>
            <ul id="species-in-selection-list" class="list ml-4"></ul>
        </div>
    </svelte:fragment>
    <svelte:fragment slot="rightTail"><div class="text-xs text-secondary-500 mb-[-1em]">* Not monitored / no species observed</div></svelte:fragment>
</DoubledContainer>
<div class="hidden polygon-select"></div>
