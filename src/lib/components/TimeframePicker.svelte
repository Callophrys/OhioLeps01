<script lang="ts">
import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
import { monitorSeason } from '$lib/config';

let value: number = 0;
</script>

<p>Range of dates by
<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
	<RadioItem bind:group={value} name="justify" value={0}>Date</RadioItem>
	<RadioItem bind:group={value} name="justify" value={1}>Week</RadioItem>
</RadioGroup>
</p>
{monitorSeason.start.month}

<p>Time of the day</p>