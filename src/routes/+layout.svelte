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
    slotPageContent="overflow-hidden"
    slotPageFooter="text-center text-xs">
    <svelte:fragment slot="header">
        {#if config.showAppBar}
            <AppBar>
                <svelte:fragment slot="lead">
                    {#if config.showAnimatedIcon}
                        <div class="ml-16">
                            <Fluttering />
                        </div>
                    {/if}
                </svelte:fragment>

                <div class="text-2xl">
                    <a href="/">
                        {config.title}
                    </a>
                </div>

                <svelte:fragment slot="trail">
                    <div class="w-fit h-24 flex">
                        <div class="my-auto space-x-2 space-y-2 pr-2">
                            {#if !$page.data.user}
                                <a class="btn variant-filled w-32 justify-between" href="/login">
                                    <span>Login</span>
                                </a>
                            {:else}
                                <form class="contents" action="/logout" method="POST" use:enhance>
                                    <button type="submit" class="btn variant-filled w-32 justify-between"> Log out </button><input type="hidden" name="to" value="/" />
                                </form>
                            {/if}

                            <Help>
                                <nav class="list-nav">
                                    <ul class="">
                                        <li>
                                            <a href="https://tailwindcss.com/docs/container" target="_blank" class="hover:rounded-none">TailwindCSS</a>
                                        </li>
                                        <li>
                                            <a href="https://www.skeleton.dev/elements/forms" target="_blank" class="hover:rounded-none">SkeletonUI</a>
                                        </li>
                                        <li class="">
                                            <a href="https://svelte.dev/docs/introduction" target="_blank" class="hover:rounded-none">Svelte</a>
                                        </li>
                                        <li>
                                            <a href="https://kit.svelte.dev/docs/introduction" target="_blank" class="hover:rounded-none">SvelteKit</a>
                                        </li>
                                        <li>
                                            <a href="https://www.compart.com/en/unicode/block/U+2190" target="_blank" class="hover:rounded-none">Icons - Arrows</a>
                                        </li>
                                        <li>
                                            <a href="https://www.compart.com/en/unicode/block/U+2700" target="_blank" class="hover:rounded-none">Icons - Dingbats</a>
                                        </li>
                                        <li>
                                            <a href="https://www.compart.com/en/unicode/block/U+1F300" target="_blank" class="hover:rounded-none">Icons - Pics &amp; Symbols</a>
                                        </li>
                                        <li>
                                            <a href="https://www.degraeve.com/reference/specialcharacters.php" target="_blank" class="hover:rounded-none">HTML special characters</a>
                                        </li>
                                        <li>
                                            <a href="https://www.prisma.io/docs/orm/prisma-schema/data-model/models" target="_blank" class="hover:rounded-none">Prisma</a>
                                        </li>
                                        <li>
                                            <a href="https://github.com/Callophrys/OhioLeps01" target="_blank" class="hover:rounded-none">Source repo</a>
                                        </li>
                                    </ul>
                                </nav>
                            </Help>

                            <Themer />

                            {#if !config.showAvatar}
                                <a class="btn variant-filled w-32 justify-between" href="/account">
                                    <span>Account</span>
                                </a>
                            {/if}
                        </div>

                        {#if config.showAvatar}
                            <a href="/account">
                                <Avatar src="https://i.pravatar.cc/" initials="OH" width="w-24" rounded="rounded-full" border="border-4 border-surface-300-600-token hover:!border-primary-500" cursor="cursor-pointer" />
                            </a>
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
                    <li><a href="/api/checklists">Checklists</a></li>
                    <li><a href="/api/counties">Counties</a></li>
                    <li><a href="/api/countypanes">County Panes</a></li>
                    <li><a href="/api/sites">Sites</a></li>
                    <li><a href="/api/nameaddresses">Name-Address</a></li>
                    <!--
                    <li class="indent-4"><a href="/api/sitedates">Year/Week Dates</a></li>
                    <li class="indent-8"><a href="/api/siteDateObservations">Observations</a></li>
                    -->
                {/if}
                <li><a href="/api/ohio">Ohio</a></li>
                <li><a href="/api/taxonomy">Butterflies of North America</a></li>
                <li><a href="/api/gallery">Gallery</a></li>
            </ul>
        </nav>
    </svelte:fragment>

    <!-- (sidebarRight) -->
    <!-- (pageHeader) -->

    <!-- Router Slot -->
    <slot />

    <!-- Wasn't wild for full page tranistions
    import { fly } from 'svelte/transition'

    {#key data.url}
      <div
        in:fly={{ x: -200, duration: 300, delay: 300 }}
        out:fly={{ x: 200, duration: 300 }}
      >
        <slot />
      </div>
    {/key}
-->
    <!-- ---- / ---- -->

    <svelte:fragment slot="pageFooter">
        {#if config.showFooter}
            {@html config.owner} {config.title} &copy;{new Date().getFullYear()}
        {/if}
    </svelte:fragment>
</AppShell>
