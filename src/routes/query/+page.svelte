<script lang="ts">
	import * as config from '$lib/config'
    import StateCountyPicker from '$lib/components/query/StateCountyPicker.svelte';
	import SpeciesPicker from '$lib/components/query/SpeciesPicker.svelte';
	import TimeframePicker from '$lib/components/query/TimeframePicker.svelte';
	import DoubledContainer from '$lib/components/DoubledContainer.svelte';
	import { TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
	
	export let data;
	export let form;
</script>

<DoubledContainer>

	<svelte:fragment slot="left">

		<form method="POST" class="p-4 space-y-2" action="?/query">

			<StateCountyPicker stateCounties={data.stateCounties} initialHideUnmonitoredChoice={config.initialHideUnmonitedChoice} />
			<SpeciesPicker speciesChecklist={data.speciesList} initialUseLatinChoice={config.initialUseLatinChoice} />
			<TimeframePicker initialDateRangeChoice={config.initialDateRangeChoice} />
			<hr>
			<div class="flex">
				<button class="btn variant-filled w-auto justify-between mx-auto">
					<span>Run Search</span>
					<span>→</span>
				</button>
			</div>

		</form>

	</svelte:fragment>

	<svelte:fragment slot="right">

		<span class="">Results</span>
		{#if form?.success}
		<p>here are {form.snouts} snouts.</p>
		{/if}
		<TreeView>
			<TreeViewItem>
				(item 1)
				<svelte:fragment slot="children">
					<TreeViewItem>
						(Child 1)
						<svelte:fragment slot="children">
							<TreeViewItem>
								(Child of Child 1)
							</TreeViewItem>
							<TreeViewItem>
								(Child of Child 2)
							</TreeViewItem>
						</svelte:fragment>
					</TreeViewItem>
					<TreeViewItem>
						(Child 2)
					</TreeViewItem>
				</svelte:fragment>
			</TreeViewItem>
			<TreeViewItem>
				(item 2)
			</TreeViewItem>
		</TreeView>
		
	</svelte:fragment>

</DoubledContainer>