<script lang="ts">
    import * as config from '$lib/config';
    import StateCountyPicker from '$lib/components/query/StateCountyPicker.svelte';
    import SpeciesPicker from '$lib/components/query/SpeciesPicker.svelte';
    import TimeframePicker from '$lib/components/query/TimeframePicker.svelte';
    import DoubledContainer from '$lib/components/DoubledContainer.svelte';
    import type { countySpecimen } from '$lib/types.js';
    import { enhance } from '$app/forms';
    import type { SubmitFunction } from '@sveltejs/kit';
    //import { json } from 'stream/consumers';

    export let data;
    export let form;

    let loading = false;

    const countedRegions = Object.create(null);
    const countedCounties = Object.create(null);
    const countedSpecies = Object.create(null);

    const distinctRegions = Object.create(null);
    const distinctCounties = Object.create(null);
    const distinctSpecies = Object.create(null);

    const runSearch: SubmitFunction = () => {
        loading = true;

        return async ({ update }) => {
            loading = false;
            await update();
        };
    };

    $: {
        if (form?.success) {
            form.checklists.forEach((cs: countySpecimen) => {
                countedRegions[cs.region] = 1 + (countedRegions[cs.region] ?? 0);
                countedCounties[cs.county] = 1 + (countedCounties[cs.county] ?? 0);
                countedSpecies[cs.checklistId] = 1 + (countedRegions[cs.checklistId] ?? 0);

                distinctRegions[cs.region] = 1;
                distinctCounties[cs.county] = 1;
                distinctSpecies[cs.checklistId] = 1;
            });
            

            console.log(form.checklists.length);
            const z = form.checklists.map((y: countySpecimen) => JSON.stringify({ region: y.region, county: y.county, commonName: y.commonName, scientificName: y.scientificName }));
            const a = [...new Set(z)];
            console.log(a);
            const b = a.map(x => JSON.parse(x) as countySpecimen);
            console.log(b.length);
            form.checklists = b;
        }

        /*
        console.log('countedRegions', countedRegions);
        console.log('countedCounties', countedCounties);
        console.log('countedSpecies', countedSpecies);

        console.log('distinctRegions', Object.keys(distinctRegions).length);
        console.log('distinctCounties', Object.keys(distinctCounties).length);
        console.log('distinctSpecies', Object.keys(distinctSpecies).length);
        */
    }
    /*
    console.log('data', data);
    console.log('form', form);
    */

    type sortInfo = { col: string; ascending: boolean };
    const sortBy: sortInfo[] = [];
    const dirIndicator: any = {
        region: '',
        county: '',
        commonName: '',
        scientificName: '',
    };

    const dirIntensity: any = {
        region: '',
        county: '',
        commonName: '',
        scientificName: '',
    }

    const intensities: any = {
        1: 'brightness-100',
        2: 'brightness-90',
        3: 'brightness-75',
        4: 'brightness-50',
    }

    /*
    brightness-110	filter: brightness(1.1);
    brightness-125	filter: brightness(1.25);
    brightness-150	filter: brightness(1.5);
    */


    let isSorting = false;
    $: resultSort = (e: any) => {
    
        if (isSorting) {
            console.log('isSorting...');
            return;
        }

        isSorting = true;
        if (form) {
            let column = e.currentTarget.name;
            console.log('column', column);
            console.log('sortBy 0', sortBy);

            if (sortBy.length < 1) {
                sortBy.push({ col: column, ascending: true });
                dirIndicator[column] = 'table-sort-asc';
            } else if (sortBy.length === 1 && sortBy[0].col === column) {
                sortBy[0].ascending = !sortBy[0].ascending;
                dirIndicator[column] = sortBy[0].ascending ? 'table-sort-asc' : 'table-sort-dsc';
            } else {
                let idx = sortBy.findIndex((c: { col: string; ascending: boolean }) => c.col === column);
                if (idx > -1) {
                    const spliced = sortBy.splice(idx, 1)[0];
                    spliced.ascending = !spliced.ascending;
                    dirIndicator[column] = spliced.ascending ? 'table-sort-asc' : 'table-sort-dsc';
                    sortBy.push(spliced);
                } else {
                    sortBy.push({ col: column, ascending: true });
                    dirIndicator[column] = 'table-sort-asc';
                }
            }

            let i = 1
            sortBy.toReversed().forEach((s: sortInfo) => {
                dirIntensity[s.col] = intensities[i];
                ++i;
            });
            
            console.log(sortBy);

            sortBy.forEach((s: sortInfo) => {
                if (form) {
                    let sortModifier = s.ascending ? 1 : -1;
                    let sort = (a: any, b: any) => (a[s.col] < b[s.col] ? -1 * sortModifier : a[s.col] > b[s.col] ? 1 * sortModifier : 0);
                    form.checklists.sort(sort);
                }
            });

            form.checklists = form.checklists;
        }
        
        isSorting = false;
    };
</script>

<DoubledContainer rightBodyClasses={loading ? 'overflow-hidden pr-4' : 'overflow-hidden'}>
    <svelte:fragment slot="leftBody">
        <div>
            <form method="POST" class="p-4 space-y-2" action="?/query" use:enhance={runSearch}>
                <StateCountyPicker counties={data.counties} initialHideUnmonitoredChoice={config.initialHideUnmonitedChoice} />
                <SpeciesPicker speciesChecklist={data.speciesList} initialUseLatinChoice={config.initialUseLatinChoice} />
                <TimeframePicker initialDateRangeChoice={config.initialDateRangeChoice} />
                <hr />
                <div class="flex">
                    <button class="btn variant-filled w-auto justify-between mx-auto" type="submit">
                        <span>Run Search</span>
                        <span>→</span>
                    </button>
                </div>
            </form>
        </div>
    </svelte:fragment>

    <svelte:fragment slot="rightBody">
        {#if loading}
            <div class="w-full h-full pl-4 pt-2 variant-filled-surface hover:cursor-wait">Loading...</div>
        {:else if form?.success}
            <div class="w-[calc(100%_-_1em)] h-[calc(100%_-_5em)]">
                <div class="flex">
                    <button class="w-28 top-0 px-6 py-3 font-bold text-center variant-outline-surface rounded-tl" name="region" on:click={resultSort}>
                        Region&nbsp;<span class={`${dirIndicator.region} ${dirIntensity.region}`}></span>
                    </button>
                    <button class="w-28 top-0 px-6 py-3 font-bold text-center variant-outline-surface" name="county" on:click={resultSort}>
                        County&nbsp<span class={`${dirIndicator.county} ${dirIntensity.county}`}></span>
                    </button>
                    <button class="top-0 px-6 py-3 basis-[calc(45%_-_calc(0.45_*_224px))] font-bold text-center variant-outline-surface" name="commonName" on:click={resultSort}>
                        Common Name&nbsp;<span class={`${dirIndicator.commonName} ${dirIntensity.commonName}`}></span>
                    </button>
                    <button class="top-0 px-6 py-3 flex-auto font-bold text-center variant-outline-surface rounded-tr" name="scientificName" on:click={resultSort}>
                        Scientific Name&nbsp<span class={`${dirIndicator.scientificName} ${dirIntensity.scientificName}`}></span>
                    </button>
                </div>

                <div class="overflow-y-auto h-full">
                    {#each form.checklists as checklist, i}
                        <div class="flex">
                            <div class="w-28 pl-2">{checklist.region}</div>
                            <div class="w-28 pl-2">{checklist.county}</div>
                            <div class="basis-[calc(45%_-_calc(0.45_*_224px))] pl-2">{checklist.commonName}</div>
                            <div class="flex-auto pl-2">{checklist.scientificName}</div>
                        </div>
                    {/each}
                </div>

                <div class="flex">
                    <div class="w-28 pl-4">{[...new Set(form.checklists.map((x) => x.region))].length}</div>
                    <div class="w-28 pl-4">{[...new Set(form.checklists.map((x) => x.county))].length}</div>
                    <div class="basis-[calc(45%_-_calc(0.45_*_224px))] pl-4">{[...new Set(form.checklists.map((x) => x.checklistId))].length}</div>
                    <div class="flex-auto">[Totals of each distinct]</div>
                </div>
            </div>
        {/if}
    </svelte:fragment>
</DoubledContainer>

<!--
        <TreeView>
            <TreeViewItem>
                (item 1)
                <svelte:fragment slot="children">
                    <TreeViewItem>
                        (Child 1)
                        <svelte:fragment slot="children">
                            <TreeViewItem>(Child of Child 1)</TreeViewItem>
                            <TreeViewItem>(Child of Child 2)</TreeViewItem>
                        </svelte:fragment>
                    </TreeViewItem>
                    <TreeViewItem>(Child 2)</TreeViewItem>
                </svelte:fragment>
            </TreeViewItem>
            <TreeViewItem>(item 2)</TreeViewItem>
        </TreeView>
-->
