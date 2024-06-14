<script lang="ts">
    import type { Snippet } from 'svelte';

    import '../app.css';
    import { Avatar } from '@skeletonlabs/skeleton';
    import { initializeStores, Modal } from '@skeletonlabs/skeleton';
    import { storePopup } from '@skeletonlabs/skeleton';
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import Help from '$lib/components/appbar/Help.svelte';
    import Fluttering from '$lib/components/appbar/Fluttering.svelte';
    import Themer from '$lib/components/appbar/Themer.svelte';
    import SiteNavigation from '$lib/components/SiteNavigation.svelte';

    let { children }: { children: Snippet } = $props();

    let config = $state({});
    $effect(() => {
        config = $page.data.config;
        // console.log('config:', config);
    });

    const wNavBar = 60;
    const wNavHid = 56;
    const cNavBarClasses = `w-${wNavBar}`;
    const cSidebarClassesBase = `variant-filled-surface w-${wNavBar} h-full top-0 p-4 -left-${wNavHid} fixed z-10 duration-700`;
    const cSidebarClassesMedium = 'md:bg-surface-100-800-token md:text-current md:h-screen md:top-auto md:left-0 md:static';
    const cSidebarClassesHover = `hover:translate-x-${wNavHid} hover:md:translate-x-0`;
    const cSidebarClasses = `${cSidebarClassesBase} ${cSidebarClassesMedium} ${cSidebarClassesHover}`;

    const cBase = 'w-full h-full flex flex-col overflow-hidden';
    const cHeader = 'flex-none h-24 z-10';
    const cContentArea = 'flex flex-auto w-full h-full overflow-hidden';
    const cSidebarLeft = 'flex-none overflow-x-hidden overflow-y-auto w-auto';
    const cPage = 'flex-1 overflow-x-hidden flex flex-col';
    const cPageContent = 'flex-auto overflow-hidden';
    const cPageFooter = 'flex-none text-center text-xs';

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

    let showAnimatedIcon = $derived(config.showAnimatedIcon);
    let showAppBar = $derived(config.showAppBar);
    let showAvatar = $derived(config.showAvatar);
    let showFooter = $derived(config.showFooter);

    initializeStores();
</script>

<svelte:head>
    {#if config.modeDebug}
        <title>Testing</title>
    {:else}
        <title>Ohio Lepidopterists</title>
    {/if}
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Promoting interest in butterflies, skippers and moths, the Ohio Lepidopterists of Ohio encourage conservation of wildlife, as well as cooperation and understanding among all lepidopterists in appreciation of Lepidoptera." />
    <meta name="keywords" content="butterflies, skippers, moths, Tiger, Viceroy, Swallowtail, Luna, Buckeye, Metalmark, Monarch, Spangled Fritillary, Spicebush, Satyr, Nymph, Parshall, Wiedmann" />
</svelte:head>

{#snippet headerLead()}
    <div class="ml-16">
        {#if showAnimatedIcon}
            <Fluttering />
        {/if}
    </div>
{/snippet}

{#snippet headerTitle()}
    <div class="text-2xl">
        <a href="/">
            {config.title}
        </a>
    </div>
{/snippet}

{#snippet headerTrailAvatarWhenSkipped()}
    {#if !showAvatar}
        <a class="btn variant-filled w-32 justify-between" href="/account">
            <span>Account</span>
        </a>
    {/if}
{/snippet}

{#snippet headerTrailAvatar()}
    {#if showAvatar}
        <a href="/account">
            <Avatar src="https://i.pravatar.cc/" initials="OH" width="w-24" rounded="rounded-full" border="border-4 border-surface-300-600-token hover:!border-primary-500" cursor="cursor-pointer" />
        </a>
    {/if}
{/snippet}

{#snippet headerTrailLogInOut()}
    {#if !$page.data.user}
        <a class="btn variant-filled w-32 justify-between" href="/login">
            <span>Login</span>
        </a>
    {:else}
        <form class="contents" action="/logout" method="POST" use:enhance>
            <button type="submit" class="btn variant-filled w-32 justify-between"> Log out </button><input type="hidden" name="to" value="/" />
        </form>
    {/if}
{/snippet}

{#snippet headerTrailExtras()}
    <Help />
    <Themer />
{/snippet}

{#snippet headerTrail()}
    <div class="w-fit h-24 flex mr-2">
        <div class="my-auto space-x-2 space-y-2 pr-2">
            {@render headerTrailLogInOut()}
            {@render headerTrailExtras()}
            {@render headerTrailAvatarWhenSkipped()}
        </div>

        {@render headerTrailAvatar()}
    </div>
{/snippet}

{#snippet header()}
    {#if showAppBar}
        <header class={cHeader}>
            <div class="app-bar flex flex-col bg-surface-100-800-token space-y-4" role="toolbar" aria-label={config.title} aria-labelledby=" ">
                <div class="app-bar-row-main grid items-center grid-cols-[auto_1fr_auto] gap-4">
                    {@render headerLead()}
                    {@render headerTitle()}
                    {@render headerTrail()}
                </div>
            </div>
        </header>
    {/if}
{/snippet}

{#snippet navLeft()}
    <aside class="{cSidebarLeft} {cSidebarClasses}">
        <SiteNavigation navBar={cNavBarClasses} />
    </aside>
{/snippet}

{#snippet body()}
    <main class={cPageContent}>
        {@render children()}
    </main>
{/snippet}

{#snippet footer()}
    {#if showFooter}
        <footer class={cPageFooter}>
            <div class="text-center text-xs">
                {@html config.owner}
                {config.title} &copy;{new Date().getFullYear()}
            </div>
        </footer>
    {/if}
{/snippet}

<Modal />

<!-- https://github.com/skeletonlabs/skeleton/blob/master/packages/skeleton/src/lib/components/AppShell/AppShell.svelte -->
<div class={cBase} data-testid="app-shell">
    {@render header()}

    <div class={cContentArea}>
        {@render navLeft()}

        <div class={cPage}>
            {@render body()}
            {@render footer()}
        </div>
    </div>
</div>
