<script lang="ts">
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import type { Snippet } from 'svelte';
    import { showFooter } from '$lib/config';
    import { page } from '$app/stores';
    import Head from '$lib/components/layouts/Head.svelte';
    import Body from '$lib/components/layouts/Body.svelte';
    import Tail from '$lib/components/layouts/Tail.svelte';
    //import Configs from '$lib/components/data/Configs.svelte';

    const cBaseCard = 'card py-4 pl-4 h-full w-full flex flex-col space-y-2';

    // const cLeftBF = 'pl-8 py-8';
    // const cLeftB = 'pl-8 pt-8 pb-4';
    //
    // const cCenterBF = 'p-8';
    // const cCenterB = 'px-8 pt-8 pb-4';
    //
    // const cRightBF = 'py-8 pr-8';
    // const cRightB = 'pt-8 pr-8 pb-4';

    const cOuterBodyFooter = 'container flex flex-row gap-8 px-8 pt-8 pb-4 has-footer';
    const cOuterBodyNoFooter = 'container flex flex-row gap-8 p-8';

    //$inspect(Configs.showHeader);
    //$inspect(Configs.showFooter);
    //console.log(Configs.showFooter);

    const cHeadClasses = 'pr-4';
    const cBodyClasses = 'space-y-2 h-full';
    const cTailClasses = 'pr-4';

    let config = $state({});
    $effect(() => {
        config = $page.data.config;
        //console.log('config:', config);
    });

    // Should be 144 (with footer) or 128 but added 4px for just in case
    // Should do this for show/hide avatar and for show/hide app bar
    //let heightAdjust = 4 + (showAppBar ? 132 : 0) + (showFooter ? 16 : 0);
    let showFooterFromFile = $state(showFooter);

    let {
        head = null,
        body,
        tail = null,
        bodyClasses = 'overflow-y-auto',
        outerBodyClasses = '',
    }: {
        head: Snippet | null;
        body: Snippet;
        tail: Snippet | null;
        bodyClasses: CssClasses | null;
        outerBodyClasses: CssClasses | null;
    } = $props();

    let classesOuterBody = $derived(`${config.showFooter || showFooterFromFile ? cOuterBodyFooter : cOuterBodyNoFooter} ${outerBodyClasses}`);
    let classesBody = `${cBodyClasses} ${bodyClasses}`;
</script>

<div class={classesOuterBody}>
    <div class={cBaseCard}>
        {#if head}
            <Head classes={cHeadClasses}>
                {@render head()}
            </Head>
        {/if}
        {#if body}
            <Body classes={classesBody}>
                {@render body()}
            </Body>
        {/if}
        {#if tail}
            <Tail classes={cTailClasses}>
                {@render tail()}
            </Tail>
        {/if}
    </div>
</div>

<style>
    /* Calc and 100vh do not work as an
     * arbitrary valued Tailwind class.
     * Calc and 100% does work */
    .container.has-footer {
        height: calc(100vh - 7rem); /* 144px); */
    }
    .container {
        height: calc(100vh - 6rem); /* 128px); */
    }
</style>
