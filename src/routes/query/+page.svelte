<script lang="ts">
	import * as config from '$lib/config'
    import StateCountyPicker from '$lib/components/query/StateCountyPicker.svelte';
	import SpeciesPicker from '$lib/components/query/SpeciesPicker.svelte';
	import TimeframePicker from '$lib/components/query/TimeframePicker.svelte';
	import DoubledContainer from '$lib/components/DoubledContainer.svelte';
	import { TreeView, TreeViewItem, RecursiveTreeView } from '@skeletonlabs/skeleton';
	import type { TreeViewNode } from '@skeletonlabs/skeleton';
	
let myTreeViewNodes: TreeViewNode[] = [
	{
		id: 'unique-id',
		content: 'content',
		lead: '(icon)',
		children: [ ]
	},
	{
		id: 'unique-id-2',
		content: 'content',
		lead: '(icon)',
		children: [ ]
	}
	// ...
]
let checkedNodes : string[] = ['javascript'];
let indeterminateNodes : string[] = ['programming', 'language'];
						

	export let data;
</script>

<DoubledContainer>

	<svelte:fragment slot="left">
		<StateCountyPicker stateCounties={data.stateCounties} initialHideUnmonitoredChoice={config.initialHideUnmonitedChoice} />
		<SpeciesPicker speciesChecklist={data.speciesList} initialUseLatinChoice={config.initialUseLatinChoice} />
		<TimeframePicker initialDateRangeChoice={config.initialDateRangeChoice} />
		<hr>
		<div class="flex">
			<button class="btn variant-filled w-auto justify-between mx-auto">
				<span>Run Search</span>
				<span>↓</span>
			</button>
		</div>
		
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
		
		<hr>

<RecursiveTreeView 
	selection 
	multiple 
	relational 
	nodes={myTreeViewNodes} 
	bind:checkedNodes={checkedNodes} 
	bind:indeterminateNodes={indeterminateNodes}/>

	</svelte:fragment>

	<svelte:fragment slot="right">
		<span class="">Results</span>
	</svelte:fragment>

</DoubledContainer>