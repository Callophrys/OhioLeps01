<script lang="ts">
	import * as config from '$lib/config'
	export let data
</script>

<!-- Checklists -->
<div class="bg-red">Count: {data.checklists.length}</div>
<section>
	<ul class="checklists">
		{#each data.checklists as checklist}
			<li class="checklist">
				<span class="bg-red-600">{checklist.xname}</span>
				<a href=checklist.slug class="title">{checklist.combinedLatin}</a>
				<span class="bg-red-600">{checklist.commonName ?? ''}</span>
			</li>
		{/each}
	</ul>
</section>