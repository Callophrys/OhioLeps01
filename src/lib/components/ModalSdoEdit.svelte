<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    import type { ChecklistScientificName } from '$lib/types';

    import { getModalStore } from '@skeletonlabs/skeleton';

    // import { page } from '$app/stores';
    // import { getContext } from 'svelte';
    // import SpeciesPicker from './datanavigation/SpeciesPicker.svelte';
    // const config: any = $page.data.config ?? {};
    // let speciesChecklist: ChecklistScientificName[] = getContext('speciesList');
    // console.log('speciesChecklsit', speciesChecklist);

    // Props
    /** Exposes parent props to this component. */
    let { parent }: { parent: SvelteComponent } = $props();

    const modalStore = getModalStore();
    let checklist: ChecklistScientificName[] = $modalStore[0].value.checklist as ChecklistScientificName[];

    const formData = $state({
        siteDateId: $modalStore[0].value.siteDateId,
        idCode: null, //how id'ed:  O observ, N net, P photo, C collected
        checklistId: null,
        section1: null,
        section2: null,
        section3: null,
        section4: null,
        section5: null,
        section6: null,
        section7: null,
        section8: null,
        section9: null,
        section10: null,
        section11: null,
        section12: null,
        section13: null,
        section14: null,
        section15: null,
    });

    let hodges = $derived(checklist.find((x: ChecklistScientificName) => x.checklistId === formData.checklistId)?.hodges);

    // Custom submit function to pass the response and close the modal.
    function onFormSubmit(e: Event): void {
        e.preventDefault();
        if ($modalStore[0].response) {
            // console.log(formData);
            $modalStore[0].response(formData);
        }
        modalStore.close();
    }

    // Base Classes
    const cBase = 'card p-4 w-modal shadow-xl space-y-4';
    const cHeader = 'text-2xl font-bold';
    const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

{#if $modalStore[0]}
    <div class={cBase}>
        <header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
        <article>{$modalStore[0].body ?? '(body missing)'}</article>
        <!-- Enable for debugging: -->
        <form class="modal-form {cForm}">
            <div class="flex flex-row space-x-4">
                <div>
                    <span>Year</span>
                    <div class="input w-16 min-h-6 py-2 px-3 mt-1">{$modalStore[0].value.year}</div>
                </div>
                <div>
                    <span>Week</span>
                    <div class="input w-16 min-h-6 py-2 px-3 mt-1">{$modalStore[0].value.week}</div>
                </div>
                <div>
                    <span>Hodges</span><!-- Could make this enterable and an auto-complete in case people know specimens by number -->
                    <div class="input w-24 min-h-6 py-2 px-3 mt-1">{hodges}</div>
                </div>
                <label class="label flex flex-col">
                    <span>Id Method</span>
                    <select class="input w-32" bind:value={formData.idCode} placeholder="Method of Id...">
                        <option value="O">Observed</option>
                        <option value="C">Collected</option>
                        <option value="N">Net</option>
                        <option value="P">Photo</option>
                    </select>
                </label>
            </div>
            <label class="label">
                <span>Name</span>
                <select class="input" bind:value={formData.checklistId} placeholder="Select specimen...">
                    {#each checklist as specimen}
                        <option value={specimen.checklistId}>{specimen.commonName} - {specimen.scientificName}</option>
                    {/each}
                </select>
            </label>
            <!-- <SpeciesPicker currentSdoChecklistItemId={formData.checklistId} initialUseLatinChoice={Number(config.initialUseLatinChoice)} /> -->
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                <label class="label"><span class="w-20 inline-block">Section 1</span><input class="input w-16" type="number" min="0" bind:value={formData.section1} placeholder="∅" /></label>
                <label class="label"><span class="w-20 inline-block">Section 2</span><input class="input w-16" type="number" min="0" bind:value={formData.section2} placeholder="∅" /></label>
                <label class="label"><span class="w-20 inline-block">Section 3</span><input class="input w-16" type="number" min="0" bind:value={formData.section3} placeholder="∅" /></label>
                <label class="label"><span class="w-20 inline-block">Section 4</span><input class="input w-16" type="number" min="0" bind:value={formData.section4} placeholder="∅" /></label>
                <label class="label"><span class="w-20 inline-block">Section 5</span><input class="input w-16" type="number" min="0" bind:value={formData.section5} placeholder="∅" /></label>
                <label class="label"><span class="w-20 inline-block">Section 6</span><input class="input w-16" type="number" min="0" bind:value={formData.section6} placeholder="∅" /></label>
                <label class="label"><span class="w-20 inline-block">Section 7</span><input class="input w-16" type="number" min="0" bind:value={formData.section7} placeholder="∅" /></label>
                <label class="label"><span class="w-20 inline-block">Section 8</span><input class="input w-16" type="number" min="0" bind:value={formData.section8} placeholder="∅" /></label>
                <label class="label"><span class="w-20 inline-block">Section 9</span><input class="input w-16" type="number" min="0" bind:value={formData.section9} placeholder="∅" /></label>
                <label class="label"><span class="w-20 inline-block">Section 10</span><input class="input w-16" type="number" min="0" bind:value={formData.section10} placeholder="∅" /></label>
                <label class="label"><span class="w-20 inline-block">Section 11</span><input class="input w-16" type="number" min="0" bind:value={formData.section11} placeholder="∅" /></label>
                <label class="label"><span class="w-20 inline-block">Section 12</span><input class="input w-16" type="number" min="0" bind:value={formData.section12} placeholder="∅" /></label>
                <label class="label"><span class="w-20 inline-block">Section 13</span><input class="input w-16" type="number" min="0" bind:value={formData.section13} placeholder="∅" /></label>
                <label class="label"><span class="w-20 inline-block">Section 14</span><input class="input w-16" type="number" min="0" bind:value={formData.section14} placeholder="∅" /></label>
                <label class="label"><span class="w-20 inline-block">Section 15</span><input class="input w-16" type="number" min="0" bind:value={formData.section15} placeholder="∅" /></label>
            </div>
        </form>
        <!-- prettier-ignore -->
        <footer class="{parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" onclick={parent.onClose}>{parent.buttonTextCancel}</button>
            <button class="btn {parent.buttonPositive}" onclick={onFormSubmit}>Submit Form</button>
        </footer>
    </div>
{/if}
