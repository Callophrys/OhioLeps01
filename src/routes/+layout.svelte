<script lang="ts">
    import '../app.css';
    import * as config from '$lib/config';
    import { AppShell, AppBar, Avatar, LightSwitch } from '@skeletonlabs/skeleton';
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import { storePopup } from '@skeletonlabs/skeleton';

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

    import Help from '$lib/components/appbar/Help.svelte';
    import Themer from '$lib/components/appbar/Themer.svelte';
    import Fluttering from '$lib/components/appbar/Fluttering.svelte';

    import { page } from '$app/stores';
    import { enhance } from '$app/forms';
</script>

<AppShell
    slotSidebarLeft="bg-surface-500/5 w-56 p-4"
    slotPageContent=""
    slotPageFooter="text-center text-xs"
>
    <svelte:fragment slot="header">
        {#if config.showAppBar}
            <AppBar
                gridColumns="grid-cols-3"
                slotDefault="place-self-center"
                slotTrail="place-content-end"
            >
                <svelte:fragment slot="lead">
                    {#if config.showAnimatedIcon}
                        <div class="ml-16">
                            <Fluttering />
                        </div>
                    {/if}
                </svelte:fragment>

                <div class="text-2xl">
                    {config.title}
                </div>

                <svelte:fragment slot="trail">
                    <div class="columns-2 w-fit h-24 flex">
                        <div class="my-auto space-x-2 space-y-2 pr-2">
                            {#if !$page.data.user}
                                <a class="btn variant-filled w-32 justify-between" href="/login">
                                    <span>Login</span>
                                </a>
                            {:else}
                                <form class="contents" action="/logout" method="POST" use:enhance>
                                    <button
                                        type="submit"
                                        on:click={() => {
                                            document.getElementsByName('main')[0].textContent = '';
                                        }}
                                        class="btn w-32 variant-filled">Log out</button
                                    >
                                </form>
                            {/if}

                            <Help>
                                <nav class="list-nav">
                                    <ul class="">
                                        <li class="">
                                            <a
                                                href="https://tailwindcss.com/docs/container"
                                                target="_blank"
                                                class="hover:rounded-none">TailwindCSS</a
                                            >
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.skeleton.dev/elements/forms"
                                                target="_blank"
                                                class="hover:rounded-none">SkeletonUI</a
                                            >
                                        </li>
                                        <li>
                                            <a
                                                href="https://svelte.dev/docs/components"
                                                target="_blank">Svelte</a
                                            >
                                        </li>
                                        <li>
                                            <a
                                                href="https://kit.svelte.dev/docs/routing"
                                                target="_blank">Sveltekit</a
                                            >
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.prisma.io/docs/orm/prisma-schema/data-model/models"
                                                target="_blank">Prisma</a
                                            >
                                        </li>
                                    </ul>
                                </nav>
                            </Help>

                            <Themer />
                        </div>

                        {#if config.showAvatar}
                            <Avatar
                                src="https://i.pravatar.cc/"
                                initials="OH"
                                width="w-24"
                                rounded="rounded-full"
                                border="border-4 border-surface-300-600-token hover:!border-primary-500"
                                cursor="cursor-pointer"
                            />
                        {/if}
                    </div>
                </svelte:fragment>
            </AppBar>
        {/if}
    </svelte:fragment>

    <svelte:fragment slot="sidebarLeft">
        <nav class="list-nav">
            <ul>
                <li><a href="/">Home</a></li>
                {#if $page.data.user}
                    {#if $page.data.user.role === 'ADMIN'}
                        <li><a href="/admin">Admin</a></li>
                    {/if}
                    <li><a href="/dl/countypanes">County Panes</a></li>
                    <li><a href="/dl/sites">Sites</a></li>
                    <li><a href="/dl/sitedates">Site Dates</a></li>
                    <li><a href="/dl/siteobservations">Site Observations</a></li>
                    <li><a href="/dl/checklists">Checklists</a></li>
                    <li><a href="/dl/statecounties">State-County</a></li>
                    <li><a href="/dl/nameaddresses">Name-Address</a></li>
                {/if}
                <li><a href="/ohio">Ohio</a></li>
                <li><a href="/dl/taxonomy">Butterflies of North America</a></li>
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
