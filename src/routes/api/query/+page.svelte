<script lang="ts">
    import * as config from '$lib/config';
    import StateCountyPicker from '$lib/components/query/StateCountyPicker.svelte';
    import SpeciesPicker from '$lib/components/query/SpeciesPicker.svelte';
    import TimeframePicker from '$lib/components/query/TimeframePicker.svelte';
    import DoubledContainer from '$lib/components/DoubledContainer.svelte';
    import { TreeView, TreeViewItem } from '@skeletonlabs/skeleton';

    export let data;
    export let form;
    
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
            <p>here are {form.checklists.length} snouts.</p>
            <div>
                {#each form.checklists as checklist}
                <div>checklist.county</div>
                <div>checklist.region</div>
                <div>checklist.commonName</div>
                {/each}
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
