<!--
TODO: https://dev.to/theether0/sveltekit-changes-form-actions-and-progressive-enhancement-31h9
TODO: https://rodneylab.com/sveltekit-form-example-with-10-mistakes-to-avoid/  - see ActionData and keeping form data

var x = new Set(["a","b","c","t"]);
var y = new Set(["d","a","t","e","g"]);
var z = y.difference(x) // [ "d", "e", "g" ]

-->
<script lang="ts">
    /*-- Imports */
    import { formatDate, isNullOrWhiteSpace } from '$lib/utils';
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { getModalStore } from '@skeletonlabs/skeleton';
    import { type ModalSettings } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';
    import DataOptions from '$lib/components/datanavigation/DataOptions.svelte';
    import SitePicker from '$lib/components/datanavigation/SitePicker.svelte';
    import SiteDatePicker from '$lib/components/datanavigation/SiteDatePicker.svelte';
    import type { SiteDateObservationChecklist } from '$lib/types.js';
    import SpeciesPicker from '$lib/components/datanavigation/SpeciesPicker.svelte';
    import { setContext } from 'svelte';
    import { afterUpdate } from 'svelte';

    /*-- -- Data -- */
    /*-- Exports */
    export let data;
    export let form;

    /*-- Context */
    setContext('sites', data.sites);
    setContext('siteDates', data.siteDates);
    setContext('checklistsSiteDateObs', data.checklistsSiteDateObs);
    setContext('checklistsSite', data.checklistsSite);
    setContext('checklistsAll', data.checklistsAll);

    /*-- -- Styling -- */
    /*-- Properties (styles) */
    /*-- Constants (styles) */
    const cSectionClasses = 'flex flex-row space-x-2';
    const cSectionSpanClasses = 'w-24';
    const cDataClasses = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 md:gap-2';
    const cDatumClasses = 'flex flex-row space-x-2';
    const cButtonStandard = "btn w-24 md:w-28 h-8 sm:h-10 md:h-11 variant-filled-surface pb-2";
    const cButtonSuccess = "btn w-24 md:w-28 h-8 sm:h-10 md:h-11 variant-soft-success pb-2";
    const cButtonCancel = "btn w-24 md:w-28 h-8 sm:h-10 md:h-11 variant-soft-error pb-2";

    /*-- Variables (styles) */
    /*-- Reactives (styles) */
    /*-- -- Coding -- */
    /*-- Enums */
    /*-- Constants (functional) */
    const modalReviewerLock: ModalSettings = {
        type: 'prompt',
        // Data
        title: 'Review and lock.',
        body: 'Provide any notes in the field below.',
        // Populates the input value and attributes
        value: 'Data has been reviewed and is valid.',
        valueAttr: { type: 'text', minlength: 0, maxlength: 128, required: true },
        // Returns the updated response value
        response: (r: any) => {
            console.log('response:', r);
            if (r) {
                formReview.submit();
            }
        },
    };

    const modalReviewerUnlock: ModalSettings = {
        type: 'prompt',
        // Data
        title: 'Unlock record',
        body: 'Provide reason for unlocking previously reviewed data.',
        // Populates the input value and attributes
        value: 'Unlocking data for revision.',
        valueAttr: { type: 'text', minlength: 0, maxlength: 128, required: true },
        // Returns the updated response value
        response: (r: string) => {
            console.log('response:', r);
            if (r) {
                formReview.submit();
            }
        },
    };

    const modalDelete: ModalSettings = {
        type: 'prompt',
        title: 'Delete observation',
        body: 'Provide reason for deleting the observation.',
        value: 'Deleting data due to...',
        valueAttr: { type: 'text', minlength: 0, maxlength: 256, required: true },
        response: (r: string) => {
            if (r) {
                formDelete.submit();
            }
        },
    };

    const modalUndelete: ModalSettings = {
        type: 'prompt',
        title: 'Undelete observation',
        body: 'Beware that undeleting any record could create conflicts and unpredictable behavior if a valid replacement record currently exists.',
        value: 'Undeleting data due to...',
        valueAttr: { type: 'text', minlength: 0, maxlength: 256, required: true },
        response: (r: string) => {
            if (r) {
                formDelete.submit();
            }
        },
    };

    /*-- Properties (functional) */
    let formAdd: HTMLFormElement;
    let formEdit: HTMLFormElement;
    let formReview: HTMLFormElement;
    let formDelete: HTMLFormElement;
    let formUndo: HTMLFormElement;

    /*-- Variables and objects */
    let isEditing = false;
    let isAdding = false;

    let showRecentEdits = true;
    let showDeletedData = false;

    let x: string = localStorage?.showRecentEdits;
    if (x && x.length) {
        showRecentEdits = x === '1';
    }

    x = localStorage?.showDeletedData;
    if (x && x.length) {
        showDeletedData = x === '1';
    }

    /*-- Run first stuff */
    const modalStore = getModalStore();

    /*-- onMount, beforeNavigate, afterNavigate */
    /*-- Handlers */
    const handleChange = () => {
        total = getTotal();
        return true;
    };

    /*-- Methods */
    const clearCounts = () => {
        return Array.from(formAdd.querySelectorAll('[type=text]')).forEach((c: any) => c.value = '');
    }

    const sumCounts = (frm: Element) => {
        if (typeof document === 'undefined' && typeof frm === 'undefined') return false;
        return (document && frm) ? Array.from(frm.querySelectorAll('[type=text]')).reduce((t: number, o: any) => t + (isNaN(o.value) ? 0 : Number(o.value)), 0) : 0;
    }

    const getTotal = () => {
        return isAdding ? sumCounts(formAdd) : (isEditing ? sumCounts(formEdit) : data.siteDateObservation.total);
    }

    /*-- Reactives (functional) */
    $: total = getTotal();
    $: currentSiteDateObservation = data.siteDateObservation as SiteDateObservationChecklist;
    //$: rxTotal = isAdding ? sumCounts(formAdd) : (isEditing ? sumCounts(formEdit) : currentSiteDateObservation.total);

    $: sdoSections = Object.entries(currentSiteDateObservation)
        .filter((x) => x[0].startsWith('section'))
        .map(([k, v]) => ({ label: `${k.substring(0, 1).toLocaleUpperCase()}${k.substring(1, 7)} ${k.substring(7)}`, name: k, value: v }));
    //console.log(sdoSections);

    /*-- Other */
    afterUpdate(() => {
        localStorage.setItem('showRecentEdits', showRecentEdits ? '1' : '0');
        localStorage.setItem('showDeletedData', showDeletedData ? '1' : '0');
    });

    //if (form) console.log('form>>', form);
    //console.log(data);

</script>

<DataOptions bind:showRecentEdits bind:showDeletedData />

<StandardContainer>
    <svelte:fragment slot="standardBody">
        {#if $page.data.user}
            <div class="pr-4">
                <!-- Header and options -->
                <!-- TODO: make this flex better for responsive sizings -->
                <div class="flex flex-col lg:flex-row lg:justify-start gap-1 lg:gap-2 pb-2 text-surface-600-300-token">
                    <SitePicker currentSite={data.siteDateObservation.siteDate.site} />
                    <SiteDatePicker currentSiteId={data.siteDateObservation.siteDate.siteId} currentSiteDateId={data.siteDateObservation.siteDateId ?? -1} />
                    <SpeciesPicker
                        currentSdoChecklistItemId={currentSiteDateObservation.siteDateObservationId}
                        isAdding={isAdding}
                        isEditing={isEditing}
                        showDeletedData={showDeletedData}
                    />
                </div>

                <!-- Main controls -->
                <div class="px-4 flex flex-auto justify-between gap-2">
                    <div class="flex flex-row justify-start gap-2">
                        {#if $page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN' || $page.data.user.role === 'ENTRY' || $page.data.user.role === 'REVIEWER'}
                            {#if isAdding}
                                <button type="button" class={cButtonStandard} disabled>
                                    Edit
                                    <span class="pl-2">✎</span>
                                </button>
                            {:else if !isEditing}
                                {#if data.siteDateObservation.confirmed}
                                    <button type="button" class={cButtonStandard} disabled>
                                        Edit
                                        <span class="pl-2">✎</span>
                                    </button>
                                {:else}
                                    <button type="button" class={cButtonStandard} on:click={() => (isEditing = true)}>
                                        Edit
                                        <span class="pl-2">✎</span>
                                    </button>
                                {/if}
                            {:else}
                                <button type="button" class={cButtonSuccess} on:click={() => formEdit?.submit()}>
                                    Save
                                    <span class="pl-2">✔</span>
                                </button>

                                <!-- TODO: Make undo-redo work, maybe go with left-right group button -->
                                <form name="undo" method="POST" action="?/undoRedoSiteDateObservation" use:enhance bind:this={formUndo}>
                                    <!-- UNDO/REDO undo last action, edit or delete done by entry or reviewer - of course permissions matter -->
                                    <!-- TODO toggle undo and redo on same control -->
                                    <div class="btn-group variant-soft">
                                        <button disabled>
                                            <span class="pr-2 font-extrabold text-amber-700 dark:text-amber-400 group-disabled:text-inherit !group-disabled:font-extrabold">↺</span>
                                            Undo
                                        </button>
                                        <button disabled>
                                            Redo
                                            <span class="pl-2 font-extrabold text-amber-700 dark:text-amber-400 group-disabled:text-inherit !group-disabled:font-extrabold">↻</span>
                                        </button>
                                    </div>
                                </form>

                                <button type="button" class={cButtonCancel} on:click={() => (isEditing = false)}>
                                    Cancel
                                    <span class="pl-2 text-red-700 dark:text-red-600 text-2xl">↺</span>
                                </button>
                            {/if}
                        {/if}

                        {#if isAdding}
                            <button type="button" class="btn w-24 md:w-28 h-8 sm:h-10 md:h-11 variant-filled-surface pb-2" disabled>Review<span class="pl-2">🌎</span></button>
                            <button type="button" class="btn w-24 md:w-28 h-8 sm:h-10 md:h-11 variant-filled-surface pb-2" disabled>Delete<span class="pl-2">❌</span></button>
                        {:else if !isEditing}
                            <!-- REVIEW Actions -->
                            <form name="review" method="POST" action="?/reviewSiteDateObservation" use:enhance bind:this={formReview}>
                                <!-- LOCK/UNLOCK Mark data as reviewed, aka valid and locked; Can unlock -->
                                {#if $page.data.user && ($page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN' || $page.data.user.role === 'REVIEWER')}
                                    {#if $page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN' || ($page.data.user.role === 'REVIEWER' && (!data.siteDateObservation.confirmBy || data.siteDateObservation.confirmBy === $page.data.user.id))}
                                        {#if isNullOrWhiteSpace(data.siteDateObservation.confirmBy?.id)}
                                            <input hidden name="confirm" value="true" />
                                            <button type="button" class={cButtonStandard} on:click={() => modalStore.trigger(modalReviewerLock)}>Review<span class="pl-2">🌎</span></button>
                                        {:else if !data.siteDateObservation.confirmed}
                                            <input hidden name="confirm" value="true" />
                                            <button type="button" class={cButtonStandard} on:click={() => modalStore.trigger(modalReviewerLock)}>Lock<span class="pl-2">🔒</span></button>
                                        {:else}
                                            <input hidden name="confirm" value="false" />
                                            <button type="button" class={cButtonStandard} on:click={() => modalStore.trigger(modalReviewerUnlock)}>Unlock<span class="pl-2">🔑</span></button>
                                        {/if}
                                    {:else}
                                        <button type="button" class={cButtonStandard} disabled>
                                            {#if typeof data.siteDateObservation.confirmBy !== 'object'}
                                                <div>Needs review <span class="pl-2">🌎</span></div>
                                            {:else if data.siteDateObservation.confirmed}
                                                <div>Locked<span class="pl-2">🔐</span></div>
                                            {:else}
                                                <div>Unlocked<span class="pl-2">🔓</span></div>
                                            {/if}
                                        </button>
                                    {/if}
                                {/if}
                                <input hidden name="siteDateObservationId" value={data.siteDateObservation.siteDateObservationId} />
                            </form>

                            <!-- A. DELETE Actions -->
                            {#if !data.siteDateObservation.confirmed && ($page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN' || ($page.data.user.role === 'ENTRY' && (data.siteDateObservation.createdBy.id === $page.data.user.id || data.siteDateObservation.updatedBy.id === $page.data.user.id)))}
                                <form name="delete" method="POST" action="?/deleteSiteDateObservation" use:enhance bind:this={formDelete}>
                                    {#if !data.siteDateObservation.deleted}
                                        <button type="button" class={cButtonStandard} on:click={() => modalStore.trigger(modalDelete)}>Delete<span class="pl-2">❌</span></button>
                                        <input hidden name="deleteOn" value={true} />
                                    {:else}
                                        <button type="button" class={cButtonStandard} on:click={() => modalStore.trigger(modalUndelete)}>Undelete<span class="pl-2">↺</span></button>
                                        <input hidden name="deleteOn" value={false} />
                                    {/if}
                                    <input hidden name="siteDateObservationId" value={data.siteDateObservation.siteDateObservationId} />
                                    <input hidden name="siteDateId" value={data.siteDateObservation.siteDateId} />
                                    <input hidden name="checklistId" value={data.siteDateObservation.checklistId} />
                                    <input hidden name="useLatinSort" value={true} />
                                    <input hidden name="sortDirection" value="asc" />
                                    <input hidden name="advanceRecord" value={true} />
                                </form>
                            {/if}
                        {/if}
                    </div>

                    <div class="flex flex-row gap-2">
                        <div>
                            <button type="button" class="btn w-44 h-8 sm:h-10 md:h-11 variant-filled-surface pb-2">
                                View all species
                                <span class="pl-2 text-green-900 dark:text-green-200 text-2xl">🔎</span>
                            </button>
                        </div>

                        <!-- TODO: Make add/create work -->
                        <button type="button" class="btn w-44 h-8 sm:h-10 md:h-11 variant-filled-surface pb-2" on:click={() => isAdding = !isAdding} disabled={isEditing || data.siteDateObservation.confirmed}>
                            <input class="checkbox" type="checkbox" checked={isAdding} />
                            {#if isAdding}
                                <span>Cancel Add</span>
                                <span class="pl-2 text-red-700 dark:text-red-600 text-2xl">↺</span>
                            {:else}
                                <span>Add species</span>
                                <span class="text-green-900 dark:text-green-200 text-2xl before:content-['✚']" />
                            {/if}
                        </button>
                    </div>
                </div>

                <!-- Action messages -->
                <div class="text-success-900-50-token h-6">
                    {#if form?.success}
                        {#if form.action === 'save'}
                            Successful update ✔.
                        {:else if form.action === 'review'}
                            Successful {@html form.siteDateObservation?.confirmed ? 'LOCK 🔐' : 'UNLOCK 🔓'} of record.
                        {:else if form.action === 'delete'}
                            Successful delete 💥.
                        {:else if form.action === 'undelete'}
                            Successful undelete ✔.
                        {/if}
                    {/if}
                </div>

                <!-- START Data controls group -->
                <div class={`${data.siteDateObservation.deleted ? 'line-through variant-ghost-error' : ''}`}>
                    <!-- DATA Heading -->
                    <div class="flex flex-row justify-between font-bold">
                        <div>
                            {data.siteDateObservation.checklist.scientificName}
                        </div>
                        <div>
                            {data.siteDateObservation.checklist.commonName}
                        </div>
                    </div>
                    <div class="flex flex-row space-x-4">
                        {#if isAdding}
                            <!-- TODO: Update on some kind of selector -->
                            <div class="w-32">Hodges: </div>
                            <!-- TODO: Make Id Code editable -->
                            <div class="w-24">Id Code: </div>
                            <div class="w-28 text-amber-700 dark:text-amber-400">(Total: {getTotal()})</div>
                        {:else if isEditing && getTotal() !== currentSiteDateObservation.total}
                            <div class="w-32">Hodges: {currentSiteDateObservation.hodges}</div>
                            <div class="w-24">Id Code: {currentSiteDateObservation.idCode}</div>
                            <div class="w-28 text-amber-700 dark:text-amber-400">(Total: {getTotal()})</div>
                        {:else}
                            <div class="w-32">Hodges: {currentSiteDateObservation.hodges}</div>
                            <div class="w-24">Id Code: {currentSiteDateObservation.idCode}</div>
                            <div class="w-28">(Total: {currentSiteDateObservation.total})</div>
                        {/if}
                    </div>
                    <!-- LOOKAT: https://stackoverflow.com/questions/77420975/svelte-store-calculate-total-value-of-items-in-array-of-objects -->

                    <hr />

                    <!-- DATA Details -->
                    {#if isEditing}
                        <!-- TODO: Indicate when data has changed -->
                        <form name="edit" method="POST" action="?/saveSiteDateObservation" use:enhance bind:this={formEdit}>
                            <input type="hidden" name="siteDateObservationId" value={data.siteDateObservation.siteDateObservationId} />
                            <div class={cDataClasses}>
                                {#each sdoSections as section}
                                    <div class={cDatumClasses}>
                                        <label class={cSectionClasses}>
                                            <span class={cSectionSpanClasses}>{section.label}:</span>
                                            <input type="text" name={section.name} value={section.value ?? ''} class="w-8 text-center text-black" on:input={() => total = getTotal()} />
                                            <input type="hidden" name={`${section.name}_orig`} value={section.value ?? ''} />
                                        </label>
                                    </div>
                                {/each}
                            </div>
                        </form>
                    {:else if isAdding}
                        <form name="add" method="POST" action="?/addSiteDateObservation" use:enhance bind:this={formAdd}>
                            <div class={cDataClasses}>
                                {#each sdoSections as section}
                                    <div class={cDatumClasses}>
                                        <label class={cSectionClasses}>
                                            <span class={cSectionSpanClasses}>{section.label}:</span>
                                            <input type="text" name={section.name} class="w-8 text-center text-black" on:input={handleChange} />
                                        </label>
                                    </div>
                                {/each}
                            </div>
                        </form>
                    {:else}
                        <!-- TODO: Consider indicator to show newly updated data -->
                        <div class={cDataClasses}>
                            {#each sdoSections as section}
                                <div class={cDatumClasses}>
                                    <div class={cSectionClasses}>
                                        <div class={cSectionSpanClasses}>{section.label}:</div>
                                        <div class="w-8">{@html section.value ?? '&varnothing;'}</div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {/if}

                    <hr />

                    <!-- AUDIT Summary -->
                    <div class="flex flex-row flex-wrap justify-between">
                        <div class="flex flex-col basis-60">
                            <div>Created At: {!isAdding && data.siteDateObservation.createdAt ? formatDate(new Date(data.siteDateObservation.createdAt).toISOString(), 'short', 'short') : ''}</div>
                            <div class="">Created By: {!isAdding ? (data.siteDateObservation.createdBy?.lastFirst ?? '') : $page.data.user.lastFirst}</div>
                        </div>
                        <div class="flex flex-col basis-60">
                            <div>Updated At: {!isAdding && data.siteDateObservation.updatedAt ? formatDate(new Date(data.siteDateObservation.updatedAt).toISOString(), 'short', 'short') : ''}</div>
                            <div class="">Updated By: {!isAdding ? (data.siteDateObservation.updatedBy?.lastFirst ?? '') : ''}</div>
                        </div>
                        <div class="flex flex-col basis-60">
                            <div>Confirm At: {!isAdding && data.siteDateObservation.confirmAt ? formatDate(new Date(data.siteDateObservation.confirmAt).toISOString(), 'short', 'short') : ''}</div>
                            <div class="">Confirm By: {!isAdding ? (data.siteDateObservation.confirmBy?.lastFirst ?? '') : ''}</div>
                        </div>
                    </div>
                </div>
                <!-- END Data controls group -->
            </div>
        {/if}
    </svelte:fragment>

</StandardContainer>
