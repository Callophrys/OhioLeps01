<script lang="ts">
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import type { SvelteComponent } from 'svelte';
    import type { SiteDate } from '@prisma/client';
    import { enhance } from '$app/forms';
    import { getModalStore } from '@skeletonlabs/skeleton';
    import { weekOfYearSince } from '$lib/utils.js';

    // TODO: After create from wherever the SiteDatePicker will not update the year

    // Props
    /** Exposes parent props to this component. */
    let { parent }: { parent: SvelteComponent } = $props();

    const modalStore = getModalStore();
    const sd = $modalStore[0].value.siteDate as SiteDate;
    const unitGps = $modalStore[0].value.unitGps === 'DD' ? '&deg;F' : '&deg;C';
    let minTemp = $modalStore[0].value.useFarenheit !== 'F' ? -89.3 : -129;
    let maxTemp = $modalStore[0].value.useFarenheit !== 'F' ? 56.7 : 135;

    const recordDate: Date = sd ? new Date(sd.recordDate) : new Date();
    const recordDateText = `${recordDate.getFullYear()}-${'0'.concat((1 + recordDate.getMonth()).toString()).slice(-2)}-${'0'.concat(recordDate.getDate().toString()).slice(-2)}`;

    const formData = $state(
        !$modalStore[0].value.isNewRecord && sd
            ? {
                  siteId: sd.siteId,
                  tzOffset: new Date().getTimezoneOffset().toString(),
              }
            : {
                  siteId: -1,
                  tzOffset: new Date().getTimezoneOffset().toString(),
              }
    );
    // console.log(formData);

    // Custom submit function to pass the response and close the modal.
    function onFormSubmit(e: Event): void {
        e.preventDefault();
        if ($modalStore[0].response) {
            console.log(formData);
            $modalStore[0].response(formData);
        }
        modalStore.close();
    }

    // Base Classes
    const cBase = 'card p-4 w-modal shadow-xl space-y-4 flex flex-col max-h-[calc(100vh_-_40px)]';
    const cHeader = 'text-2xl font-bold';
    const cForm: CssClasses = 'border border-surface-500 p-4 rounded-container-token overflow-y-auto';
    // let checklist: ChecklistScientificName[] = $modalStore[0].value.checklist as ChecklistScientificName[];
    // let hodges = $derived(htmlHodges(checklist.find((x: ChecklistScientificName) => x.checklistId === formData.checklistId)?.hodges));
</script>

{#if $modalStore[0]}
    <div class={cBase}>
        <header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
        <article>{$modalStore[0].body ?? '(body missing)'}</article>
        <!-- Enable for debugging: -->
        <form class="modal-form {cForm}" method="post" use:enhance>
            <label class="label">
                <div>Recorder:</div>
                <input class="input" id="recorder" name="recorder" title="Name of the recorder(s) of the actual field data" bind:value={formData.recorder} />
            </label>

            <div class="flex flex-row justify-between">
                <label class="label w-1/3">
                    <div>Record Date:</div>
                    <input type="date" class="input" id="recordDate" name="recordDate" title="Record date" bind:value={formData.recordDate} />
                </label>

                <label class="label text-right">
                    <div>Week of Year:</div>
                    <input class="input text-right w-16" id="week" name="week" readonly title="Calculated period week of the year for the record" value={recordWeek} />
                </label>
            </div>

            <div class="w-fit text-center">
                <div class="text-center">Time</div>
                <div class="flex flex-row space-x-2">
                    <label class="label">
                        <div>Start:</div>
                        <input class="input w-32" id="startTime" name="startTime" type="time" title="Time at start" bind:value={formData.startTime} />
                    </label>
                    <label class="label">
                        <div>End:</div>
                        <input class="input w-32" id="endTime" name="endTime" type="time" title="Time at end" bind:value={formData.endTime} />
                    </label>
                </div>
            </div>

            <div class="mt-4">
                <label class="label center">
                    <div>Flowers in Bloom</div>
                    <textarea class="textarea" id="flowersInBloom" name="flowersInBloom" rows="2" title="Flowers in bloom" bind:value={formData.flowersInBloom}></textarea>
                </label>
                <label class="label">
                    <div>Field Notes</div>
                    <textarea class="textarea" id="fieldNotes" name="fieldNotes" rows="4" title="Field notes" bind:value={formData.fieldNotes}></textarea>
                </label>
            </div>
        </form>
        <!-- prettier-ignore -->
        <footer class="{parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" onclick={parent.onClose}>{parent.buttonTextCancel}</button>
            <button class="btn {parent.buttonPositive}" onclick={onFormSubmit}>Submit Form</button>
        </footer>
    </div>
{/if}
