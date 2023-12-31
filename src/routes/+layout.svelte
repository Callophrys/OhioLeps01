<script lang="ts">
	import * as config from '$lib/config'
    //import { TabGroup, Tab, TabAnchor, initializeStores } from '@skeletonlabs/skeleton';
    import { AppShell, AppBar, Avatar, LightSwitch  } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
			
    import { writable, type Writable } from 'svelte/store';
	//import Help from '$lib/components/Help.svelte'
	import Themer from '$lib/components/Themer.svelte'
    const tabSet: Writable<number> = writable(0);
</script>

<AppShell
	slotSidebarLeft="bg-surface-500/5 w-56 p-4"
	slotPageContent=""
	slotPageFooter="text-center text-xs">

	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end">

			<svelte:fragment slot="lead">
				(icon)
			</svelte:fragment>

			<div class="text-2xl">
				{config.title} {new Intl.DateTimeFormat('en-US').format(Date.now())}
			</div>

			<svelte:fragment slot="trail">
				<div class="columns-2 w-fit h-24 flex">
					<div class="my-auto pr-2">
						<!--<Help />-->
						<Themer />	
					</div>
					<Avatar src="https://i.pravatar.cc/"
						initials="OH"
						width="w-24"
						rounded="rounded-full"
						border="border-4 border-surface-300-600-token hover:!border-primary-500"
						cursor="cursor-pointer" />
				</div>
			</svelte:fragment>

		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<nav class="list-nav">
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/dl/countypanes">County Panes</a></li>
				<li><a href="/dl/sites">Sites</a></li>
				<li><a href="/dl/sitedates">Site Dates</a></li>
				<li><a href="/dl/siteobservations">Site Observations</a></li>
				<li><a href="/dl/checklists">Checklists</a></li>
				<li><a href="/dl/statecounties">State-County List</a></li>
				<li><a href="/dl/nameaddresses">Name-Address List</a></li>
			</ul>
		</nav>
	</svelte:fragment>

	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->

	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->

	<svelte:fragment slot="pageFooter">
		{config.title} &copy;{new Date().getFullYear()}
	</svelte:fragment>

</AppShell>

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
