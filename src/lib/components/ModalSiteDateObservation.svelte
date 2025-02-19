<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    import type { ChecklistScientificName, SiteDateObservationChecklist } from '$lib/types';
    import { enhance } from '$app/forms';
    import { getModalStore } from '@skeletonlabs/skeleton';

    // Props
    /** Exposes parent props to this component. */
    let { parent }: { parent: SvelteComponent } = $props();

    const modalStore = getModalStore();

    const sdo = $modalStore[0].value.siteDateObservation as SiteDateObservationChecklist;

    const formData = $state(
        sdo
            ? {
                  siteDateId: $modalStore[0].value.siteDateId,
                  idCode: sdo.idCode, //how id'ed:  O observ, N net, P photo, C collected
                  checklistId: sdo.checklistId,
                  section1: sdo.section1,
                  section2: sdo.section2,
                  section3: sdo.section3,
                  section4: sdo.section4,
                  section5: sdo.section5,
                  section6: sdo.section6,
                  section7: sdo.section7,
                  section8: sdo.section8,
                  section9: sdo.section9,
                  section10: sdo.section10,
                  section11: sdo.section11,
                  section12: sdo.section12,
                  section13: sdo.section13,
                  section14: sdo.section14,
                  section15: sdo.section15,
              }
            : {
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
              }
    );

    const htmlHodges = (h: string | null | undefined) => (!h || h === 'null' ? '&varnothing;' : h);

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
    let checklist: ChecklistScientificName[] = $modalStore[0].value.checklist as ChecklistScientificName[];
    let hodges = $derived(htmlHodges(checklist.find((x: ChecklistScientificName) => x.id === formData.checklistId)?.hodges));
</script>

{#if $modalStore[0]}
    <div class={cBase}>
        <header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
        <article>{$modalStore[0].body ?? '(body missing)'}</article>
        <!-- Enable for debugging: -->
        <form class="modal-form {cForm}" method="post" use:enhance>
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
                    <div class="input w-24 min-h-6 py-2 px-3 mt-1 cursor-not-allowed" title="Hodges number that matches the selected species">{@html hodges}</div>
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
                        <option value={specimen.id}>{specimen.commonName} - {specimen.scientificName}</option>
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
            <button class="btn {parent.buttonPositive}" onclick={onFormSubmit}>Save</button>
        </footer>
    </div>
{/if}
