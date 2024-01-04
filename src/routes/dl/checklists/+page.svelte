<script lang="ts">
	import StandardContainer from '$lib/components/StandardContainer.svelte';
	export let data
</script>

<!-- Checklists -->
<StandardContainer>
	<div class="bg-red">Checklist (species) Count: {data.checklists.length}</div>
	<section>
		<ul class="checklists">
			{#each data.checklists as checklist}
				<li class="checklist">
					<div class="grid grid-cols-4 gap-2">
						<span class="">{checklist.commonName ?? ''}</span>
						<span class="">{checklist.xname}</span>
						<a href=checklist.slug class="title">{checklist.combinedLatin}</a>
					</div>
				</li>
			{/each}
		</ul>
	</section>
</StandardContainer>