<script lang="ts">
import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
let value: number = 0;
</script>

<p>Range of dates by
<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
	<RadioItem bind:group={value} name="justify" value={0}>Date</RadioItem>
	<RadioItem bind:group={value} name="justify" value={1}>Year/Week</RadioItem>
</RadioGroup>
</p>

<p>Time of the day</p>