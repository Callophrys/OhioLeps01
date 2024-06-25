<script lang="ts">
    import type { SvelteComponent } from 'svelte';

    // Stores
    import { getModalStore } from '@skeletonlabs/skeleton';
    import SpeciesPicker from './datanavigation/SpeciesPicker.svelte';

    // Props
    /** Exposes parent props to this component. */
    export let parent: SvelteComponent;

    const modalStore = getModalStore();
    // Form Data
    // Hodges, idCode, siteDateId, section1..15
    const formData = {
        hodges: '&nbsp;',
        idCode: null, //how id'ed:  O observ, N net, P photo, C collected
        checklistId: null,
        section1: 0,
        section2: 0,
        section3: 0,
        section4: 0,
        section5: 0,
        section6: 0,
        section7: 0,
        section8: 0,
        section9: 0,
        section10: 0,
        section11: 0,
        section12: 0,
        section13: 0,
        section14: 0,
        section15: 0,
    };

    let checklist = $modalStore[0].value.checklist;

    // We've created a custom submit function to pass the response and close the modal.
    function onFormSubmit(): void {
        if ($modalStore[0].response) {
            formData.hodges = formData.hodges.replace('&nbsp;', '');
            console.log(formData);
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
                    <div class="input w-16 min-h-6 py-2 px-3 mt-1">{@html formData.hodges}</div>
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
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                <label class="label"><span class="w-20 inline-block">Section 1</span><input class="input w-16" type="number" bind:value={formData.section1} placeholder="Section 1..." /></label>
                <label class="label"><span class="w-20 inline-block">Section 2</span><input class="input w-16" type="number" bind:value={formData.section2} placeholder="Section 2..." /></label>
                <label class="label"><span class="w-20 inline-block">Section 3</span><input class="input w-16" type="number" bind:value={formData.section3} placeholder="Section 3..." /></label>
                <label class="label"><span class="w-20 inline-block">Section 4</span><input class="input w-16" type="number" bind:value={formData.section4} placeholder="Section 4..." /></label>
                <label class="label"><span class="w-20 inline-block">Section 5</span><input class="input w-16" type="number" bind:value={formData.section5} placeholder="Section 5..." /></label>
                <label class="label"><span class="w-20 inline-block">Section 6</span><input class="input w-16" type="number" bind:value={formData.section6} placeholder="Section 6..." /></label>
                <label class="label"><span class="w-20 inline-block">Section 7</span><input class="input w-16" type="number" bind:value={formData.section7} placeholder="Section 7..." /></label>
                <label class="label"><span class="w-20 inline-block">Section 8</span><input class="input w-16" type="number" bind:value={formData.section8} placeholder="Section 8..." /></label>
                <label class="label"><span class="w-20 inline-block">Section 9</span><input class="input w-16" type="number" bind:value={formData.section9} placeholder="Section 9..." /></label>
                <label class="label"><span class="w-20 inline-block">Section 10</span><input class="input w-16" type="number" bind:value={formData.section10} placeholder="Section 10..." /></label>
                <label class="label"><span class="w-20 inline-block">Section 11</span><input class="input w-16" type="number" bind:value={formData.section11} placeholder="Section 11..." /></label>
                <label class="label"><span class="w-20 inline-block">Section 12</span><input class="input w-16" type="number" bind:value={formData.section12} placeholder="Section 12..." /></label>
                <label class="label"><span class="w-20 inline-block">Section 13</span><input class="input w-16" type="number" bind:value={formData.section13} placeholder="Section 13..." /></label>
                <label class="label"><span class="w-20 inline-block">Section 14</span><input class="input w-16" type="number" bind:value={formData.section14} placeholder="Section 14..." /></label>
                <label class="label"><span class="w-20 inline-block">Section 15</span><input class="input w-16" type="number" bind:value={formData.section15} placeholder="Section 15..." /></label>
            </div>
        </form>
        <!-- prettier-ignore -->
        <footer class="{parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
            <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Submit Form</button>
        </footer>
    </div>
{/if}
