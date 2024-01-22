<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { createEventDispatcher } from 'svelte';
    import { formatDate } from '$lib/utils';
    import { goto } from '$app/navigation';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    export let data;

    let comboboxValueSiteDate: number;

    const popupComboboxSiteDate: PopupSettings = {
        event: 'click',
        target: 'popupComboboxSiteDate',
        placement: 'bottom',
        closeQuery: '.listbox-item',
    };

    function handleClick(event: any) {
        event.preventDefault();
        if (event.currentTarget?.value) {
            goto('/api/sitedates/' + event.currentTarget.value);
        }
    }

    const dispatch = createEventDispatcher();
    const submit = () => dispatch('submit');
    let obsValue: number;

    // TODO
    // bind the selected listboxtime
    // and/or use action
    // https://svelte.dev/docs/element-directives#use-action
    // actions:
    // https://svelte.dev/docs/svelte-action
    // does bind selected go on the parent component?  See skeletonui for event stuff
</script>

<StandardContainer>
    <div class="card w-48 shadow-xl py-2" data-popup="popupComboboxSiteDate">
        <ListBox rounded="rounded-none">
            {#each data.site.siteDates as siteDate}
                <ListBoxItem
                    bind:group={comboboxValueSiteDate}
                    on:click={handleClick}
                    name="medium"
                    value={siteDate.siteDateId}
                >
                    {siteDate.year} - week {siteDate.week}
                </ListBoxItem>
            {/each}
        </ListBox>
        <div class="arrow bg-surface-100-800-token" />
    </div>

    <svelte:fragment slot="standard-head">
        <div class="flex flex-row justify-between">
            <div class="basis-1/3 my-auto">
                {data.site.siteName}, {data.site.county.name} County
            </div>
            <div class="basis-1/3 flex flex-row justify-center space-x-4">
                <div class="w-1/2 text-right my-auto">Observations (year/week)</div>
                <div class="w-1/2">
                    <button
                        class="btn variant-soft w-40 justify-between"
                        use:popup={popupComboboxSiteDate}
                    >
                        <span class="capitalize"
                            >{comboboxValueSiteDate
                                ? `${comboboxValueSiteDate.toString().slice(0, 4)} week ${
                                      comboboxValueSiteDate % 100
                                  }`
                                : 'Year week'}</span
                        >
                        <span>↓</span>
                    </button>
                </div>
            </div>
            <div class="basis-1/3 my-auto text-right">
                <div class="btn-group variant-soft scale-90 my-auto">
                    <button>◀</button>
                    <button class="w-24">County</button>
                    <button>▶</button>
                </div>
            </div>
        </div>
    </svelte:fragment>

    <svelte:fragment slot="standard-content">
        <div class="max-w-[600px]">
            <div class="content">
                <div>siteName: {@html data.site.siteName ?? ''}</div>
                <div>county: {@html data.site.county.name ?? ''}</div>
                <div>township: {@html data.site.township ?? ''}</div>
                <div>locationZip: {@html data.site.locationZip ?? ''}</div>
                <div>siteAddress: {@html data.site.siteAddress ?? ''}</div>
                <div>siteAddress2: {@html data.site.siteAddress2 ?? ''}</div>
                <div>siteCityStateZip: {@html data.site.siteCityStateZip ?? ''}</div>
                <div>person: {@html data.site.person ?? ''}</div>
                <div>address: {@html data.site.address ?? ''}</div>
                <div>address2: {@html data.site.address2 ?? ''}</div>
                <div>cityStateZip: {@html data.site.cityStateZip ?? ''}</div>
                <div>phone: {@html data.site.phone ?? ''}</div>
                <div>email: {@html data.site.email ?? ''}</div>
                <div>latitudeStart: {@html data.site.latitudeStart ?? ''}</div>
                <div>latitudeEnd: {@html data.site.latitudeEnd ?? ''}</div>
                <div>altPerson: {@html data.site.altPerson ?? ''}</div>
                <div>altAddress: {@html data.site.altAddress ?? ''}</div>
                <div>altAddress2: {@html data.site.altAddress2 ?? ''}</div>
                <div>altCityStateZip: {@html data.site.altCityStateZip ?? ''}</div>
                <div>altPhone: {@html data.site.altPhone ?? ''}</div>
                <div>altEmail: {@html data.site.altEmail ?? ''}</div>
                <div>otherParticipants: {@html data.site.otherParticipants ?? ''}</div>
                <div>description: {@html data.site.description ?? ''}</div>
                <div>s1995: {@html data.site.s1995 ?? ''}</div>
                <div>s1996: {@html data.site.s1996 ?? ''}</div>
                <div>s1997: {@html data.site.s1997 ?? ''}</div>
                <div>s1998: {@html data.site.s1998 ?? ''}</div>
                <div>s1999: {@html data.site.s1999 ?? ''}</div>
                <div>s2000: {@html data.site.s2000 ?? ''}</div>
                <div>s2001: {@html data.site.s2001 ?? ''}</div>
                <div>s2002: {@html data.site.s2002 ?? ''}</div>
                <div>s2003: {@html data.site.s2003 ?? ''}</div>
                <div>s2004: {@html data.site.s2004 ?? ''}</div>
                <div>
                    createdAt: {data.site.createdAt ?? ''}
                </div>
                <div>
                    updated at {data.site.updatedAt ?? ''}
                </div>
            </div>
        </div>
    </svelte:fragment>
</StandardContainer>
