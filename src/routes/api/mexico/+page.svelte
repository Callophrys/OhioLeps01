<script lang="ts">
    import DoubledContainer from '$lib/components/DoubledContainer.svelte';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';

    /*
    import { imageModules } from '$lib/gallery';
    const galleryUrls: string[] = [];
    for (const path in imageModules) {
      imageModules[path]().then((mod: any) => {
        console.log(path, mod)
        galleryUrls.push(path);
      });
    }
    <ul>
    {#each galleryUrls as asset}
       <li></li>{asset}</li>
    {/each}
    </ul>
    */

    let { data }: { data: any } = $props();
    //console.log('data\n', data.CountySpecimens);
    const notMonitored = '<span class="text-secondary-500">*</span>';

    let isMouseDown = false;

    const sss: { sh: any; svgvp: any; selcnt: any; sellst: any; cspcnt: any; csplst: any } = {
        sh: null,
        svgvp: null,
        selcnt: null,
        sellst: null,
        cspcnt: null,
        csplst: null,
    };

    type countyItem = { id: string; name: string };
    let selectedCounties: countyItem[] = [];

    function calculateCentroid(points: string) {
        const coords = points.split(' ').map((point) => point.split(',').map(Number));
        let area = 0,
            cx = 0,
            cy = 0;

        for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
            const [x0, y0] = coords[j];
            const [x1, y1] = coords[i];
            const cross = x0 * y1 - x1 * y0;
            area += cross;
            cx += (x0 + x1) * cross;
            cy += (y0 + y1) * cross;
        }

        cx /= 3 * area;
        cy /= 3 * area;

        return { cx, cy };
    }

    function handleBlur(e: any) {
        sss.sh.textContent = '';
        sss.sh.classList.replace('opacity-100', 'opacity-0');
    }

    function handleMouseOut(e: any) {
        sss.sh.textContent = '';
        sss.sh.classList.replace('opacity-100', 'opacity-0');
    }

    function handleMouseMove(e: any) {
        if (e.target.tagName === 'polygon') {
            if (isPolygonMonitored(e.target)) {
                sss.sh.textContent = '✔' + e.target.id.substring(e.target.id.lastIndexOf('_') + 1);
            } else {
                sss.sh.textContent = e.target.id.substring(e.target.id.lastIndexOf('_') + 1);
            }
            sss.sh.style.left = e.clientX - Math.ceil(sss.sh.clientWidth / 2) + 'px';
            sss.sh.style.top = e.clientY - 40 + 'px';
            sss.sh.classList.replace('opacity-0', 'opacity-100');

            if (isMouseDown) {
                e.target.classList.add('polygon-select');
                if (selectedCounties.findIndex((c) => c.id === e.target.id) < 0) {
                    selectedCounties.push({
                        id: e.target.id,
                        name: e.target.id.substring(e.target.id.lastIndexOf('_') + 1),
                    });
                    updateCounties();
                }
            }
        } else {
            sss.sh.classList.replace('opacity-100', 'opacity-0');
            sss.sh.textContent = '';
        }
    }

    function handleMouseDown(e: any) {
        isMouseDown = true;
        sss.svgvp.classList.add('cursor-pointer');
        if (e.target.tagName === 'polygon') {
            if (e.shiftKey) {
                let region = Array.from(e.target.classList).find((c: any) => c.startsWith('region'));
                let isAdding = !e.target.classList.contains('polygon-select');
                Array.from(sss.svgvp.querySelectorAll('polygon'))
                    .filter((r: any) => r.classList.contains(region))
                    .forEach((p: any) => {
                        if (isAdding) {
                            if (selectedCounties.findIndex((c) => c.id === p.id) < 0) {
                                p.classList.add('polygon-select');
                                selectedCounties.push({
                                    id: p.id,
                                    name: p.id.substring(p.id.lastIndexOf('_') + 1),
                                });
                            }
                        } else {
                            p.classList.remove('polygon-select');
                            selectedCounties.splice(
                                selectedCounties.findIndex((c: countyItem) => c.id === p.id),
                                1
                            );
                        }
                    });
            } else {
                if (e.target.classList.contains('polygon-select')) {
                    if (!e.ctrlKey) {
                        clearSelectedCounties();
                    } else {
                        e.target.classList.remove('polygon-select');
                        selectedCounties.splice(
                            selectedCounties.findIndex((c: countyItem) => c.id === e.target.id),
                            1
                        );
                    }
                } else {
                    if (!e.ctrlKey) {
                        clearSelectedCounties();
                    }
                    e.target.classList.add('polygon-select');
                    selectedCounties.push({
                        id: e.target.id,
                        name: e.target.id.substring(e.target.id.lastIndexOf('_') + 1),
                    });
                }
            }
            updateCounties();
        }
    }

    function clearSelectedCounties() {
        sss.svgvp.querySelectorAll('polygon').forEach((p: any) => p.classList.remove('polygon-select'));
        selectedCounties.length = 0;
    }

    function handleMouseUp(e: any) {
        isMouseDown = false;
        sss.svgvp.classList.remove('cursor-pointer');
    }

    function isMonitored(county: string) {
        //console.log('v', county);
        let x = data.CountySpecimens.find((d: any) => d.county.toLowerCase() === county);
        //console.log('x', x);
        let y = x?.species.length ?? 0;
        //console.log('y', y);
        return y > 0;
    }

    function isPolygonMonitored(polygon: SVGPolygonElement) {
        return !polygon.classList.contains('not-monitored');
    }

    function updateCounties() {
        sss.selcnt.textContent = 'Selected counties (' + selectedCounties.length + '):';
        sss.sellst.innerHTML =
            '<ul class="list">' +
            selectedCounties
                .map((c: any) => '<li class="capitalize">' + c.name + (isMonitored(c.name) ? '' : notMonitored) + '</li>')
                .sort()
                .join('') +
            '</ul>';

        const ctys = selectedCounties.map((c) => c.name);
        //console.log('CountySpecimens:', data.CountySpecimens);
        //console.log('ctys:', ctys);
        let spcno = data.CountySpecimens.filter((g: any) => {
            //console.log(g.county);
            return ctys.includes(g.county.toString().toLowerCase());
        });
        //console.log('spcno:', spcno);

        let spcnq = spcno.map((h: any) => h.species.map((i: any) => i.commonName));
        let spcnr = [...new Set(spcnq.flat().sort())];
        sss.cspcnt.textContent = `Species in selection (${spcnr.length})`;
        sss.csplst.innerHTML = '<ul class="list">' + spcnr.map((s: any) => '<li class="">' + s + '</li>').join('') + '</ul>';
    }

    $effect(() => {
        sss.sh = document.getElementById('svg_hover');
        sss.svgvp = document.getElementById('svg_oh');
        sss.selcnt = document.getElementById('selected-counties-count');
        sss.sellst = document.getElementById('selected-counties-list');
        sss.cspcnt = document.getElementById('species-in-selection');
        sss.csplst = document.getElementById('species-in-selection-list');

        psvgs.map((c) => {
            const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            polygon.classList.add(c[2]);
            polygon.id = 'svg_' + c[1].substring(2) + '_' + c[3];
            polygon.setAttribute('points', c[4]);
            polygon.classList.add(isMonitored(c[3]) ? 'dot-map' : 'not-monitored');
            sss.svgvp.appendChild(polygon);

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            const { cx, cy } = calculateCentroid(c[4]);
            circle.setAttribute('cx', cx.toString());
            circle.setAttribute('cy', cy.toString());
            circle.setAttribute('r', '4'); // Adjust radius as needed
            sss.svgvp.appendChild(circle);
        });
    });

    const popupFeatured: PopupSettings = {
        // Represents the type of event that opens/closed the popup
        event: 'click',
        // Matches the data-popup value on your popup element
        target: 'popupFeatured',
        // Defines which side of your trigger the popup will appear
        placement: 'bottom',
    };

    const psvgs = [['usa', 'ohio', 'region1', 'champaign', '56,195 57,182 58,173 74,174 74,176 91,177 95,177 95,187 94,198 56,195', 1]];
</script>

<DoubledContainer>
    <svelte:fragment slot="leftBody">
        <div class="opacity-0 font-semibold text-white capitalize absolute" id="svg_hover"></div>

        <div class="flex gap-2 justify-between">
            <svg id="svg_oh" viewBox="0 0 308 350" xmlns="http://www.w3.org/2000/svg" height="60vmin" width="60vmin" class="outline-none" on:mousedown={handleMouseDown} on:mouseup={handleMouseUp} on:mousemove={handleMouseMove} on:blur={handleBlur} />

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

<style>
    :root {
        --rc1: #d22b2b;
        --rc2: #ffd700;
        --rc3: #ec5800;
        --rc4: #085119;
        --rc5: #66bd27;

        --cty-sel: #9118b0;
    }

    :global {
        polygon {
            /* cursor: pointer; opt to only do when mouse button is held down and dragging */
            fill: #ff9966;
            stroke: #000;
            stroke-width: 1;
            pointer-events: visible;
            transition: background-color 1000ms linear;

            &:hover {
                fill: #ff6633;
            }
        }

        circle {
            display: none;
        }

        .dot-map circle {
            display: inline;
            fill: #000;
            pointer-events: none;
            z-index: 2;
        }

        .polygon-select {
            fill: var(--cty-sel) !important;

            &.not-monitored {
                fill: color-mix(in srgb, var(--cty-sel) 70%, transparent) !important;
            }
        }

        .region1 {
            fill: var(--rc1);

            &:hover {
                fill: color-mix(in srgb, var(--rc1) 70%, transparent);
            }

            &.not-monitored {
                fill: color-mix(in srgb-linear, var(--rc1) 60%, gray 40%);
            }
        }

        .region2 {
            fill: var(--rc2);

            &:hover {
                fill: color-mix(in srgb, var(--rc2) 70%, transparent);
            }

            &.not-monitored {
                fill: color-mix(in srgb-linear, var(--rc2) 60%, gray 40%);
            }
        }

        .region3 {
            fill: var(--rc3);

            &:hover {
                fill: color-mix(in srgb, var(--rc3) 70%, transparent);
            }

            &.not-monitored {
                fill: color-mix(in srgb-linear, var(--rc3) 60%, gray 40%);
            }
        }

        .region4 {
            fill: var(--rc4);

            &:hover {
                fill: color-mix(in srgb, var(--rc4) 70%, transparent);
            }

            &.not-monitored {
                fill: color-mix(in srgb-linear, var(--rc4) 60%, gray 40%);
            }
        }

        .region5 {
            fill: var(--rc5);

            &:hover {
                fill: color-mix(in srgb, var(--rc5) 70%, transparent);
            }

            &.not-monitored {
                fill: color-mix(in srgb-linear, var(--rc5) 60%, gray 40%);
            }
        }
    }
</style>
