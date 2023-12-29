<script lang="ts">
    import '../app.css';
	import * as config from '$lib/config'
    import OtherSwitch from '$lib/components/otherSwitch.svelte'

    import { TabGroup, Tab, TabAnchor, AppShell, initializeStores } from '@skeletonlabs/skeleton';
    import { writable, type Writable } from 'svelte/store';
    const tabSet: Writable<number> = writable(0);
</script>

<AppShell>


<!-- Header -->
<div>Header block - {config.title}
    <span>{new Intl.DateTimeFormat('en-US').format(Date.now())}</span>
    <OtherSwitch />
</div>

<!--
<TabGroup>
	<Tab bind:group={$tabSet} name="tab1" value={0}>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>(label 1)</span>
	</Tab>
	<Tab bind:group={$tabSet} name="tab2" value={1}>(label 2)</Tab>
	<Tab bind:group={$tabSet} name="tab3" value={2}>(label 3)</Tab>
	< !-- Tab Panels --- >
	<svelte:fragment slot="panel">
		{#if $tabSet === 0}
			(tab panel 1 contents)
		{:else if $tabSet === 1}
			(tab panel 2 contents)
		{:else if $tabSet === 2}
			(tab panel 3 contents)
		{/if}
	</svelte:fragment>
</TabGroup>
-->		

<nav>
	<a href="/">home</a>
	<a href="/sites">Sites</a>
	<a href="/sitedates">Site Dates</a>
	<a href="/siteobservations">Site Observations</a>
	<a href="/checklists">Checklists</a>
	<a href="/statecounties">State-Counties</a>
</nav>


<!-- Body -->
<main>
    <slot />
</main>

<!-- Footer -->
<footer class="flex flex-col justify-between min-h-screen border-t border-solid border-t-slate-400 text-center"><p class="text-xs">{config.title} &copy;{new Date().getFullYear()}</p></footer>

</AppShell>