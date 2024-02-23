<script lang="ts">
    import { getContext } from 'svelte';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import type { CountyMonitored } from '$lib/types';

    export let countyGroup: HTMLElement;

    enum MonitorStatus {
        ALL = 0,
        MONITORED = 1,
        UNMONITORED = 2,
    }

    let counties: CountyMonitored[] = getContext('counties');
    let showUnmonitored: number;

    function handleShowClick(e: any) {
        const val = Number(e.target.value);
        console.log(val, e.target.name);
        switch (val) {
            case MonitorStatus.MONITORED:
                countyGroup.classList.toggle('hide-monitored', false);
                countyGroup.classList.toggle('hide-unmonitored', true);
                break;
            case MonitorStatus.UNMONITORED:
                countyGroup.classList.toggle('hide-monitored', true);
                countyGroup.classList.toggle('hide-unmonitored', false);
                break;
            default:
                countyGroup.classList.toggle('hide-monitored', false);
                countyGroup.classList.toggle('hide-unmonitored', false);
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
