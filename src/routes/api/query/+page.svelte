<script lang="ts">
    import DoubledContainer from '$lib/components/DoubledContainer.svelte';
    import SpeciesPicker from '$lib/components/query/SpeciesPicker.svelte';
    import StateCountyPicker from '$lib/components/query/StateCountyPicker.svelte';
    import TimeframePicker from '$lib/components/query/TimeframePicker.svelte';
    import type { CountySpecimen } from '$lib/types';
    import type { SubmitFunction } from '@sveltejs/kit';
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import { setContext } from 'svelte';
    import { sortByStringProperty } from '$lib/utils';
    export let data;
    export let form;

    let config: any = $page.data.config ?? {};
    setContext('counties', data.counties);
    setContext('speciesList', data.speciesList);

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
            form.checklists.forEach((cs: CountySpecimen) => {
                countedRegions[cs.region] = 1 + (countedRegions[cs.region] ?? 0);
                countedCounties[cs.county] = 1 + (countedCounties[cs.county] ?? 0);
                countedSpecies[cs.checklistId] = 1 + (countedRegions[cs.checklistId] ?? 0);

                distinctRegions[cs.region] = 1;
                distinctCounties[cs.county] = 1;
                distinctSpecies[cs.checklistId] = 1;
            });

            //console.log(form.checklists.length);
            const z = form.checklists.map((y: CountySpecimen) => JSON.stringify({ region: y.region, county: y.county, commonName: y.commonName, scientificName: y.scientificName }));
            const a = [...new Set(z)];
            //console.log(a);
            const b = a.map((x) => JSON.parse(x) as CountySpecimen);
            //console.log(b.length);
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
    };

    const intensities: any = {
        1: 'font-2xl text-xl after:text-current-900 after:brightness-0 dark:after:text-current-50 dark:after:brightness-200',
        2: 'font-2xl text-lg after:text-current-700 after:brightness-50 dark:after:text-current-200 dark:after:brightness-150',
        3: 'font-2xl text-base after:text-current-500 after:brightness-75 dark:after:text-current-400 dark:after:brightness-125',
        4: 'font-2xl text-sm after:text-current-400 dark:after:text-current-600',
    };

    /*
    const intensities: any = {
        1: 'font-extrabold text-xl after:text-red-900 dark:after:text-slate-400',
        2: 'font-extrabold text-lg after:text-green-900 dark:after:text-green-400',
        3: 'font-extrabold text-base after:text-amber-900 dark:after:text-amber-400',
        4: 'font-extrabold text-sm after:text-blue-900 dark:after:text-blue-400',
    };
    */

    /*
    brightness-110	filter: brightness(1.1);
    brightness-125	filter: brightness(1.25);
    brightness-150	filter: brightness(1.5);
    */

    let isSorting = false;
    function resultSort (e: any) {

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

            let i = 1;
            sortBy.toReversed().forEach((s: sortInfo) => {
                dirIntensity[s.col] = intensities[i];
                ++i;
            });

            console.log('rev sortBy', sortBy);

            sortBy.forEach((s: sortInfo) => {
                if (form) {
                    console.log('sort>>>');
                    sortByStringProperty(form.checklists, 'col', s.ascending);
                }
            });

            form.checklists = form.checklists;
        }

        isSorting = false;
    }
</script>

<DoubledContainer rightBodyClasses={loading ? 'overflow-hidden pr-4' : 'overflow-hidden'}>
    <svelte:fragment slot="leftBody">
        <div>
            <form method="POST" class="p-4 space-y-2" action="?/query" use:enhance={runSearch}>
                <StateCountyPicker initialHideUnmonitoredChoice={Number(config.initialHideUnmonitoredChoice)} />
                <SpeciesPicker initialUseLatinChoice={Number(config.initialUseLatinChoice)} />
                <TimeframePicker initialDateRangeChoice={Number(config.initialDateRangeChoice)} />
                <hr />
                <div class="flex">
                    <button disabled={loading} class="btn variant-filled disabled:bg-secondary-500 [&>span]:disabled:animate-spin w-auto justify-between mx-auto" type="submit">
                        Run Search &nbsp<span class="">→</span>
                    </button>
                </div>
            </form>
        </div>
    </svelte:fragment>

    <!--
        TODO: Revisit skeleton tables with the newer table support per https://www.skeleton.dev/docs/ssd
    -->
    <svelte:fragment slot="rightBody">
        {#if loading}
            <div class="w-full h-full pl-4 pt-2 animate-pulse variant-filled-surface hover:cursor-wait">Loading...</div>
        {:else if form?.success}
            <div class="w-[calc(100%_-_1em)] h-full">

                <!-- Header-Sort Controls -->
                <div class="flex h-[4.75em]">
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

                <!-- Results -->
                <div class="overflow-y-auto h-[calc(100%_-_120px)] xl:h-[calc(100%_-_96px)]">
                    {#each form.checklists as checklist, i}
                        <div class="flex">
                            <div class="w-28 pl-2">{checklist.region}</div>
                            <div class="w-28 pl-2">{checklist.county}</div>
                            <div class="basis-[calc(45%_-_calc(0.45_*_224px))] pl-2">{checklist.commonName}</div>
                            <div class="flex-auto pl-2">{checklist.scientificName}</div>
                        </div>
                    {/each}
                </div>

                <hr />

                <!-- Tallies -->
                <div class="flex h-12 xl:h-6">
                    <div class="w-28 pl-4">{[...new Set(form.checklists.map((x) => x.region))].length}</div>
                    <div class="w-28 pl-4">{[...new Set(form.checklists.map((x) => x.county))].length}</div>
                    <div class="basis-[calc(45%_-_calc(0.45_*_224px))] pl-4">{[...new Set(form.checklists.map((x) => x.commonName))].length}</div>
                    <div class="basis-[calc(45%_-_calc(0.45_*_224px))] pl-4 flex flex-row justify-between">
                        <div class="">{[...new Set(form.checklists.map((x) => x.commonName))].length}</div>
                        <div class="">↤ Totals</div>
                    </div>
                </div>
            </div>
        {/if}
    </svelte:fragment>
</DoubledContainer>

<!--
    //import { TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
....
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
