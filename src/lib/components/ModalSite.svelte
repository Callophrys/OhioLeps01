<script lang="ts">
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import type { SvelteComponent } from 'svelte';
    import type { County, Site, State } from '@prisma/client';
    import { enhance } from '$app/forms';
    import { getContext } from 'svelte';
    import { getModalStore } from '@skeletonlabs/skeleton';
    import CountySite from './datanavigation/CountySite.svelte';

    // TODO: After create from wherever the SiteDatePicker will not update the year

    // Props
    /** Exposes parent props to this component. */
    let { parent }: { parent: SvelteComponent } = $props();

    const modalStore = getModalStore();
    const site = $modalStore[0].value.site as Site;
    const unitGps = $modalStore[0].value.unitGps;
    const countyId = $modalStore[0].value.countyId;
    const stateId = $modalStore[0].value.stateId;

    const states: State[] = $modalStore[0].value.states;
    const counties: County[] = $modalStore[0].value.counties;

    console.log('modal site', site);

    const formData = $state(
        !$modalStore[0].value.isNewRecord && site
            ? {
                  siteId: site.siteId,
                  countyId: countyId,
                  stateId: stateId,

                  siteName: site.siteName,
                  township: site.township,
                  locationZip: site.locationZip,

                  siteAddress: site.siteAddress,
                  siteAddress2: site.siteAddress2,
                  siteCity: site.siteCity,
                  siteState: site.siteState,
                  siteZip: site.siteZip,

                  person: site.person,
                  personAddress: site.personAddress,
                  personAddress2: site.personAddress2,
                  personCity: site.personCity,
                  personState: site.personState,
                  personZip: site.personZip,
                  personPhone: site.personPhone,
                  personPhone2: site.personPhone2,
                  personEmail: site.personEmail,

                  latitudeStart: site.latitudeStart,
                  latitudeEnd: site.latitudeEnd,
                  longitudeStart: site.longitudeStart,
                  longitudeEnd: site.longitudeEnd,

                  altPerson: site.altPerson,
                  altPersonAddress: site.altPersonAddress,
                  altPersonAddress2: site.altPersonAddress2,
                  altPersonCity: site.altPersonCity,
                  altPersonState: site.altPersonState,
                  altPersonZip: site.altPersonZip,
                  altPersonPhone: site.altPersonPhone,
                  altPersonPhone2: site.altPersonPhone2,
                  altPersonEmail: site.altPersonEmail,

                  otherParticipants: site.otherParticipants,
                  description: site.description,

                  unitGps: unitGps,
              }
            : {
                  siteId: -1,
                  countyId: countyId,
                  stateId: stateId,

                  township: null,
                  locationZip: null,

                  siteAddress: null,
                  siteAddress2: null,
                  siteCity: null,
                  siteState: null,
                  siteZip: null,

                  person: null,
                  personAddress: null,
                  personAddress2: null,
                  personCity: null,
                  personState: null,
                  personZip: null,
                  personPhone: null,
                  personPhone2: null,
                  personEmail: null,

                  latitudeStart: null,
                  latitudeEnd: null,
                  longitudeStart: null,
                  longitudeEnd: null,

                  altPerson: null,
                  altPersonAddress: null,
                  altPersonAddress2: null,
                  altPersonCity: null,
                  altPersonState: null,
                  altPersonZip: null,
                  altPersonPhone: null,
                  altPersonPhone2: null,
                  altPersonEmail: null,

                  otherParticipants: null,
                  description: null,

                  unitGps: unitGps,
              }
    );
    // console.log(formData);

    // s1995 Int @default(5)
    // s1996 Int @default(5)
    // s1997 Int @default(5)
    // s1998 Int @default(5)
    // s1999 Int @default(5)
    // s2000 Int @default(5)
    // s2001 Int @default(5)
    // s2002 Int @default(5)
    // s2003 Int @default(5)
    // s2004 Int @default(5)

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

{#snippet entryInput(fullId: string, fullLabel: string, inputType: string)}
    <label class="label">
        <div>{fullLabel}:</div>
        <input type={inputType} class="input" id={fullId} name={fullId} title={fullLabel} bind:value={formData[fullId as keyof typeof formData]} />
    </label>
{/snippet}

<!-- works for county and state -->
{#snippet entrySelect(fullId: string, fullLabel: string, valueName: string, textName: string, items: any[])}
    <label class="label">
        <div>{fullLabel}:</div>
        <select class="select" id={fullId} name={fullId} title={fullLabel} bind:value={formData[fullId as keyof typeof formData]}>
            {#each items as item}
                <option value={item[valueName]}>{item[textName]}</option>
            {/each}
        </select>
    </label>
{/snippet}

{#snippet entryTextarea(fullId, fullLabel, rows)}
    <label class="label">
        <div>{fullLabel}:</div>
        <textarea class="textarea" id={fullId} name={fullId} {rows} title={fullLabel} bind:value={formData[fullId as keyof typeof formData]}></textarea>
    </label>
{/snippet}

{#if $modalStore[0]}
    <div class={cBase}>
        <header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
        <article>{$modalStore[0].body ?? '(body missing)'}</article>
        <!-- Enable for debugging: -->
        <form class="modal-form {cForm}" method="post" use:enhance>
            <div>
                {@render entryInput('siteName', 'Site Name', 'text')}
                <div class="pl-8">
                    {@render entrySelect('countyId', 'County', 'id', 'name', counties)}
                    {@render entryInput('township', 'Township', 'text')}
                    {@render entryInput('locationZip', 'Location Zip', 'text')}
                </div>
            </div>
            <div>
                <div>Proper Address</div>
                <div class="pl-8">
                    {@render entryInput('siteAddress', 'Address', 'text')}
                    {@render entryInput('siteAddress2', 'Address 2', 'text')}
                    {@render entryInput('siteCity', 'City', 'text')}
                    {@render entrySelect('siteState', 'State', 'name', 'name', states)}
                    {@render entryInput('siteZip', 'Zip', 'text')}
                </div>
            </div>
            <div>
                {@render entryInput('person', 'Person', 'text')}
                <div class="pl-8">
                    {@render entryInput('personAddress', 'Address', 'text')}
                    {@render entryInput('personAddress2', 'Address 2', 'text')}
                    {@render entryInput('personCity', 'City', 'text')}
                    {@render entrySelect('personState', 'State', 'name', 'name', states)}
                    {@render entryInput('personZip', 'Zip', 'text')}
                    {@render entryInput('personPhone', 'Phone', 'text')}
                    {@render entryInput('personPhone2', 'Phone 2', 'text')}
                    {@render entryInput('personEmail', 'Email', 'text')}
                </div>
            </div>
            <div>
                <div>GPS</div>
                <div class="pl-8 flex flex-row space-x-2">
                    <div class="text-center">
                        <div>Range - From</div>
                        <div class="flex flex-row space-x-2">
                            {@render entryInput('latitudeStart', 'Latitude', 'text')}
                            {@render entryInput('longitudeStart', 'Longitude', 'text')}
                        </div>
                    </div>
                    <div class="text-center">
                        <div>Range - To</div>
                        <div class="flex flex-row space-x-2">
                            {@render entryInput('latitudeEnd', 'Latitude', 'text')}
                            {@render entryInput('longitudeEnd', 'Longitude', 'text')}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {@render entryInput('altPerson', 'Alternate Person', 'text')}
                <div class="pl-8">
                    {@render entryInput('altPersonAddress', 'Address', 'text')}
                    {@render entryInput('altPersonAddress2', 'Address 2', 'text')}
                    {@render entryInput('altPersonCity', 'City', 'text')}
                    {@render entrySelect('altPersonState', 'State', 'name', 'name', states)}
                    {@render entryInput('altPersonZip', 'Zip', 'text')}
                    {@render entryInput('altPersonPhone', 'Phone', 'text')}
                    {@render entryInput('altPersonPhone2', 'Phone 2', 'text')}
                    {@render entryInput('altPersonEmail', 'Email', 'text')}
                </div>
            </div>
            <div>
                {@render entryTextarea('otherParticipants', 'Other Participants', '2')}
                {@render entryTextarea('description', 'Description', '4')}
            </div>
        </form>
        <!-- prettier-ignore -->
        <footer class="{parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" onclick={parent.onClose}>{parent.buttonTextCancel}</button>
            <button class="btn {parent.buttonPositive}" onclick={onFormSubmit}>Submit Form</button>
        </footer>
    </div>
{/if}
