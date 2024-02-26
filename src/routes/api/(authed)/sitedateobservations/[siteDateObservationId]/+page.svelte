<!--
TODO: https://dev.to/theether0/sveltekit-changes-form-actions-and-progressive-enhancement-31h9
TODO: https://rodneylab.com/sveltekit-form-example-with-10-mistakes-to-avoid/  - see ActionData and keeping form data

-->
<script lang="ts">
    import { formatDate, isNullOrWhiteSpace, roleNameLong } from '$lib/utils';
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { modeDebug } from '$lib/config.js';
    import { getModalStore } from '@skeletonlabs/skeleton';
    import { type ModalSettings } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';

    const modalStore = getModalStore();
    const cSectionClasses = 'flex flex-row space-x-2';
    const cSectionSpanClasses = 'w-24';
    const cDataClasses = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 md:gap-2';
    const cDatumClasses = 'flex flex-row space-x-2';

    export let data;
    export let form;

    export let formSave: HTMLFormElement;
    export let formUndo: HTMLFormElement;
    export let formReview: HTMLFormElement;
    export let formDelete: HTMLFormElement;
    export let formAdd: HTMLFormElement;

    const foo = Object.entries(data.siteDateObservation)
        .filter((x) => x[0].startsWith('section'))
        .map(([k, v]) => ({ label: `${k.substring(0, 1).toLocaleUpperCase()}${k.substring(1, 7)} ${k.substring(7)}`, name: k, value: v }));
    //console.log(foo);

    //console.log(data);
    let key = modeDebug ? `(int. id: ${data.siteDateObservation.siteDateObservationId.toString()}) ` : '';
    let isEditing = false;

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
        // Data
        title: 'Delete observations',
        body: 'Provide reason for deleting observations for this species for the date.',
        // Populates the input value and attributes
        value: 'Deleting data due to...',
        valueAttr: { type: 'text', minlength: 0, maxlength: 256, required: true },
        // Returns the updated response value
        response: (r: string) => {
            console.log('response:', r);
            if (r) {
                formDelete.submit();
            }
        },
    };

    console.log(data.siteDateObservation?.confirmed, data.siteDateObservation?.confirmBy?.lastName ?? '<null>');
</script>

<StandardContainer>
    <svelte:fragment slot="standardBody">
        <div class="text-blue-600">
            {#if $page.data.user}
                <h3>{`${roleNameLong($page.data.user.role)}: ${$page.data.user.lastFirst}`}</h3>
            {/if}

            <div class="px-4 flex flex-auto justify-between">
                <div class="flex flex-row justify-start gap-2">
                    {#if $page.data.user && ($page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN' || $page.data.user.role === 'ENTRY' || $page.data.user.role === 'REVIEWER')}
                        {#if !isEditing}
                            <button type="button" class="btn variant-soft-surface pb-2" on:click={() => (isEditing = true)}>
                                Edit
                                <span class="pl-2">✎</span>
                            </button>
                        {:else}
                            <button type="button" class="btn variant-soft-success pb-2" on:click={() => formSave.submit()}>
                                Save
                                <span class="pl-2">✔</span>
                            </button>

                            <form name="undo" method="POST" action="?/undoRedoSiteDateObservation" use:enhance bind:this={formUndo}>
                                <!-- UNDO/REDO undo last action, edit or delete done by entry or reviewer - of course permissions matter -->
                                <!-- TODO toggle undo and redo on same control -->
                                <button type="button" disabled class="group btn variant-soft-surface pb-2">
                                    Undo/Redo
                                    <span class="pl-2 font-extrabold text-amber-700 dark:text-amber-400 group-disabled:text-inherit !group-disabled:font-extrabold">↺</span>
                                    <!--<span class="font-extrabold text-amber-700 dark:text-amber-400">↻</span>-->
                                </button>
                            </form>

                            <button type="button" class="btn variant-soft-error pb-2" on:click={() => (isEditing = false)}>
                                Cancel
                                <span class="pl-2">↺</span>
                            </button>
                        {/if}
                    {/if}

                    <form name="review" method="POST" action="?/reviewSiteDateObservation" use:enhance bind:this={formReview}>
                        <!-- LOCK/UNLOCK Mark data as reviewed, aka valid and locked; Can unlock -->
                        {#if $page.data.user && ($page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN' || $page.data.user.role === 'REVIEWER')}
                            {#if $page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN' || ($page.data.user.role === 'REVIEWER' && (!data.siteDateObservation.confirmBy || data.siteDateObservation.confirmBy === $page.data.user.id))}
                                {#if isNullOrWhiteSpace(data.siteDateObservation.confirmBy?.id)}
                                    <input hidden name="confirm" value="true" />
                                    <button type="button" class="btn variant-filled-surface pb-2" on:click={() => modalStore.trigger(modalReviewerLock)}>Review<span class="pl-2">🌎</span></button>
                                {:else if !data.siteDateObservation.confirmed}
                                    <input hidden name="confirm" value="true" />
                                    <button type="button" class="btn variant-filled-surface pb-2" on:click={() => modalStore.trigger(modalReviewerLock)}>Lock<span class="pl-2"></span></button>
                                {:else}
                                    <input hidden name="confirm" value="false" />
                                    <button type="button" class="btn variant-filled-surface pb-2" on:click={() => modalStore.trigger(modalReviewerUnlock)}>Unlock<span class="pl-2">🔒</span></button>
                                {/if}
                            {:else}
                                <button type="button" class="btn variant-filled-surface pb-2 disabled">
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

                    <form name="delete" method="POST" action="?/deleteSiteDateObservation" use:enhance bind:this={formDelete}>
                        <!-- DELETE record; Just marks it deleted so not removed from database -->
                        {#if $page.data.user && ($page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN' || (!data.siteDateObservation.confirmed && $page.data.user.role === 'ENTRY' && (data.siteDateObservation.createdBy.id === $page.data.user.id || data.siteDateObservation.updatedBy.id === $page.data.user.id)))}
                            <button type="button" class="btn variant-filled-surface pb-2" on:click={() => modalStore.trigger(modalDelete)}>Delete<span class="pl-2">❌</span></button><!--Deletes is mearly a status change and audit entry -->
                        {/if}
                        <input hidden name="siteDateObservationId" value={data.siteDateObservation.siteDateObservationId} />
                    </form>
                </div>

                <form name="add" method="POST" action="?/addSiteDateObservation" use:enhance bind:this={formAdd}>
                    <button type="button" class="btn variant-filled-surface pb-2">
                        Add species
                        <span class="pl-2 text-green-900 dark:text-green-200">✚</span>
                    </button>
                </form>
            </div>
        </div>
        <div class="text-blue-600">
            {#if form?.success}
                <div class="text-success-900-50-token">Successful {@html form.siteDateObservation?.confirmed ? 'LOCK 🔐' : 'UNLOCK 🔓'} of record.</div>
            {/if}
        </div>

        <div>
            <!-- DATA -->
            <div class="font-bold">{key}{data.siteDateObservation.checklist.scientificName}</div>
            <div class="flex flex-row space-x-4">
                <div>Hodges: {data.siteDateObservation.hodges}</div>
                <div>Id Code: {data.siteDateObservation.idCode}</div>
            </div>
            <hr />
            {#if isEditing}
                <form name="save" method="POST" action="?/saveSiteDateObservation" use:enhance bind:this={formSave}>
                    <div class={cDataClasses}>
                        {#each foo as section}
                            <div class={cDatumClasses}>
                                <label class={cSectionClasses}>
                                    <span class={cSectionSpanClasses}>{section.label}:</span>
                                    <input type="text" name={section.name} value={section.value ?? ''} class="w-8 text-center" />
                                    <input type="hidden" name={`${section.name}_orig`} value={section.value ?? ''} />
                                </label>
                            </div>
                        {/each}
                    </div>
                </form>
            {:else}
                <div class={cDataClasses}>
                    {#each foo as section}
                        <div class={cDatumClasses}>
                            <div class={cSectionClasses}>
                                <div class={cSectionSpanClasses}>{section.label}:</div>
                                <div class="w-8">{@html section.value ?? '&varnothing;'}</div>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}

            <!-- AUDIT Summary -->
            <hr />
            <div class="flex flex-row flex-wrap justify-between">
                <div class="flex flex-col basis-60">
                    <div>Created At: {formatDate(new Date(data.siteDateObservation.createdAt).toISOString(), 'short', 'short')}</div>
                    <div class="">Created By: {data.siteDateObservation.createdBy?.lastFirst ?? ''}</div>
                </div>
                <div class="flex flex-col basis-60">
                    <div>Updated At: {data.siteDateObservation.updatedAt ? formatDate(new Date(data.siteDateObservation.updatedAt).toISOString(), 'short', 'short') : ''}</div>
                    <div class="">Updated By: {data.siteDateObservation.updatedBy?.lastFirst ?? ''}</div>
                </div>
                <div class="flex flex-col basis-60">
                    <div>Confirm At: {data.siteDateObservation.confirmAt ? formatDate(new Date(data.siteDateObservation.confirmAt).toISOString(), 'short', 'short') : ''}</div>
                    <div class="">Confirm By: {data.siteDateObservation.confirmBy?.lastFirst ?? ''}</div>
                </div>
            </div>
        </div>
    </svelte:fragment>
</StandardContainer>
