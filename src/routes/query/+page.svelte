<script lang="ts">
    import StateCountyPicker from '$lib/components/StateCountyPicker.svelte';
	export let data;
</script>

<div class="p-4">
	<StateCountyPicker stateCounties={data.stateCounties} />
	<div>Species</div>
	<div>Timeframe</div>

	<label class="label">
		<span>State/County</span>
		<input class="input px-2" type="text" placeholder="Input" />
	</label>

	<label class="label">
		<span>Select</span>
		<select class="select">
			<option value="1">Option 1</option>
			<option value="2">Option 2</option>
			<option value="3">Option 3</option>
			<option value="4">Option 4</option>
			<option value="5">Option 5</option>
		</select>
	</label>

	<label class="label">
		<span>Textarea</span>
		<textarea class="textarea p-2" rows="4" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
	</label>
					
</div>