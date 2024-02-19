<script lang="ts">
    import SitePicker from '$lib/components/datanavigation/SitePicker.svelte';
    import CountyPicker from '$lib/components/datanavigation/CountyPicker.svelte';
    import SiteDatePicker from '$lib/components/datanavigation/SiteDatePicker.svelte';
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    //import { createEventDispatcher } from 'svelte';
    import { goto } from '$app/navigation';
    import { setContext } from 'svelte';

    export let data;

    setContext('siteDates', data.site.siteDates);
    setContext('counties', data.counties);
    setContext('sites', data.sites);
    //console.log(data.site.county);

    function handleClick(event: any) {
        event.preventDefault();
        if (event.currentTarget?.value) {
            goto('/api/sitedates/' + event.currentTarget.value);
        }
    }

    //const dispatch = createEventDispatcher();
    //const submit = () => dispatch('submit');

    // TODO
    // bind the selected listboxtime
    // and/or use action
    // https://svelte.dev/docs/element-directives#use-action
    // actions:
    // https://svelte.dev/docs/svelte-action
    // does bind selected go on the parent component?  See skeletonui for event stuff
</script>

<StandardContainer>
    <svelte:fragment slot="standardHead">
        <div class="flex flex-row justify-between gap-1 md:gap-2">
            <SitePicker currentSite={data.site}>
                <svelte:fragment slot="heading">Site:</svelte:fragment>
            </SitePicker>
            <SiteDatePicker bind:currentSiteId={data.site.siteId}>
                <svelte:fragment slot="heading">Observations:</svelte:fragment>
            </SiteDatePicker>
            <CountyPicker currentCounty={data.site.county}>
                <svelte:fragment slot="heading">County:</svelte:fragment>
            </CountyPicker>
        </div>
        <!--
                    TODO: Make this change the site by alphabetical
                          Need to filter Observations where observations must indicate as such
                          If limit is reached then move loudly to next county's worth of sites

                          Any change here should advance the downstream pickers and the
                          current data - as long as there is no unchanged data - Prompt
                          user about this
                -->
        <!--
                TODO: Convert to ObservationPicker picker (or YearWeekPicker)
                      If limit is reached then move loudly to next year's worth of weeks
                      and then even more loudly to next site 

                      Should the last week of last year advance to another site? 
                      Or should there be a prompt about creating a new year-week record?

                      Any change here should advance the downstream pickers and the
                      current data - as long as there is no unchanged data - Prompt
                      user about this
            -->
        <!--
                <div class="w-1/2 text-right my-auto">Observations (year/week)</div>
                <div class="w-1/2">
                    <button class="btn variant-soft w-40 justify-between" use:popup={popupComboboxSiteDate}>
                        <span class="capitalize">{comboboxValueSiteDate ? `${comboboxValueSiteDate.toString().slice(0, 4)} week ${comboboxValueSiteDate % 100}` : 'Year week'}</span>
                        <span>↓</span>
                    </button>
                </div>
                -->
        <!--
                    TODO: Make this change the County by alphabetical
                          Need to filter Sites where sites must indicate as such
                          If limit is reached then move loudly to next regions's worth of sites - if region is present
                          Maybe create some option for user to ignore this

                          Any change here should advance the downstream pickers and the
                          current data - as long as there is no unchanged data - Prompt
                          user about this
                -->
        <!--
                TODO: Add Region picker
                      Need to filter Counties where counties must indicate as such
                      Maybe make region and admin level option

                      Any change here should advance the downstream pickers and the
                      current data - as long as there is no unchanged data - Prompt
                      user about this
            -->
        <!--div class="basis-1/3 my-auto">
        </div>
        <div class="basis-1/3 flex flex-row justify-center space-x-4">
        </div>
        <div class="basis-1/3 my-auto text-right">
        </div-->
    </svelte:fragment>

    <svelte:fragment slot="standardBody">
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
