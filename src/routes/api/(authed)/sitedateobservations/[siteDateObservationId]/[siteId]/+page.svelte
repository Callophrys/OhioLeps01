<!--
TODO: https://dev.to/theether0/sveltekit-changes-form-actions-and-progressive-enhancement-31h9
TODO: https://rodneylab.com/sveltekit-form-example-with-10-mistakes-to-avoid/  - see ActionData and keeping form data
-->
<script lang="ts">
    /*-- Imports */
    import { GOTYPE, ROLE } from '$lib/types.js';
    import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
    import type { SiteDateObservationChecklist } from '$lib/types.js';
    import Container from '$lib/components/layouts/Container.svelte';
    import DataOptions from '$lib/components/datanavigation/DataOptions.svelte';
    import GoBack from '$lib/components/datanavigation/GoBack.svelte';
    //import GoNext from '$lib/components/datanavigation/GoNext.svelte';
    import ModalSdoAdd from '$lib/components/ModalSdoAdd.svelte';
    import SiteDatePicker from '$lib/components/datanavigation/SiteDatePicker.svelte';
    import SitePicker from '$lib/components/datanavigation/SitePicker.svelte';
    import SpeciesPicker from '$lib/components/datanavigation/SpeciesPicker.svelte';
    import YearWeek from '$lib/components/datanavigation/YearWeek.svelte';
    import { enhance } from '$app/forms';
    import { formatDate, isEditable, isReviewable, isNullOrWhiteSpace, isRecent, weekOfYearSince } from '$lib/utils';
    import { getModalStore } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { setContext } from 'svelte';

    /*-- -- Data -- */
    /*-- Exports */
    let { data, form }: { data: any; form: any } = $props();

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

    const cHighlightRecent = 'shadow-inner shadow-fuchsia-200';

    /*-- Variables (styles) */
    let targetForm: HTMLFormElement;

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
            if (typeof r === 'object') {
                targetForm.submit();
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
            if (typeof r === 'object') {
                targetForm.submit();
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
            if (typeof r === 'object') {
                targetForm.submit();
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
            if (typeof r === 'object') {
                targetForm.submit();
            }
        },
    };

    /*-- Properties (functional) */
    let isEditing = $state(false);
    let editingTotal = $state(data.siteDateObservation.total);
    // let showHodges = $state(true);
    // let showP3 = $state(true);

    let isNamingReversed: boolean = $state(false);
    let isViewAll: boolean = $state(false);
    let showRecentEdits: boolean = $state(false);
    let showDeletedData: boolean = $state(false);

    /*-- Variables and objects */
    /*-- Run first stuff */
    const modalStore = getModalStore();
    let siteId = data.siteDateObservation.siteDate.siteId;

    /*-- onMount */
    $effect(() => {
        let x: string;
        x = localStorage?.isNamingReversed;
        isNamingReversed = x && x.length ? x === 'true' : false;
        x = localStorage?.isViewAll;
        isViewAll = x && x.length ? x === 'true' : false;
        x = localStorage?.showRecentEdits;
        showRecentEdits = x && x.length ? x === 'true' : false;
        x = localStorage?.showDeletedData;
        showDeletedData = x && x.length ? x === 'true' : false;
    });

    // afterUpdate
    $effect(() => {
        localStorage.setItem('isNamingReversed', isNamingReversed.toString());
        localStorage.setItem('isViewAll', isViewAll.toString());
        localStorage.setItem('showRecentEdits', showRecentEdits.toString());
        localStorage.setItem('showDeletedData', showDeletedData.toString());
    });

    /*-- Handlers */
    const handleChange = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
        // total = getTotal();
        //total = total;
        //     return document && frm ? Array.from(frm.querySelectorAll('[type=text]')).reduce((t: number, o: any) => t + (isNaN(o.value) ? 0 : Number(o.value)), 0) : 0;
        const frm = e.currentTarget.form;
        editingTotal = frm ? Array.from(frm.querySelectorAll('[type=number]')).reduce((t: number, o: any) => t + (isNaN(o.value) ? 0 : Number(o.value)), 0) : 0;
        return true;
    };

    function onClickNames(e: Event & { currentTarget: EventTarget & HTMLDivElement }) {
        let isForard = e.currentTarget.classList.contains('flex-row');
        e.currentTarget.classList.toggle('flex-row', !isForard);
        e.currentTarget.classList.toggle('flex-row-reverse', isForard);
    }

    let formEdit: HTMLFormElement;

    function saveEditSingle(e: Event) {
        e.preventDefault();
        formEdit.submit(); // Submit form without raising submit event
    }

    function onSubmitEdit(e: Event & { currentTarget: EventTarget & HTMLFormElement }) {
        console.log('onSubmitEdit');
        return true;
    }

    function onSubmitReview(e: Event & { currentTarget: EventTarget & HTMLFormElement }) {
        e.preventDefault();
        targetForm = e.currentTarget;
        if ((targetForm.elements.namedItem('confirm') as HTMLInputElement).value === 'true') {
            modalStore.trigger(modalReviewerLock);
        } else {
            modalStore.trigger(modalReviewerUnlock);
        }
        return false;
    }

    function onSubmitDelete(e: Event & { currentTarget: EventTarget & HTMLFormElement }) {
        e.preventDefault();
        targetForm = e.currentTarget;
        if ((targetForm.elements.namedItem('deleteOn') as HTMLInputElement).value === 'true') {
            modalStore.trigger(modalDelete);
        } else {
            modalStore.trigger(modalUndelete);
        }
        return false;
    }

    /*-- Methods */
    function modalComponentForm(): void {
        const c: ModalComponent = { ref: ModalSdoAdd };
        // TODO: supply a filtered checklist.  I.e. checklist minus current subset in use.
        const modal: ModalSettings = {
            type: 'component',
            component: c,
            title: 'Add Specimen to Observations',
            body: 'Complete the form below and then press submit.',
            value: { checklist: data.checklistsAll, year: 2024, week: 8, siteDateId: data.siteDateObservation.siteDateId },
            response: (r) => {
                if (typeof r === 'object') {
                    const formData = new FormData();
                    for (const [k, v] of Object.entries(r) as [string, any]) formData.append(k, v);

                    fetch('?/addSiteDateObservation', {
                        method: 'POST',
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.status === 200) {
                                const rdata = JSON.parse(data.data);
                                let siteDateObservationId = rdata[rdata[0].siteDateObservationId];
                                goto('/api/sitedateobservations/' + siteDateObservationId + '/' + siteId);
                            }
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            },
        };
        modalStore.trigger(modal);
    }

    // const clearCounts = () => {
    //     return Array.from(formAdd.querySelectorAll('[type=text]')).forEach((c: any) => (c.value = ''));
    // };

    /*-- Reactives (functional) */
    // let total = $derived(getTotal());
    let currentSiteDateObservation = $state(data.siteDateObservation as SiteDateObservationChecklist);
    let currentSiteId: number = $state(data.siteDateObservation.siteDate.siteId);
    let currentSiteDateId: number = $state(data.siteDateObservation.siteDateId);

    const htmlHodges = (h: string | null) => (!h || h === 'null' ? '&varnothing;' : h);
    const htmlIdCode = (c: string | null) => (!c || c === 'null' ? '&varnothing;' : c === 'O' ? 'Observed' : c === 'C' ? 'Collected' : c === 'N' ? 'Net' : c === 'P' ? 'Photo' : 'Unknown');

    let recordYear = $derived(new Date(currentSiteDateObservation.siteDate.recordDate).getFullYear());
    let recordWeek = $derived(weekOfYearSince(new Date(currentSiteDateObservation.siteDate.recordDate)));
    let recordSdoCount = $derived(data.checklistsSiteDateObs.filter((o: SiteDateObservationChecklist) => !o.deleted || showDeletedData).length);

    let sdoSections = $derived.by(() => {
        const result = Object.entries(currentSiteDateObservation)
            .filter((x) => x[0].startsWith('section'))
            .map(([k, v]) => ({ label: `${k.substring(0, 1).toLocaleUpperCase()}${k.substring(1, 7)} ${k.substring(7)}`, name: k, value: v }));
        return result;
    });

    let total: number = $derived(sdoSections.reduce((t: number, o: any) => t + (isNaN(o.value) ? 0 : Number(o.value)), 0));

    const specimenClassesMultiple = (sdo: SiteDateObservationChecklist) => {
        if (sdo.deleted) {
            return 'line-through odd:variant-ghost-warning even:variant-ghost-error';
        }

        let c = 'odd:bg-gray-200 odd:dark:bg-red-700';
        return showRecentEdits && isRecent(sdo, 10) ? `${c} ${cHighlightRecent}` : c;
    };

    let nextSiteDateObservation = $derived(() => {
        let currentIndex = data.siteDates.findIndex((x: any) => x.siteDateId === currentSiteDateObservation.siteDateId);
        let nextIndex = ++currentIndex % data.siteDates.length;
        return data.siteDates[nextIndex];
    });

    let availableObservations = $derived(
        data.checklistsSiteDateObs.filter((x: SiteDateObservationChecklist) => {
            return !x.deleted || showDeletedData;
        })
    );

    /*-- Other */

    //if (form) console.log('form>>', form);
    //console.log(data);
</script>

{#snippet controlsOutside()}
    <YearWeek year={new Date(data.siteDateObservation.siteDate.recordDate).getFullYear()} week={weekOfYearSince(new Date(data.siteDateObservation.siteDate.recordDate))} sdoCount={recordSdoCount} />
    <!-- Hodges and P3 are not implemented yet -->
    <!-- <DataOptions bind:showRecentEdits bind:showDeletedData bind:showHodges bind:showP3 /> -->
    <DataOptions bind:showMultipleRows={isViewAll} bind:isEditing bind:showRecentEdits bind:showDeletedData showMyDataOnly showUnreviewedOnly />
{/snippet}

{#snippet controlsNavigation()}
    <!-- TODO: make this flex better for responsive sizings -->
    <div class="flex flex-col lg:flex-row lg:justify-between gap-1 lg:gap-2 pb-2 text-surface-600-300-token">
        <div class="flex flex-row">
            <GoBack targetId={data.siteDateObservation.siteDate.siteDateId} targetIdSecondary={null} targetType={GOTYPE.SITEDATES} controlBody="scale-90" buttonCenter="" scriptCenter="" labelledby="" />
            <!--
                <GoNext targetId={nextSiteDateObservation.siteDateId} targetIdSecondary={data.siteDateObservation.siteId} targetType={GOTYPE.SITEDATEOBSERVATIONS} targetIdSecondary={data.siteDate.siteId} controlBody="scale-90" controlDisabled={firstSdoId < 0} />
                -->
            <SitePicker {currentSiteId} controlBody="scale-90" />
        </div>
        <SpeciesPicker currentSdoChecklistItemId={currentSiteDateObservation.siteDateObservationId} {isEditing} {isViewAll} {showDeletedData} controlBody="scale-90" />
        <!-- older one <SiteDatePicker currentSiteId={data.siteDateObservation.siteDate.siteId} currentSiteDateId={data.siteDateObservation.siteDateId ?? -1} controlBody="scale-90" /> -->
        <SiteDatePicker bind:currentSiteId bind:currentSiteDateId controlBody="scale-90" buttonLeft="" buttonRight="" buttonYear="" buttonWeek="" dropdownShowDate={false} dropdownPointers={false} heading={null} yearPrefix="" weekPrefix="" controlOuter="" prefixYear="" prefixWeek="" suffixYear="" suffixWeek="" popupInner="" popupStyles="" labelledby="" />
    </div>
{/snippet}

{#snippet editSpecimenEditing()}
    <!-- SAVE UPDATE(s) Action -->
    <!-- <button type="button" class={cButtonStandard} onclick={() => formEdit?.submit()}> -->
    <button type="button" class={cButtonStandard} onclick={saveEditSingle}>
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
{/snippet}

{#snippet editSpecimenViewing()}
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
{/snippet}

{#snippet editSpecimenControls()}
    {#if !isEditing}
        {@render editSpecimenViewing()}
    {:else}
        {@render editSpecimenEditing()}
    {/if}
{/snippet}

{#snippet reviewElevatedUser(sdo: SiteDateObservationChecklist)}
    {#if isNullOrWhiteSpace(sdo.confirmBy?.id)}
        {#if isViewAll}
            <input hidden name="confirm_lock_all" value="true" />
            <button type="submit" class={cButtonWider}>
                Review All
                <span class="pl-2">🌎</span>
            </button>
            <input hidden name="confirm_unlock_all" value="true" />
            <button type="submit" class={cButtonWider}>
                Unlock All
                <span class="pl-2">🔒</span>
            </button>
        {:else}
            <input hidden name="confirm" value="true" />
            <button type="submit" class={cButtonWider}>
                Review
                <span class="pl-2">🌎</span>
            </button>
        {/if}
    {:else if !sdo.confirmed}
        {#if isViewAll}
            <input hidden name="confirm_lock_all" value="true" />
            <button type="submit" class={cButtonWider}>
                Lock All
                <span class="pl-2">🔒</span>
            </button>
            <input hidden name="confirm_unlock_all" value="true" />
            <button type="submit" class={cButtonWider}>
                Unlock All
                <span class="pl-2">🔒</span>
            </button>
        {:else}
            <input hidden name="confirm" value="true" />
            <button type="submit" class={cButtonWider}>
                Lock
                <span class="pl-2">🔒</span>
            </button>
        {/if}
    {:else if isViewAll}
        <input hidden name="confirm_unlock_all" value="false" />
        <button type="submit" class={cButtonWider}>
            Unlock All
            <span class="pl-2">🔑</span>
        </button>
    {:else}
        <input hidden name="confirm" value="false" />
        <button type="submit" class={cButtonWider}>
            Unlock
            <span class="pl-2">🔑</span>
        </button>
    {/if}
{/snippet}

{#snippet reviewStandardUser(sdo: SiteDateObservationChecklist)}
    <button type="submit" class={cButtonStandard} disabled>
        {#if typeof sdo.confirmBy !== 'object'}
            <div>Needs review <span class="pl-2">🌎</span></div>
        {:else if sdo.confirmed}
            <div>Locked<span class="pl-2">🔐</span></div>
        {:else}
            <div>Unlocked<span class="pl-2">🔓</span></div>
        {/if}
    </button>
{/snippet}

{#snippet reviewSpecimenViewMultiple(sdo: SiteDateObservationChecklist)}
    {#if sdo.deleted}
        <button type="button" disabled class="cursor-not-allowed">&nbsp;</button>
    {:else if isReviewable(sdo, $page.data.user)}
        <form method="POST" action="?/reviewSiteDateObservation" onsubmit={onSubmitReview} use:enhance>
            {#if !sdo.confirmById}
                <button type="submit" title="Needs review" class="">🌎</button>
                <input hidden name="confirm" value={true} />
            {:else if sdo.confirmed}
                <button type="submit" title="Reviewed" class="">🔐</button>
                <input hidden name="confirm" value={false} />
            {:else}
                <button type="submit" title="Review status has been revoked" class="">🔓</button>
                <input hidden name="confirm" value={true} />
            {/if}
            <input hidden name="siteDateObservationId" value={sdo.siteDateObservationId} />
        </form>
    {/if}
{/snippet}

{#snippet reviewSpecimenViewSingle(sdo: SiteDateObservationChecklist)}
    <form method="POST" action="?/reviewSiteDateObservation" onsubmit={onSubmitReview} use:enhance>
        <!-- LOCK/UNLOCK Mark data as reviewed, aka valid and locked; Can unlock -->
        {#if isReviewable(sdo, $page.data.user)}
            {@render reviewElevatedUser(sdo)}
        {:else}
            {@render reviewStandardUser(sdo)}
        {/if}
        <input hidden name="siteDateObservationId" value={sdo.siteDateObservationId} />
    </form>
{/snippet}

{#snippet deleteSpecimenViewMultiple(sdo: SiteDateObservationChecklist)}
    {#if isEditable(sdo, $page.data.user)}
        {#if sdo.confirmed}
            <button type="button" title="Delete disabled" disabled class="grayscale cursor-not-allowed">❌</button>
        {:else}
            <form method="POST" action="?/deleteSiteDateObservation" onsubmit={onSubmitDelete} use:enhance>
                {#if !sdo.deleted}
                    <button type="submit" title="Delete this observation">❌</button>
                    <input hidden name="deleteOn" value={true} />
                {:else}
                    <button type="submit" title="Undelete this observation" class="text-2xl">↺</button>
                    <input hidden name="deleteOn" value={false} />
                {/if}
                <input hidden name="siteDateObservationId" value={sdo.siteDateObservationId} />
                <input hidden name="siteDateId" value={sdo.siteDateId} />
                <input hidden name="checklistId" value={sdo.checklistId} />
                <input hidden name="useLatinSort" value={true} />
                <input hidden name="sortDirection" value="asc" />
                <input hidden name="advanceRecord" value={false} />
            </form>
        {/if}
    {/if}
{/snippet}

{#snippet deleteSpecimenViewSingle(sdo: SiteDateObservationChecklist)}
    {#if isEditable(sdo, $page.data.user)}
        <form method="POST" action="?/deleteSiteDateObservation" onsubmit={onSubmitDelete} use:enhance>
            {#if !sdo.deleted}
                <button type="submit" class={cButtonStandard}>Delete<span class="pl-2">❌</span></button>
                <input hidden name="deleteOn" value={true} />
            {:else}
                <button type="submit" class={cButtonStandard} onclick={() => modalStore.trigger(modalUndelete)}>Undelete<span class="ml-2 mb-1 text-2xl">↺</span></button>
                <input hidden name="deleteOn" value={false} />
            {/if}
            <input hidden name="siteDateObservationId" value={sdo.siteDateObservationId} />
            <input hidden name="siteDateId" value={sdo.siteDateId} />
            <input hidden name="checklistId" value={sdo.checklistId} />
            <input hidden name="useLatinSort" value={true} />
            <input hidden name="sortDirection" value="asc" />
            <input hidden name="advanceRecord" value={true} />
        </form>
    {/if}
{/snippet}

{#snippet addSpecimen()}
    <div class="flex flex-row gap-2">
        <button type="button" class={cButtonAddView} onclick={modalComponentForm} disabled={isEditing} title="Add new species observation">
            <span>Add species</span>
            <span class="text-green-900 dark:text-green-200 text-2xl before:content-['✚']"></span>
        </button>
    </div>
{/snippet}

{#snippet controlsOperations(sdo: SiteDateObservationChecklist)}
    <div class="px-4 flex flex-auto justify-between gap-2">
        <div class="flex flex-row justify-start gap-2">
            <!-- EDIT(s) Action -->
            {@render editSpecimenControls()}

            {#if !isEditing}
                <!-- REVIEW(LOCK)/UNLOCK Actions -->
                {@render reviewSpecimenViewSingle(sdo)}

                <!-- DELETE Action(s) -->
                {@render deleteSpecimenViewSingle(sdo)}
            {/if}
        </div>

        <!-- CREATE Action -->
        {@render addSpecimen()}
    </div>
{/snippet}

{#snippet actionMessages()}
    <div class="text-success-900-50-token h-6 fixed -mt-4">
        {#if form?.success}
            {#if form.action === 'save'}
                Successful update ✔.
            {:else if form.action === 'review'}
                Successful {@html form.siteDateObservation?.confirmed ? 'LOCK 🔐' : 'UNLOCK 🔓'}.
            {:else if form.action === 'delete'}
                Successful delete 💥.
            {:else if form.action === 'undelete'}
                Successful undelete ✔.
            {/if}
        {/if}
    </div>
{/snippet}

{#snippet dataMultiple()}
    <hr />

    {#if isEditing}<!-- EDITING Multiple species observation recordings -->

        <form id="formEdit" method="POST" action="?/saveSiteDateObservation" use:enhance>
            {#each availableObservations as chkSdo}
                <div class={specimenClassesMultiple(chkSdo)}>
                    <div class="pl-1 flex flex-row">
                        <div class="w-6">{chkSdo.deleted ? '❌' : chkSdo.confirmed ? '🔐' : '🔓'}</div>
                        <div class="w-56 truncate">{chkSdo.checklist.commonName}</div>
                        <div class="w-64">{chkSdo.checklist.scientificName}</div>
                        <div class="w-36">Hodges: {@html htmlHodges(chkSdo.hodges)}</div>

                        {#if chkSdo.deleted}
                            <div class="w-44 pr-2 pb-0.5">ID Method: {@html chkSdo.idCode ?? '&varnothing;'}</div>
                        {:else if chkSdo.confirmed}
                            <div class="w-44 pr-2 pb-0.5">
                                <div class={cSectionClasses}>
                                    <span class={cSectionSpanClasses}>ID Method:</span>
                                    <input type="text" class="w-8 text-center text-black" value={chkSdo.idCode} disabled />
                                </div>
                            </div>
                        {:else}
                            <div class="w-44 pr-2 pb-0.5">
                                <label class={cSectionClasses}>
                                    <span class={cSectionSpanClasses}>ID Method:</span>
                                    <select class="input" name={`${chkSdo.siteDateObservationId}_idcode`} value={chkSdo.idCode}>
                                        <option value="O">Observed</option>
                                        <option value="C">Collected</option>
                                        <option value="N">Net</option>
                                        <option value="P">Photo</option>
                                    </select>
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
            <div class={`flex flex-row ${specimenClassesMultiple(chkSdo)}`}>
                <div class="basis-6">
                    {#if $page.data.user.role === ROLE.USER}
                        {#if !chkSdo.confirmById}
                            <button type="button" title="Disabled/Needs review" disabled class="">🌎</button>
                        {:else if chkSdo.confirmed}
                            <button type="button" title="Disabled/Reviewed" class="">🔐</button>
                        {:else}
                            <button type="button" title="Disabled/Review status has been revoked" class="">🔓</button>
                        {/if}
                    {:else}
                        {#if chkSdo.deleted}
                            <div class="w-6"><button disabled class="cursor-not-allowed">&nbsp;</button></div>
                        {:else}
                            <div class="w-6 text-center content-[2714]">
                                {#if chkSdo.confirmed}
                                    <button title="Observation is reviewed and locked to editing" class="text-green-700">✔</button>
                                {:else}
                                    <button title="Edit this observation" class="text-yellow-500">✎</button>
                                {/if}
                            </div>
                        {/if}
                        <div class="w-6 text-center">
                            {@render reviewSpecimenViewMultiple(chkSdo)}
                        </div>
                        <div class="w-6 text-center">
                            {@render deleteSpecimenViewMultiple(chkSdo)}
                        </div>
                    {/if}
                </div>

                <div class="">
                    <div class={`pl-1 flex flex-row justify-between ${chkSdo.deleted ? '[&>:not(:first-of-type)]:line-through' : ''}`}>
                        <div class="flex flex-row">
                            <div class="w-56 truncate">{chkSdo.checklist.commonName}</div>
                            <div class="w-64">{chkSdo.checklist.scientificName}</div>
                        </div>
                        <div class="w-32">Hodges: {@html htmlHodges(chkSdo.hodges)}</div>
                        <div class="w-44 pr-2 pb-0.5">ID Method: {@html htmlIdCode(chkSdo.idCode)}</div>
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
                </div>
            </div>
            <hr />
        {/each}
    {/if}
{/snippet}

{#snippet dataSingleAudit(sdo: SiteDateObservationChecklist)}
    <div class="flex flex-row flex-wrap justify-between">
        <div class="flex flex-col basis-60">
            <div>Created At: {sdo.createdAt ? formatDate(new Date(sdo.createdAt).toISOString(), 'short', 'short') : ''}</div>
            <div class="">Created By: {sdo.createdBy?.lastFirst ?? ''}</div>
        </div>
        <div class="flex flex-col basis-60">
            <div>Updated At: {sdo.updatedAt ? formatDate(new Date(sdo.updatedAt).toISOString(), 'short', 'short') : ''}</div>
            <div class="">Updated By: {sdo.updatedBy?.lastFirst ?? ''}</div>
        </div>
        <div class="flex flex-col basis-60">
            <div>Confirm At: {sdo.confirmAt ? formatDate(new Date(sdo.confirmAt).toISOString(), 'short', 'short') : ''}</div>
            <div class="">Confirm By: {sdo.confirmBy?.lastFirst ?? ''}</div>
        </div>
    </div>
{/snippet}

{#snippet dataSingleEdit(sdo: SiteDateObservationChecklist)}
    <!-- LOOKAT: https://stackoverflow.com/questions/77420975/svelte-store-calculate-total-value-of-items-in-array-of-objects -->
    <!-- TODO: Indicate when data has changed -->
    <form id="formEdit" bind:this={formEdit} method="POST" action="?/saveSiteDateObservation" onsubmit={onSubmitEdit} use:enhance>
        <div class="flex flex-row space-x-4 mb-2">
            <div class="w-32 my-auto">Hodges: {@html htmlHodges(sdo.checklist.hodges)}</div>
            <div class="pr-2 pb-0.5">
                <label class={cSectionClasses}>
                    <span class={`${cSectionSpanClasses} my-auto whitespace-nowrap`}>ID Method:</span>
                    <select class="input" name={`${sdo.siteDateObservationId}_idCode`} value={sdo.idCode}>
                        <option value="O">Observed</option>
                        <option value="C">Collected</option>
                        <option value="N">Net</option>
                        <option value="P">Photo</option>
                    </select>
                </label>
                <input type="hidden" name={`${sdo.siteDateObservationId}_idCode_orig`} value={sdo.idCode} />
            </div>
            <div class="w-28 my-auto text-amber-700 dark:text-amber-400">(Total: {editingTotal})</div>
        </div>

        <hr />

        <div class={cDataClasses}>
            {#each sdoSections as section}
                <div class={cDatumClasses}>
                    <label class={cSectionClasses}>
                        <span class={cSectionSpanClasses}>{section.label}:</span>
                        <input type="number" name={`${sdo.siteDateObservationId}_${section.name}`} value={section.value} min="0" class="w-20 text-center text-black" oninput={handleChange} />
                        <input type="hidden" name={`${sdo.siteDateObservationId}_${section.name}_orig`} value={section.value} />
                    </label>
                </div>
            {/each}
        </div>
    </form>
{/snippet}

{#snippet dataSingleRead(sdo: SiteDateObservationChecklist)}
    <!-- DATA Details -->
    <div class="flex flex-row space-x-4 mb-2">
        <div class="w-32">Hodges: {@html htmlHodges(sdo.checklist.hodges)}</div>
        <div class="w-44">ID Method: {@html htmlIdCode(sdo.idCode)}</div>
        <div class="w-28">(Total: {sdo.total})</div>
    </div>

    <hr />

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
{/snippet}

{#snippet dataSingle(sdo: SiteDateObservationChecklist)}
    <div class={`${sdo.deleted ? 'line-through variant-ghost-error' : showRecentEdits && isRecent(sdo, 10) ? cHighlightRecent : ''}`}>
        <!-- DATA Heading -->
        <div class="flex flex-row justify-between font-bold mb-4" onclick={onClickNames} onkeydown={() => {}} role="button" tabindex="0">
            <div>
                {sdo.checklist.scientificName}
            </div>
            <div>
                {sdo.checklist.commonName}
            </div>
        </div>

        {#if isEditing}
            {@render dataSingleEdit(sdo)}
        {:else}
            {@render dataSingleRead(sdo)}
        {/if}

        <hr />

        <!-- AUDIT Summary -->
        {@render dataSingleAudit(sdo)}
    </div>
{/snippet}

{#snippet body()}
    {#if $page.data.user}
        <!-- Action messages -->
        {@render actionMessages()}

        <!-- Header and options -->
        {@render controlsNavigation()}

        {#if $page.data.user.role === ROLE.SUPER || $page.data.user.role === ROLE.ADMIN || $page.data.user.role === ROLE.REVIEWER || $page.data.user.role === ROLE.ENTRY}
            <!-- Main controls -->
            {@render controlsOperations(data.siteDateObservation)}
        {/if}

        <div class="pr-4 overflow-y-auto h-full">
            <div>
                {#if isViewAll}
                    <!-- Multiple species observation recordings -->
                    {@render dataMultiple()}
                {:else}
                    <!-- Single speices observation recordings -->
                    {@render dataSingle(data.siteDateObservation)}
                {/if}
            </div>
        </div>
    {/if}
{/snippet}

{@render controlsOutside()}
<Container head={null} {body} bodyClasses="overflow-hidden" tail={null} />
