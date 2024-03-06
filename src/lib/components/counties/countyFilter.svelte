<script lang="ts">
    import { getContext } from 'svelte';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import type { CountyMonitored } from '$lib/types';
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import exp from 'constants';

    export let vButtonGroupClasses: CssClasses = '';

    // Properties (styles)
    /** */
    export let elementEins: CssClasses = 'pr-2';
    export let elementZwei: CssClasses = '';
    export let elementDrei: CssClasses = '-mr-16';

    // Constants (styles)
    const cClassesElementEins = "my-auto before:content-['Monitored_counties:'] before:lg:content-['Counties_with_monitored_sites:']";
    const cClassesElementZwei = "my-auto text-right before:content-[''] sm:before:content-['Filter_by:'] lg:before:content-['Filter_by_monitor_status:']";
    const cClassesElementDrei = 'flex flex-row space-x-2';

    // Reactive styles
    $: classesElementEins = `${cClassesElementEins} ${elementEins} ${$$props.class ?? ''}`;
    $: classesElementZwei = `${cClassesElementZwei} ${elementZwei} ${$$props.class ?? ''}`;
    $: classesElementDrei = `${cClassesElementDrei} ${elementDrei} ${$$props.class ?? ''}`;

    enum MonitorStatus {
        ALL = 0,
        MONITORED = 1,
        UNMONITORED = 2,
    }

    function filterCountyGroups(newValue: MonitorStatus) {
        switch (newValue) {
            case MonitorStatus.MONITORED:
                vButtonGroupClasses = 'group hide-unmonitored';
                break;
            case MonitorStatus.UNMONITORED:
                vButtonGroupClasses = 'group hide-monitored';
                break;
            default:
                vButtonGroupClasses = '';
        }
        return true;
    }

    function handleShowClick(e: any) {
        filterCountyGroups(Number(e.target.value));
    }

    let counties: CountyMonitored[] = getContext('counties');
    let showUnmonitored = MonitorStatus.MONITORED;
    filterCountyGroups(showUnmonitored);
</script>

<div class={classesElementEins}>
    &nbsp;{counties.filter((c) => c.isMonitored).length}
</div>
<div class="flex flex-row space-x-2">
    <div class={classesElementZwei} />
    <div class={classesElementDrei}>
        <div class="scale-75 origin-left">
            <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
                <RadioItem bind:group={showUnmonitored} on:click={handleShowClick} name="toggle-show-all" value={MonitorStatus.ALL}>All</RadioItem>
                <RadioItem bind:group={showUnmonitored} on:click={handleShowClick} name="toggle-show-monitored" value={MonitorStatus.MONITORED}>Monitored</RadioItem>
                <RadioItem bind:group={showUnmonitored} on:click={handleShowClick} name="toggle-show-unmonitored" value={MonitorStatus.UNMONITORED}>Unmonitored</RadioItem>
            </RadioGroup>
        </div>
    </div>
</div>
