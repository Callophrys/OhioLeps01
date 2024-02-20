<script lang="ts">
    import { formatDate } from '$lib/utils';
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { modeDebug } from '$lib/config.js'
    export let data;
    //console.log(data);
    let key = modeDebug ? `${data.siteDateObservation.siteDateObservationId.toString()}. ` : '';
</script>

<StandardContainer>
    <svelte:fragment slot="standardBody">
        <div class="text-blue-600">

            <h3>Date entry</h3>
            <div class="pl-4">
                <button type="button" class="underline pb-2">
                    Edit this record
                    <span>✎</span>
                </button>
                <button type="button" class="underline pb-2">
                    Saved/Complete
                    <span>✔</span>
                </button>
                <button type="button" class="underline pb-2">
                    Add new species observations
                    <span class="text-green-900 dark:text-green-200">✚</span>
                </button>
                <button type="button" class="underline pb-2">
                    Delete
                    <span>❌</span>
                </button><!--User can only delete own-->
                <button type="button" class="underline pb-2">
                    Undo
                    <span class="font-extrabold text-amber-700 dark:text-amber-400">↺</span>
                </button><!--User can only delete own-->
                <button type="button" class="underline pb-2">
                    Redo
                    <span class="font-extrabold text-amber-700 dark:text-amber-400">↻</span>
                </button><!--User can only delete own-->
            </div>

            <h3>Reviewer</h3>
            <div class="pl-4">
                <button type="button" class="underline pb-2">Needs review<span class="text-warning-600">❔</span></button>
                <button type="button" class="underline pb-2"><span>🔒</span></button>
            </div>

            <h3>Admin</h3>
            <div class="pl-4">
                <button type="button" class="underline pb-2">Unlock<span>🔑</span></button>
                <button type="button" class="underline pb-2">Locked<span>🔐</span></button>
                <button type="button" class="underline pb-2">Unlock<span> 🔓 </span></button>
                <button type="button" class="underline pb-2">Delete<span>❌</span></button><!--Deletes is mearly a status change and audit entry -->
            </div>

            <h3>Misc</h3>
            <div class="pl-4">
                <button type="button" class="underline pb-2"><span> 🔏 </span></button>
                <button type="button" class="underline pb-2">View all<span>🌎</span></button><!--Show listing view-->
                <button type="button" class="underline pb-2"><span>❗</span></button>
                <button type="button" class="underline pb-2"><span>❕</span></button>
                <button type="button" class="underline pb-2"><span>❓</span></button>
            </div>
        </div>

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
            <hr />
            <div class="flex flex-row flex-wrap justify-between">
                <div class="flex flex-col basis-56">
                    <div>Created At: {formatDate(new Date(data.siteDateObservation.createdAt).toISOString(), undefined, 'short')}</div>
                    <div class="">Created By: {data.siteDateObservation.createdBy}</div>
                </div>
                <div class="flex flex-col basis-56">
                    <div>Updated At: {data.siteDateObservation.updatedAt ? formatDate(new Date(data.siteDateObservation.updatedAt).toISOString(), undefined, 'short') : ''}</div>
                    <div class="">Updated By: {data.siteDateObservation.updatedBy ?? ''}</div>
                </div>
                <div class="flex flex-col basis-56">
                    <div>Confirm At: {data.siteDateObservation.confirmAt ? formatDate(new Date(data.siteDateObservation.confirmAt).toISOString()) : ''}</div>
                    <div class="">Confirm By: {data.siteDateObservation.confirmBy ?? ''}</div>
                </div>
            </div>
        </div>
    </svelte:fragment>
</StandardContainer>
