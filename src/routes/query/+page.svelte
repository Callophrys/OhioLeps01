<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	export let data
	
	let valueMultiple: string;
</script>

<div class="p-4">

	<ListBox multiple regionLead="bg-amber-400">
		<ListBoxItem bind:group={valueMultiple} name="medium" value="books">Books</ListBoxItem>
		<ListBoxItem bind:group={valueMultiple} name="medium" value="movies">Movies</ListBoxItem>
		<ListBoxItem bind:group={valueMultiple} name="medium" value="tv">TV</ListBoxItem>
	</ListBox>
				
	<label class="label">
		<span>State/Counties</span>
		<select class="select">
			{#each data.stateCounties as stateCounty}
			<option>{ stateCounty.county }
			</option>
		{/each}
		</select>
	</label>

		<span>Species</span>

		<span>Timeframe</span>

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