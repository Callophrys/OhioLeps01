<script lang="ts">
    import { getContext } from 'svelte';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import type { CountyMonitored } from '$lib/types';
    import type { CssClasses } from '@skeletonlabs/skeleton';

    export let vButtonGroupClasses: CssClasses = '';

    enum MonitorStatus {
        ALL = 0,
        MONITORED = 1,
        UNMONITORED = 2,
    }

    let counties: CountyMonitored[] = getContext('counties');
    let showUnmonitored = MonitorStatus.ALL;

    function handleShowClick(e: any) {
        const val = Number(e.target.value);
        //console.log(val, e.target.name);
        switch (val) {
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
</script>

<div class="my-auto">Counties with monitored sites: {counties.filter((c) => c.isMonitored).length}</div>
<div class="flex flex-row space-x-2">
    <span class="my-auto text-right">Filter monitor status</span>
    <div class="scale-75 origin-left">
        <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
            <RadioItem bind:group={showUnmonitored} on:click={handleShowClick} name="toggle-show-all" value={MonitorStatus.ALL}>All</RadioItem>
            <RadioItem bind:group={showUnmonitored} on:click={handleShowClick} name="toggle-show-monitored" value={MonitorStatus.MONITORED}>Monitored</RadioItem>
            <RadioItem bind:group={showUnmonitored} on:click={handleShowClick} name="toggle-show-unmonitored" value={MonitorStatus.UNMONITORED}>Unmonitored</RadioItem>
        </RadioGroup>
    </div>
</div>
