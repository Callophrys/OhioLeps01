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

    $: {
        if (form?.success) {
            form.checklists.forEach((cs: countySpecimen) => {
                countedRegions[cs.region] = 1 + (countedRegions[cs.region] ?? 0);
                countedCounties[cs.county] = 1 + (countedCounties[cs.county] ?? 0);
                countedSpecies[cs.checklistId] = 1 + (countedRegions[cs.checklistId] ?? 0);
            });
        }

        console.log('countedRegions', countedRegions);
        console.log('countedCounties', countedCounties);
        console.log('countedSpecies', countedSpecies);
    }

    /*
    console.log('data', data);
    */
    console.log('form', form);
</script>

<DoubledContainer>
    <svelte:fragment slot="left">
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

    <svelte:fragment slot="right-head">
        <span class="">Results</span>
    </svelte:fragment>
    <svelte:fragment slot="right">
        {#if form?.success}
            <!-- Responsive Container (recommended) -->
            <div class="table-container">
                <!-- Native Table Element -->
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Region</th>
                            <th>County</th>
                            <th>Common Name</th>
                            <th>Scientific Name</th>
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
                            <td>{countedRegions.length}</td>
                            <td>{countedCounties.length}</td>
                            <td colspan="2">{countedSpecies.length}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        {/if}
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
    </svelte:fragment>
</DoubledContainer>
