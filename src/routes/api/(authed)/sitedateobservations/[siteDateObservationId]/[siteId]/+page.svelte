<!--
TODO: https://dev.to/theether0/sveltekit-changes-form-actions-and-progressive-enhancement-31h9
TODO: https://rodneylab.com/sveltekit-form-example-with-10-mistakes-to-avoid/  - see ActionData and keeping form data
-->
<script lang="ts">
    /*-- Imports */
    import { type ModalSettings } from '@skeletonlabs/skeleton';
    import type { SiteDateObservationChecklist } from '$lib/types.js';
    import Container from '$lib/components/layouts/Container.svelte';
    import { formatDate, isNullOrWhiteSpace, weekOfYearSince } from '$lib/utils';
    import { getModalStore } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';
    import DataOptions from '$lib/components/datanavigation/DataOptions.svelte';
    import YearWeek from '$lib/components/datanavigation/YearWeek.svelte';
    import SitePicker from '$lib/components/datanavigation/SitePicker.svelte';
    import SiteDatePicker from '$lib/components/datanavigation/SiteDatePicker.svelte';
    import SpeciesPicker from '$lib/components/datanavigation/SpeciesPicker.svelte';
    import { setContext } from 'svelte';
    import { onMount } from 'svelte';
    import GoBack from '$lib/components/datanavigation/GoBack.svelte';
    //import GoNext from '$lib/components/datanavigation/GoNext.svelte';
    import { GOTYPE } from '$lib/types.js';

    /*-- -- Data -- */
    /*-- Exports */
    let { data, form } = $props();

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
    const cButtonStandard = 'btn w-24 md:w-28 h-8 sm:h-10 md:h-11 pb-2 variant-filled-surface';
    const cButtonWider = 'btn w-28 md:w-36 h-8 sm:h-10 md:h-11 pb-2 variant-filled-surface';
    const cButtonSuccess = 'btn w-24 md:w-28 h-8 sm:h-10 md:h-11 pb-2 variant-soft-success';
    const cButtonCancel = 'btn w-24 md:w-28 h-8 sm:h-10 md:h-11 pb-2 variant-filled-error';
    const cButtonAddView = 'btn w-44         h-8 sm:h-10 md:h-11 pb-2 variant-filled-surface';

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
                // formReview.submit();
                (document.getElementById('formReview') as HTMLFormElement).submit();
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
                // formReview.submit();
                (document.getElementById('formReview') as HTMLFormElement).submit();
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
                // formDelete.submit();
                (document.getElementById('formDelete') as HTMLFormElement).submit();
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
                (document.getElementById('formDelete') as HTMLFormElement).submit();
                // formDelete.submit();
            }
        },
    };

    const modalAdd: ModalSettings = {
        type: 'prompt',
        title: 'Add new (sub)species observation',
        body: 'Create new species record for this site and date.',
        value: 'Add new species observation',
        valueAttr: { type: 'text', minlength: 0, maxlength: 256, required: true },
        buttonTextSubmit: 'Yes',
        buttonTextConfirm: 'Bar',
        response: (r: string) => {
            if (r) {
                isAdding = !isAdding;
            }
        },
    };

    /*-- Properties (functional) */
    // let formReview: HTMLFormElement = $state(document.createElement('form'));
    // let formDelete: HTMLFormElement = $state(document.createElement('form'));

    let isEditing = $state(false);
    let isAdding = $state(false);
    let showHodges = $state(true);
    let showP3 = $state(true);

    let isViewAll: boolean = $state(false);
    let showRecentEdits: boolean = $state(true);
    let showDeletedData: boolean = $state(true);

    /*
    let isViewAll: boolean = $state(() => {
        let x = localStorage?.isViewAll;
        return x && x.length ? x === '1' : false;
    });

    let showRecentEdits: boolean = $state(() => {
        let x = localStorage?.showRecentEdits;
        return x && x.length ? x === '1' : true;
    });

    let showDeletedData: boolean = $state(() => {
        let x = localStorage?.showDeletedData;
        return x && x.length ? x === '1' : true;
    });
    */

    /*-- Variables and objects */
    /*-- Run first stuff */
    const modalStore = getModalStore();

    /*-- onMount */
    // afterUpdate
    /*
    //$effect(() => localStorage.setItem('isViewAll', (isViewAll ? '1' : '0')));
    //$effect(() => localStorage.setItem('showRecentEdits', (showRecentEdits ? '1' : '0')));
    //$effect(() => localStorage.setItem('showDeletedData', (showDeletedData ? '1' : '0')));
    */

    /*-- Handlers */
    const handleChange = () => {
        // total = getTotal();
        //total = total;
        return true;
    };

    /*-- Methods */
    // const clearCounts = () => {
    //     return Array.from(formAdd.querySelectorAll('[type=text]')).forEach((c: any) => (c.value = ''));
    // };

    // const sumCounts = (frm: Element) => {
    //     if (typeof document === 'undefined' && typeof frm === 'undefined') return false;
    //     return document && frm ? Array.from(frm.querySelectorAll('[type=text]')).reduce((t: number, o: any) => t + (isNaN(o.value) ? 0 : Number(o.value)), 0) : 0;
    // };

    // const getTotal = () => {
    //     if (isAdding) return sumCounts(document.getElementById('formAdd') as Element);
    //     else if (isEditing) return sumCounts(document.getElementById('formEdit') as Element);
    //     else return data.siteDateObservation.total;
    // };

    /*-- Reactives (functional) */
    // let total = $derived(getTotal());
    let currentSiteDateObservation = $derived(data.siteDateObservation as SiteDateObservationChecklist);
    let recordYear = $derived(new Date(currentSiteDateObservation.siteDate.recordDate).getFullYear());
    let recordWeek = $derived(weekOfYearSince(new Date(currentSiteDateObservation.siteDate.recordDate)));
    let recordSdoCount = $derived(data.checklistsSiteDateObs.filter((o: any) => showDeletedData || !o.deleted).length);

    let total: number = 0;
    let sdoSections = $derived.by(() => {
        const result = Object.entries(currentSiteDateObservation)
            .filter((x) => x[0].startsWith('section'))
            .map(([k, v]) => ({ label: `${k.substring(0, 1).toLocaleUpperCase()}${k.substring(1, 7)} ${k.substring(7)}`, name: k, value: v }));
        total = result.reduce((t: number, o: any) => t + (isNaN(o.value) ? 0 : Number(o.value)), 0);
        return result;
    });

    // let total = $derived(sdoSections.reduce((t: number, o: any) => t + (isNaN(o.value) ? 0 : Number(o.value)), 0));
    //console.log(sdoSections);

    let nextSiteDateObservation = $derived(() => {
        let currentIndex = data.siteDates.findIndex((x) => x === currentSiteDateObservation.siteDateId);
        let nextIndex = ++currentIndex % data.siteDates.length;
        return data.siteDates[nextIndex];
    });
    let availableObservations = $derived(data.checklistsSiteDateObs.filter((x: SiteDateObservationChecklist) => showDeletedData || !x.deleted));

    /*-- Other */

    //if (form) console.log('form>>', form);
    //console.log(data);
</script>

<YearWeek year={new Date(data.siteDateObservation.siteDate.recordDate).getFullYear()} week={weekOfYearSince(new Date(data.siteDateObservation.siteDate.recordDate))} sdoCount={recordSdoCount} />
<!-- Hodges and P3 are not implemented yet -->
<!-- <DataOptions bind:showRecentEdits bind:showDeletedData bind:showHodges bind:showP3 /> -->
<DataOptions bind:showMultipleRows={isViewAll} bind:showMultipleRowsDisabled={isEditing} bind:showRecentEdits bind:showDeletedData />

{#snippet body()}
    {#if $page.data.user}
        <div class="pr-4">
            <!-- Header and options -->
            <!-- TODO: make this flex better for responsive sizings -->
            <div class="flex flex-col lg:flex-row lg:justify-between gap-1 lg:gap-2 pb-2 text-surface-600-300-token">
                <div class="flex flex-row">
                    <GoBack targetId={data.siteDateObservation.siteDate.siteDateId} targetType={GOTYPE.SITEDATES} controlBody="scale-90" />
                    <!--
                <GoNext targetId={nextSiteDateObservation.siteDateId} targetIdSecondary={data.siteDateObservation.siteId} targetType={GOTYPE.SITEDATEOBSERVATIONS} targetIdSecondary={data.siteDate.siteId} controlBody="scale-90" controlDisabled={firstSdoId < 0} />
                -->
                    <SitePicker currentSiteId={data.siteDateObservation.siteDate.siteId} controlBody="scale-90" />
                </div>
                <SpeciesPicker currentSdoChecklistItemId={currentSiteDateObservation.siteDateObservationId} {isAdding} {isEditing} {isViewAll} {showDeletedData} controlBody="scale-90" />
                <!-- older one <SiteDatePicker currentSiteId={data.siteDateObservation.siteDate.siteId} currentSiteDateId={data.siteDateObservation.siteDateId ?? -1} controlBody="scale-90" /> -->
                <!-- newer one
                    <SiteDatePicker
                        bind:currentSiteId={currentSiteDateObservation.siteId}
                        bind:currentSiteDateId={currentSiteDateObservation.siteDateId}
                        controlBody="scale-90"
                        buttonLeft=""
                        buttonRight=""
                        buttonYear=""
                        buttonWeek=""
                        dropdownShowDate={false}
                        dropdownPointers={false}
                        heading={null}
                        yearPrefix=""
                        weekPrefix=""
                        controlOuter=""
                        prefixYear=""
                        prefixWeek=""
                        suffixYear=""
                        suffixWeek=""
                        popupInner=""
                        popupStyles=""
                        labelledby="" />
                -->
            </div>

            <!-- Main controls -->
            <div class="px-4 flex flex-auto justify-between gap-2">
                <div class="flex flex-row justify-start gap-2">
                    <!-- EDIT(s) Action -->
                    {#if $page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN' || $page.data.user.role === 'ENTRY' || $page.data.user.role === 'REVIEWER'}
                        {#if isAdding}
                            <button type="button" class={cButtonStandard} disabled>
                                {isViewAll ? 'Edit All' : 'Edit'}
                                <span class="pl-2">✎</span>
                            </button>
                        {:else if !isEditing}
                            {#if data.siteDateObservation.confirmed}
                                <button type="button" class={cButtonStandard} disabled>
                                    {isViewAll ? 'Edit All' : 'Edit'}
                                    <span class="pl-2">✎</span>
                                </button>
                            {:else}
                                <button type="button" class={cButtonStandard} onclick={() => (isEditing = true)}>
                                    {isViewAll ? 'Edit All' : 'Edit'}
                                    <span class="pl-2">✎</span>
                                </button>
                            {/if}
                        {:else}
                            <!-- SAVE UPDATE(s) Action -->
                            <!-- <button type="button" class={cButtonStandard} onclick={() => formEdit?.submit()}> -->
                            <button type="button" class={cButtonStandard}>
                                {isViewAll ? 'Save All' : 'Save'}
                                <span class="pl-2">✎</span>
                            </button>

                            <!-- UNDO/REDO(s) Action -->
                            <!-- TODO: Make undo-redo work, maybe go with left-right group button -->
                            <form name="undo" id="formUndo" method="POST" action="?/undoRedoSiteDateObservation" use:enhance>
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

                            <button type="button" class={cButtonCancel} onclick={() => (isEditing = false)}>
                                Cancel
                                <span class="pl-2 text-red-700 dark:text-red-600 text-2xl">↺</span>
                            </button>
                        {/if}
                    {/if}

                    {#if isAdding}
                        <button type="button" class="btn w-24 md:w-28 h-8 sm:h-10 md:h-11 variant-filled-surface pb-2" disabled>Review<span class="pl-2">🌎</span></button>
                        <button type="button" class="btn w-24 md:w-28 h-8 sm:h-10 md:h-11 variant-filled-surface pb-2" disabled>Delete<span class="pl-2">❌</span></button>
                    {:else if !isEditing}
                        <!-- REVIEW(LOCK)/UNLOCK Actions -->
                        <form name="review" id="formReview" method="POST" action="?/reviewSiteDateObservation" use:enhance>
                            <!-- LOCK/UNLOCK Mark data as reviewed, aka valid and locked; Can unlock -->
                            {#if $page.data.user && ($page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN' || $page.data.user.role === 'REVIEWER')}
                                {#if $page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN' || ($page.data.user.role === 'REVIEWER' && (!data.siteDateObservation.confirmBy || data.siteDateObservation.confirmBy === $page.data.user.id))}
                                    {#if isNullOrWhiteSpace(data.siteDateObservation.confirmBy?.id)}
                                        {#if isViewAll}
                                            <input hidden name="confirm_lock_all" value="true" />
                                            <button type="button" class={cButtonWider} onclick={() => modalStore.trigger(modalReviewerLock)}>
                                                Review All
                                                <span class="pl-2">🌎</span>
                                            </button>
                                            <input hidden name="confirm_unlock_all" value="true" />
                                            <button type="button" class={cButtonWider} onclick={() => modalStore.trigger(modalReviewerLock)}>
                                                Unlock All
                                                <span class="pl-2">🔒</span>
                                            </button>
                                        {:else}
                                            <input hidden name="confirm" value="true" />
                                            <button type="button" class={cButtonWider} onclick={() => modalStore.trigger(modalReviewerLock)}>
                                                Review
                                                <span class="pl-2">🌎</span>
                                            </button>
                                        {/if}
                                    {:else if !data.siteDateObservation.confirmed}
                                        {#if isViewAll}
                                            <input hidden name="confirm_lock_all" value="true" />
                                            <button type="button" class={cButtonWider} onclick={() => modalStore.trigger(modalReviewerLock)}>
                                                Lock All
                                                <span class="pl-2">🔒</span>
                                            </button>
                                            <input hidden name="confirm_unlock_all" value="true" />
                                            <button type="button" class={cButtonWider} onclick={() => modalStore.trigger(modalReviewerLock)}>
                                                Unlock All
                                                <span class="pl-2">🔒</span>
                                            </button>
                                        {:else}
                                            <input hidden name="confirm" value="true" />
                                            <button type="button" class={cButtonWider} onclick={() => modalStore.trigger(modalReviewerLock)}>
                                                Lock
                                                <span class="pl-2">🔒</span>
                                            </button>
                                        {/if}
                                    {:else if isViewAll}
                                        <input hidden name="confirm_unlock_all" value="false" />
                                        <button type="button" class={cButtonWider} onclick={() => modalStore.trigger(modalReviewerUnlock)}>
                                            Unlock All
                                            <span class="pl-2">🔑</span>
                                        </button>
                                    {:else}
                                        <input hidden name="confirm" value="false" />
                                        <button type="button" class={cButtonWider} onclick={() => modalStore.trigger(modalReviewerUnlock)}>
                                            Unlock
                                            <span class="pl-2">🔑</span>
                                        </button>
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

                        <!-- DELETE Action(s) -->
                        {#if !data.siteDateObservation.confirmed && ($page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN' || ($page.data.user.role === 'ENTRY' && (data.siteDateObservation.createdBy.id === $page.data.user.id || data.siteDateObservation.updatedBy.id === $page.data.user.id)))}
                            <form name="delete" id="formDelete" method="POST" action="?/deleteSiteDateObservation" use:enhance>
                                {#if !data.siteDateObservation.deleted}
                                    <button type="button" class={cButtonStandard} onclick={() => modalStore.trigger(modalDelete)}>Delete<span class="pl-2">❌</span></button>
                                    <input hidden name="deleteOn" value={true} />
                                {:else}
                                    <button type="button" class={cButtonStandard} onclick={() => modalStore.trigger(modalUndelete)}>Undelete<span class="pl-2">↺</span></button>
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

                <!-- CREATE Action -->
                <div class="flex flex-row gap-2">
                    {#if isAdding}
                        <!-- <button type="button" class={cButtonStandard} onclick={() => formAdd.submit()}> -->
                        <button type="button" class={cButtonStandard}>
                            Save
                            <span class="pl-2">✎</span>
                        </button>

                        <button type="button" class={cButtonAddView} onclick={() => (isAdding = !isAdding)} disabled={isEditing || data.siteDateObservation.confirmed}>
                            <span>Cancel Add</span>
                            <span class="pl-2 text-red-700 dark:text-red-600 text-2xl">↺</span>
                        </button>
                    {:else}
                        <button
                            type="button"
                            class={cButtonAddView}
                            onclick={() => {
                                modalStore.trigger(modalAdd);
                                return true;
                            }}
                            disabled={isEditing || data.siteDateObservation.confirmed}>
                            <span>Add species</span>
                            <span class="text-green-900 dark:text-green-200 text-2xl before:content-['✚']"></span>
                        </button>
                    {/if}
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
            {#if isViewAll}
                <!-- Multiple species observation recordings -->

                <hr />

                {#if isEditing}<!-- EDITING Multiple species observation recordings -->

                    <form name="edit" id="formEdit" method="POST" action="?/saveSiteDateObservation" use:enhance>
                        {#each availableObservations as chkSdo}
                            <div class={`${chkSdo.deleted ? 'line-through odd:variant-ghost-warning even:variant-ghost-error' : 'odd:bg-gray-200 odd:dark:bg-red-700'}`}>
                                <div class="pl-1 flex flex-row">
                                    <div class="w-6">{chkSdo.deleted ? '❌' : chkSdo.confirmed ? '🔐' : '🔓'}</div>
                                    <div class="w-56 truncate">{chkSdo.checklist.commonName}</div>
                                    <div class="w-64">{chkSdo.checklist.scientificName}</div>
                                    <div class="w-36">Hodges: {chkSdo.hodges}</div>

                                    {#if chkSdo.deleted}
                                        <div class="w-28 pr-2 pb-0.5">ID Code: {@html chkSdo.idCode ?? '&varnothing;'}</div>
                                    {:else if chkSdo.confirmed}
                                        <div class="w-28 pr-2 pb-0.5">
                                            <div class={cSectionClasses}>
                                                <span class={cSectionSpanClasses}>ID Code:</span>
                                                <input type="text" class="w-8 text-center text-black" value={chkSdo.idCode} disabled />
                                            </div>
                                        </div>
                                    {:else}
                                        <div class="w-28 pr-2 pb-0.5">
                                            <label class={cSectionClasses}>
                                                <span class={cSectionSpanClasses}>ID Code:</span>
                                                <input type="text" name={`${chkSdo.siteDateObservationId}_idcode`} class="w-8 text-center text-black" value={chkSdo.idCode} />
                                            </label>
                                            <input type="hidden" name={`${chkSdo.siteDateObservationId}_idcode_orig`} value={chkSdo.idCode} />
                                        </div>
                                    {/if}
                                    <div class="w-36">(Total: {chkSdo.total})</div>
                                </div>

                                <div class="pl-8 flex flex-wrap">
                                    {#each Object.entries(chkSdo)
                                        .filter((x) => x[0].startsWith('section'))
                                        .map(([k, v]) => ({ label: `${k.substring(0, 1).toLocaleUpperCase()}${k.substring(1, 7)} ${k.substring(7)}`, name: k, value: v })) as section}
                                        {#if chkSdo.deleted}
                                            <div class={cSectionClasses}>
                                                <div class={cSectionSpanClasses}>{section.label}:</div>
                                                <div class="w-8">{@html section.value ?? '&varnothing;'}</div>
                                            </div>
                                        {:else if chkSdo.confirmed}
                                            <div class={cSectionClasses}>
                                                <span class={cSectionSpanClasses}>{section.label}:</span>
                                                <input type="text" value={section.value} class="w-8 mb-0.5 text-center text-black" disabled />
                                            </div>
                                        {:else}
                                            <label class={cSectionClasses}>
                                                <span class={cSectionSpanClasses}>{section.label}:</span>
                                                <input type="text" name={`${chkSdo.siteDateObservationId}_${section.name}`} value={section.value} class="w-8 mb-0.5 text-center text-black" />
                                                <input type="hidden" name={`${chkSdo.siteDateObservationId}_${section.name}_orig`} value={section.value} />
                                            </label>
                                        {/if}
                                    {/each}
                                </div>
                                <hr />
                            </div>
                        {/each}
                    </form>
                {:else}<!-- VIEWING Multiple species observation recordings -->

                    {#each availableObservations as chkSdo}
                        <div class={`${chkSdo.deleted ? 'odd:variant-ghost-warning even:variant-ghost-error' : 'odd:bg-gray-200 odd:dark:bg-red-700'}`}>
                            <div class={`pl-1 flex flex-row ${chkSdo.deleted ? '[&>:not(:first-of-type)]:line-through' : ''}`}>
                                <div class="w-6">{chkSdo.deleted ? '❌' : chkSdo.confirmed ? '✔' : '✎'}</div>
                                <div class="w-56 truncate">{chkSdo.checklist.commonName}</div>
                                <div class="w-64">{chkSdo.checklist.scientificName}</div>
                                <div class="w-36">Hodges: {chkSdo.hodges}</div>
                                <div class="w-28 pr-2 pb-0.5">ID Code: {@html chkSdo.idCode ?? '&varnothing;'}</div>
                                <div class="w-36">(Total: {chkSdo.total})</div>
                            </div>

                            <div class={`pl-8 flex flex-wrap ${chkSdo.deleted ? 'line-through' : ''}`}>
                                {#each Object.entries(chkSdo)
                                    .filter((x) => x[0].startsWith('section'))
                                    .map(([k, v]) => ({ label: `${k.substring(0, 1).toLocaleUpperCase()}${k.substring(1, 7)} ${k.substring(7)}`, name: k, value: v })) as { label, value }}
                                    <div class={cSectionClasses}>
                                        <div class={cSectionSpanClasses}>{label}:</div>
                                        <div class="w-8">{@html value ?? '&varnothing;'}</div>
                                    </div>
                                {/each}
                            </div>
                            <hr />
                        </div>
                    {/each}
                {/if}
            {:else}
                <!-- Single speices observation recordings -->

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
                            <div class="w-32">Hodges:</div>
                            <!-- TODO: Make Id Code editable -->
                            <div class="w-28">Id Code:</div>
                            <div class="w-28 text-amber-700 dark:text-amber-400">(Total: {total})</div>
                            <!-- {:else if isEditing && total !== currentSiteDateObservation.total} -->
                        {:else if isEditing}
                            <div class="w-32">Hodges: {currentSiteDateObservation.hodges}</div>
                            <div class="w-28 pr-2 pb-0.5">
                                <label class={cSectionClasses}>
                                    <span class={cSectionSpanClasses}>ID Code:</span>
                                    <input type="text" name={`${currentSiteDateObservation.siteDateObservationId}_idcode`} class="w-8 text-center text-black" value={currentSiteDateObservation.idCode} />
                                </label>
                                <input type="hidden" name={`${currentSiteDateObservation.siteDateObservationId}_idcode_orig`} value={currentSiteDateObservation.idCode} />
                            </div>
                            <div class="w-28 text-amber-700 dark:text-amber-400">(Total: {total})</div>
                        {:else}
                            <div class="w-32">Hodges: {currentSiteDateObservation.hodges}</div>
                            <div class="w-28">Id Code: {@html currentSiteDateObservation.idCode ?? '&varnothing;'}</div>
                            <div class="w-28">(Total: {currentSiteDateObservation.total})</div>
                        {/if}
                    </div>
                    <!-- LOOKAT: https://stackoverflow.com/questions/77420975/svelte-store-calculate-total-value-of-items-in-array-of-objects -->

                    <hr />

                    <!-- DATA Details -->
                    {#if isEditing}
                        <!-- TODO: Indicate when data has changed -->
                        <form name="edit" id="formEdit" method="POST" action="?/saveSiteDateObservation" use:enhance>
                            <!-- <input type="hidden" name={`${data.siteDateObservation.siteDateObservationId}_siteDateObservationId`} value={data.siteDateObservation.siteDateObservationId} /> -->
                            <div class={cDataClasses}>
                                {#each sdoSections as section}
                                    <div class={cDatumClasses}>
                                        <label class={cSectionClasses}>
                                            <span class={cSectionSpanClasses}>{section.label}:</span>
                                            <input type="text" name={`${data.siteDateObservation.siteDateObservationId}_${section.name}`} value={section.value} class="w-8 text-center text-black" />
                                            <input type="hidden" name={`${data.siteDateObservation.siteDateObservationId}_${section.name}_orig`} value={section.value} oninput={handleChange} />
                                        </label>
                                    </div>
                                {/each}
                            </div>
                        </form>
                    {:else if isAdding}
                        <form name="add" id="formAdd" method="POST" action="?/addSiteDateObservation" use:enhance>
                            <div class={cDataClasses}>
                                {#each sdoSections as { label, name }}
                                    <div class={cDatumClasses}>
                                        <label class={cSectionClasses}>
                                            <span class={cSectionSpanClasses}>{label}:</span>
                                            <input type="text" {name} class="w-8 text-center text-black" />
                                            <!--oninput={handleChange} / -->
                                        </label>
                                    </div>
                                {/each}
                            </div>
                        </form>
                    {:else}
                        <!-- TODO: Consider indicator to show newly updated data -->
                        <div class={cDataClasses}>
                            {#each sdoSections as { label, value }}
                                <div class={cDatumClasses}>
                                    <div class={cSectionClasses}>
                                        <div class={cSectionSpanClasses}>{label}:</div>
                                        <div class="w-8">{@html value ?? '&varnothing;'}</div>
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
                            <div class="">Created By: {!isAdding ? data.siteDateObservation.createdBy?.lastFirst ?? '' : $page.data.user.lastFirst}</div>
                        </div>
                        <div class="flex flex-col basis-60">
                            <div>Updated At: {!isAdding && data.siteDateObservation.updatedAt ? formatDate(new Date(data.siteDateObservation.updatedAt).toISOString(), 'short', 'short') : ''}</div>
                            <div class="">Updated By: {!isAdding ? data.siteDateObservation.updatedBy?.lastFirst ?? '' : ''}</div>
                        </div>
                        <div class="flex flex-col basis-60">
                            <div>Confirm At: {!isAdding && data.siteDateObservation.confirmAt ? formatDate(new Date(data.siteDateObservation.confirmAt).toISOString(), 'short', 'short') : ''}</div>
                            <div class="">Confirm By: {!isAdding ? data.siteDateObservation.confirmBy?.lastFirst ?? '' : ''}</div>
                        </div>
                    </div>
                </div>
            {/if}
            <!-- END Data controls group -->
        </div>
    {/if}
{/snippet}

<Container head={null} {body} tail={null} />
