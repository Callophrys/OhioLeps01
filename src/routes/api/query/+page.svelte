<script lang="ts">
    import * as config from '$lib/config';
    import StateCountyPicker from '$lib/components/query/StateCountyPicker.svelte';
    import SpeciesPicker from '$lib/components/query/SpeciesPicker.svelte';
    import TimeframePicker from '$lib/components/query/TimeframePicker.svelte';
    import DoubledContainer from '$lib/components/DoubledContainer.svelte';
    import { TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
    import { scientificName } from '$lib/utils.js';
    import type { countySpecimen } from '$lib/types.js';

    export let data;
    export let form;

    const countedRegions = Object.create(null);
    const countedCounties = Object.create(null);
    const countedSpecies = Object.create(null);

    const distinctRegions = Object.create(null);
    const distinctCounties = Object.create(null);
    const distinctSpecies = Object.create(null);

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
        }

        console.log('countedRegions', countedRegions);
        console.log('countedCounties', countedCounties);
        console.log('countedSpecies', countedSpecies);

        console.log('distinctRegions', Object.keys(distinctRegions).length);
        console.log('distinctCounties', Object.keys(distinctCounties).length);
        console.log('distinctSpecies', Object.keys(distinctSpecies).length);
    }

    /*
    console.log('data', data);
    console.log('form', form);
    */
</script>

<DoubledContainer rightBodyClasses="overflow-hidden h-[calc(100vh_-_212px)]">
    <svelte:fragment slot="leftBody">
        <div>
            <form method="POST" class="p-4 space-y-2" action="?/query">
                <StateCountyPicker
                    counties={data.counties}
                    initialHideUnmonitoredChoice={config.initialHideUnmonitedChoice}
                />
                <SpeciesPicker
                    speciesChecklist={data.speciesList}
                    initialUseLatinChoice={config.initialUseLatinChoice}
                />
                <TimeframePicker initialDateRangeChoice={config.initialDateRangeChoice} />
                <hr />
                <div class="flex">
                    <button class="btn variant-filled w-auto justify-between mx-auto">
                        <span>Run Search</span>
                        <span>→</span>
                    </button> &varnothing;
                </div>
            </form>
        </div>
    </svelte:fragment>

    <svelte:fragment slot="rightBody">
        {#if form?.success}
            <!-- Responsive Container (recommended) -->
            <div class="table-container">
                <div class="flex flex-col h-screen">
                <div class="flex-grow overflow-auto scroll-mt-6">
                <table class="table table-hover relative w-full">
                    <thead>
                        <tr>
                            <th class="sticky top-0 px-6 py-3 bg-surface-700 variant-outline-surface rounded-tl">Region&nbsp;</th>
                            <th class="sticky top-0 px-6 py-3 bg-surface-700 variant-outline-surface border-x mr-[-3px]">County&nbsp</th>
                            <th class="sticky top-0 px-6 py-3 bg-surface-700 variant-outline-surface border-x">Common Name&nbsp;</th>
                            <th class="sticky top-0 px-6 py-3 bg-surface-700 variant-outline-surface rounded-tr">Scientific Name&nbsp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each form.checklists as checklist, i}
                            <tr>
                                <td>
                                    {checklist.county}
                                </td>
                                <td>
                                    {checklist.region}
                                </td>
                                <td>
                                    {checklist.commonName}
                                </td>
                                <td>
                                    {scientificName(
                                        checklist.genus,
                                        checklist.species,
                                        checklist.subSpecies
                                    )}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td class="indent-4">{[...new Set(form.checklists.map(x => x.county))].length}</td>
                            <td class="indent-4">{[...new Set(form.checklists.map(x => x.region))].length}</td>
                            <td class="indent-4">{[...new Set(form.checklists.map(x => x.checklistId))].length}</td>
                            <td class="">[Totals of each distinct]</td>
                        </tr>
                    </tfoot>
                </table>
                </div>
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
