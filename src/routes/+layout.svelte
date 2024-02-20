<script lang="ts">
    import '../app.css';
    import { AppShell, AppBar, Avatar, LightSwitch, type CssClasses } from '@skeletonlabs/skeleton';
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import { storePopup } from '@skeletonlabs/skeleton';
    import Help from '$lib/components/appbar/Help.svelte';
    import Themer from '$lib/components/appbar/Themer.svelte';
    import SiteNavigation from '$lib/components/SiteNavigation.svelte';
    import Fluttering from '$lib/components/appbar/Fluttering.svelte';
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';

    let config: any = $page.data.config ?? {};

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

    const cSidebarClasses = 'bg-surface-500/5 w-60 h-screen p-4 -left-56 md:left-0 fixed md:block z-10 duration-700';
    let xSidebarClasses: CssClasses = '';
    $: sidebarClasses = `${cSidebarClasses} ${xSidebarClasses}`;

    let isHovering = false;
    function menuHover() {
        if (!isHovering) {
            xSidebarClasses = xSidebarClasses ? '' : 'translate-x-56 md:translate-x-0';
            isHovering = true;
        }
    }

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<AppShell slotSidebarLeft={sidebarClasses} slotPageContent="overflow-hidden" slotPageFooter="text-center text-xs">
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
        <SiteNavigation navBarClasses="w-60" on:mouseover={menuHover} on:mouseleave={() => isHovering = false} />
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
