<!--
TODO: https://dev.to/theether0/sveltekit-changes-form-actions-and-progressive-enhancement-31h9
TODO: https://rodneylab.com/sveltekit-form-example-with-10-mistakes-to-avoid/  - see ActionData and keeping form data

-->
<script lang="ts">
    import { formatDate, roleNameLong } from '$lib/utils';
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { modeDebug } from '$lib/config.js';
    import { getModalStore } from '@skeletonlabs/skeleton';
    import { type ModalSettings } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';

    const modalStore = getModalStore();

    export let data;
    export let form;

    export let formReview: HTMLFormElement;

    //console.log(data);
    let key = modeDebug ? `${data.siteDateObservation.siteDateObservationId.toString()}. ` : '';

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

    const handleReviewerLock = (e: any) => modalStore.trigger(modalReviewerLock);
    const handleReviewerUnlock = (e: any) => modalStore.trigger(modalReviewerUnlock);
</script>

<StandardContainer>
    <svelte:fragment slot="standardBody">
        <div class="text-blue-600">
            <div class="pl-4">
                <button type="button" class="btn variant-filled-surface pb-2">
                    Edit
                    <span class="pl-2">✎</span>
                </button>
                <button type="button" class="btn variant-filled-surface pb-2">
                    Saved/Complete
                    <span class="pl-2">✔</span>
                </button>
                <button type="button" class="btn variant-filled-surface pb-2">
                    Add species
                    <span class="pl-2 text-green-900 dark:text-green-200">✚</span>
                </button>
                <!-- UNDO/REDO undo last action, edit or delete done by entry or reviewer - of course permissions matter -->
                <!-- TODO toggle undo and redo on same control -->
                <button type="button" disabled class="group btn variant-filled-surface pb-2">
                    Undo/Redo
                    <span class="pl-2 font-extrabold text-amber-700 dark:text-amber-400 group-disabled:text-inherit !group-disabled:font-extrabold">↺</span>
                    <!--<span class="font-extrabold text-amber-700 dark:text-amber-400">↻</span>-->
                </button>
            </div>

            {#if $page.data.user}
                <h3>{`${roleNameLong($page.data.user.role)}: ${$page.data.user.lastFirst}`}</h3>
            {/if}
            <form name="review" method="POST" action="?/updateSiteObservationReviewStatus" use:enhance bind:this={formReview}>
                <div class="pl-4">
                    <!-- LOCK/UNLOCK Mark data as reviewed, aka valid and locked; Can unlock -->
                    {#if $page.data.user && ($page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN' || $page.data.user.role === 'REVIEWER')}
                        {#if $page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN' || ($page.data.user.role === 'REVIEWER' && (!data.siteDateObservation.confirmBy || data.siteDateObservation.confirmBy === $page.data.user.id))}
                            {#if !data.siteDateObservation.confirmBy}
                                <input hidden name="confirm" value="true" />
                                <button type="button" class="btn variant-filled-surface pb-2" on:click={handleReviewerLock}>Review<span class="pl-2">🌎</span></button>
                            {:else if data.siteDateObservation.confirmed}
                                <input hidden name="confirm" value="false" />
                                <button type="button" class="btn variant-filled-surface pb-2" on:click={handleReviewerUnlock}>Unlock<span class="pl-2"></span></button>
                            {:else}
                                <input hidden name="confirm" value="true" />
                                <button type="button" class="btn variant-filled-surface pb-2" on:click={handleReviewerLock}>Lock<span class="pl-2">🔒</span></button>
                            {/if}
                        {:else}
                            <button type="button" class="btn variant-filled-surface pb-2 disabled">
                                {#if !data.siteDateObservation.confirmBy}
                                    <div>Needs review <span class="pl-2">🌎</span></div>
                                {:else if data.siteDateObservation.confirmed}
                                    <div>Locked<span class="pl-2">🔐</span></div>
                                {:else}
                                    <div>Unlocked<span class="pl-2">🔓</span></div>
                                {/if}
                            </button>
                        {/if}
                    {/if}
                    <!-- DELETE record; Just marks it deleted so not removed from database -->
                    {#if $page.data.user && !data.siteDateObservation.confirmed && ($page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN' || ($page.data.user.role === 'ENTRY' && (data.siteDateObservation.createdBy === $page.data.user.id || data.siteDateObservation.updatedBy === $page.data.user.id)))}
                        <button type="button" class="btn variant-filled-surface pb-2">Delete<span class="pl-2">❌</span></button><!--Deletes is mearly a status change and audit entry -->
                    {/if}
                </div>
                <input hidden name="siteDateObservationId" value={data.siteDateObservation.siteDateObservationId} />
            </form>
            {#if form?.success}
                <div class="text-success-900-50-token">Successful {@html form.siteDateObservation.confirmed ? 'LOCK 🔐' : 'UNLOCK 🔓'} of record.</div>
            {/if}
        </div>

        <!-- DATA -->
        <div>
            <div class="font-bold">{key}{data.siteDateObservation.checklist.scientificName}</div>
            <div class="flex flex-row space-x-4">
                <div>Hodges: {data.siteDateObservation.hodges}</div>
                <div>Id Code: {data.siteDateObservation.idCode}</div>
            </div>
            <hr />
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 1:</div>
                    <div class="w-7">{@html data.siteDateObservation.section1 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 2:</div>
                    <div class="w-7">{@html data.siteDateObservation.section2 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 3:</div>
                    <div class="w-7">{@html data.siteDateObservation.section3 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 4:</div>
                    <div class="w-7">{@html data.siteDateObservation.section4 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 5:</div>
                    <div class="w-7">{@html data.siteDateObservation.section5 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 6:</div>
                    <div class="w-7">{@html data.siteDateObservation.section6 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 7:</div>
                    <div class="w-7">{@html data.siteDateObservation.section7 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 8:</div>
                    <div class="w-7">{@html data.siteDateObservation.section8 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 9:</div>
                    <div class="w-7">{@html data.siteDateObservation.section9 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 10:</div>
                    <div class="w-7">{@html data.siteDateObservation.section10 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 11:</div>
                    <div class="w-7">{@html data.siteDateObservation.section11 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 12:</div>
                    <div class="w-7">{@html data.siteDateObservation.section12 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 13:</div>
                    <div class="w-7">{@html data.siteDateObservation.section13 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 14:</div>
                    <div class="w-7">{@html data.siteDateObservation.section14 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 15:</div>
                    <div class="w-7">{@html data.siteDateObservation.section15 ?? '&varnothing;'}</div>
                </div>
            </div>

            <!-- audit summary -->
            <hr />
            <div class="flex flex-row flex-wrap justify-between">
                <div class="flex flex-col basis-56">
                    <div>Created At: {formatDate(new Date(data.siteDateObservation.createdAt).toISOString(), 'short', 'short')}</div>
                    <div class="">Created By: {data.siteDateObservation.createdBy}</div>
                </div>
                <div class="flex flex-col basis-56">
                    <div>Updated At: {data.siteDateObservation.updatedAt ? formatDate(new Date(data.siteDateObservation.updatedAt).toISOString(), 'short', 'short') : ''}</div>
                    <div class="">Updated By: {data.siteDateObservation.updatedBy ?? ''}</div>
                </div>
                <div class="flex flex-col basis-56">
                    <div>Confirm At: {data.siteDateObservation.confirmAt ? formatDate(new Date(data.siteDateObservation.confirmAt).toISOString(), 'short', 'short') : ''}</div>
                    <div class="">Confirm By: {data.siteDateObservation.confirmBy ?? ''}</div>
                </div>
            </div>
        </div>
    </svelte:fragment>
</StandardContainer>
