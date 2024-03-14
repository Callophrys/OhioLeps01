<script lang="ts">
    import '../app.css';
    import { AppShell, AppBar, Avatar, LightSwitch } from '@skeletonlabs/skeleton';
    import { initializeStores, Modal } from '@skeletonlabs/skeleton';
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import { storePopup } from '@skeletonlabs/skeleton';
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import Help from '$lib/components/appbar/Help.svelte';
    import Fluttering from '$lib/components/appbar/Fluttering.svelte';
    import Themer from '$lib/components/appbar/Themer.svelte';
    import SiteNavigation from '$lib/components/SiteNavigation.svelte';

    let config: any = $page.data.config ?? {};

    const cNavBarClasses = 'w-60';
    const cSidebarClassesBase = 'variant-filled-surface w-60 h-full top-0 p-4 -left-56 fixed z-10 duration-700';
    const cSidebarClassesMedium = 'md:bg-surface-100-800-token md:text-current md:h-screen md:top-auto md:left-0 md:static';
    const cSidebarClassesHover = 'hover:translate-x-56 hover:md:translate-x-0';
    const cSidebarClasses = `${cSidebarClassesBase} ${cSidebarClassesMedium} ${cSidebarClassesHover}`;

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

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

<Modal />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<AppShell slotSidebarLeft={cSidebarClasses} slotPageContent="overflow-hidden" slotPageFooter="text-center text-xs">
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

                            <Help />
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
        <SiteNavigation navBar={cNavBarClasses} />
    </svelte:fragment>

    <!-- (sidebarRight) -->
    <!-- (pageHeader) -->

    <!-- Router Slot -->
    <slot />

    <!-- ---- / ---- -->
    <svelte:fragment slot="pageFooter">
        {#if config.showFooter}
            {@html config.owner} {config.title} &copy;{new Date().getFullYear()}
        {/if}
    </svelte:fragment>
</AppShell>
