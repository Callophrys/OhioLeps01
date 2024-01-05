<script lang="ts">
    import '../app.css';
    import * as config from '$lib/config'
    import { AppShell, AppBar, Avatar, LightSwitch  } from '@skeletonlabs/skeleton';
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import { storePopup } from '@skeletonlabs/skeleton';

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
            
    import Help from '$lib/components/appbar/Help.svelte'
    import Themer from '$lib/components/appbar/Themer.svelte'
    import Fluttering from '$lib/components/appbar/Fluttering.svelte'
    
    export let loggedInValue: boolean = false;
    
</script>

<AppShell
    slotSidebarLeft="bg-surface-500/5 w-56 p-4"
    slotPageContent=""
    slotPageFooter="text-center text-xs">

    <svelte:fragment slot="header">
    {#if config.showAppBar}
        <AppBar gridColumns="grid-cols-3"
            slotDefault="place-self-center"
            slotTrail="place-content-end">

            <svelte:fragment slot="lead">
            {#if config.showAnimatedIcon}
                <div class="ml-16">
                    <Fluttering />
                </div>
            {/if}
            </svelte:fragment>

            <div class="text-2xl">
                {config.title} {new Intl.DateTimeFormat('en-US').format(Date.now())}
            </div>

            <svelte:fragment slot="trail">
                <div class="columns-2 w-fit h-24 flex">

                    <div class="my-auto space-x-2 space-y-2 pr-2">
                    
                        {#if (!loggedInValue)}
                        <a class="btn variant-filled w-36 justify-between" href="/login" on:click={()=>loggedInValue=!loggedInValue}>
                            <span class="capitalize">Login</span>
                            <i class="fa-solid fa-arrow-right-to-bracket"></i>
                        </a>
                        {:else}
                        <a class="btn variant-filled w-36 justify-between" href="/logout" on:click={()=>loggedInValue=!loggedInValue}>
                            <span class="capitalize">Logout</span>
                        </a>
                        {/if}

                        <Help>
                            <nav class="list-nav">
                                <ul class="">
                                    <li class="">
                                        <a href="https://tailwindcss.com/docs/container" target="_blank" class="hover:rounded-none">TailwindCSS</a>
                                    </li>
                                    <li>
                                        <a href="https://www.skeleton.dev/elements/forms" target="_blank" class="hover:rounded-none">SkeletonUI</a>
                                    </li>
                                    <li>
                                        <a href="https://svelte.dev/docs/components" target="_blank">Svelte</a>
                                    </li>
                                    <li>
                                        <a href="https://kit.svelte.dev/docs/routing" target="_blank">Sveltekit</a>
                                    </li>
                                    <li>
                                        <a href="https://www.prisma.io/docs/orm/prisma-schema/data-model/models" target="_blank">Prisma</a>
                                    </li>
                                </ul>
                            </nav>
                        </Help>

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
    {/if}
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
                <li><a href="/dl/statecounties">State-County</a></li>
                <li><a href="/dl/nameaddresses">Name-Address (auth)</a></li>
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
