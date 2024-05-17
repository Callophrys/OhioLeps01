<script lang="ts">
    /*-- Imports */
    import type { CountyMonitored } from '$lib/types';
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import { getContext } from 'svelte';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

    type CountyFilterProps = {
        vButtonGroupClasses: CssClasses;
        elementEins: CssClasses;
        elementZwei: CssClasses;
        elementDrei: CssClasses;
        controlBody: CssClasses | null;
    };

    let { vButtonGroupClasses = $bindable(''), elementEins = 'pr-2', elementZwei = '', elementDrei = '-mr-16', controlBody = null }: CountyFilterProps = $props();

    /*-- -- Data -- */
    /*-- Exports */

    /*-- Context */
    let counties: CountyMonitored[] = getContext('counties');

    /*-- -- Styling -- */
    /*-- Properties (styles) */

    /*-- Constants (styles) */
    const cClassesElementEins = "my-auto before:content-['Monitored_counties:'] before:lg:content-['Counties_with_monitored_sites:']";
    const cClassesElementZwei = "my-auto text-right before:content-[''] sm:before:content-['Filter_by:'] lg:before:content-['Filter_by_monitor_status:']";
    const cClassesElementDrei = 'flex flex-row space-x-2';
    const cControlBody = '';

    /*-- Reactives (styles) */
    let classesElementEins = $derived(`${cClassesElementEins} ${elementEins}`); // ${$$props.class ?? ''}`);
    let classesElementZwei = $derived(`${cClassesElementZwei} ${elementZwei}`); // ${$$props.class ?? ''}`);
    let classesElementDrei = $derived(`${cClassesElementDrei} ${elementDrei}`); // ${$$props.class ?? ''}`);
    let classesControlBody = $derived(`${cControlBody} ${controlBody}`); //${$$props.class ?? ''}`);

    /*-- -- Coding -- */
    /*-- Enums */
    enum MonitorStatus {
        ALL = 0,
        MONITORED = 1,
        UNMONITORED = 2,
    }

    /*-- Constants (functional) */
    /*-- Properties (functional) */
    /*-- Variables and objects */
    let showUnmonitored = $state(MonitorStatus.MONITORED);

    /*-- Run first stuff */
    $effect(() => {
        filterCountyGroups(showUnmonitored);
    });

    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */
    function handleShowClick(e: any) {
        filterCountyGroups(Number(e.target.value));
    }

    /*-- Methods */
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

    /*-- Reactives (functional) */
</script>

<div class={classesElementEins}>
    &nbsp;{counties.filter((c) => c.isMonitored).length}
</div>
<div class="flex flex-row space-x-2">
    <div class={classesElementZwei}></div>
    <div class={classesElementDrei}>
        <div class={classesControlBody}>
            <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
                <RadioItem bind:group={showUnmonitored} on:click={handleShowClick} name="toggle-show-all" value={MonitorStatus.ALL}>All</RadioItem>
                <RadioItem bind:group={showUnmonitored} on:click={handleShowClick} name="toggle-show-monitored" value={MonitorStatus.MONITORED}>Monitored</RadioItem>
                <RadioItem bind:group={showUnmonitored} on:click={handleShowClick} name="toggle-show-unmonitored" value={MonitorStatus.UNMONITORED}>Unmonitored</RadioItem>
            </RadioGroup>
        </div>
    </div>
</div>
