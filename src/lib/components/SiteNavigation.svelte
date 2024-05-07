<script lang="ts">
    /*-- Imports */
    import { page } from '$app/stores';
    import { type CssClasses } from '@skeletonlabs/skeleton';

    /*-- -- Data -- */
    /*-- Exports */
    /*-- Context */
    /*-- -- Styling -- */
    type Props = {
        navBar: CssClasses;
    };
    /*-- Properties (styles) */
    let { navBar = '' }: Props = $props();

    /*-- Constants (styles) */
    const cAnchorBase = 'rounded-l-full outline-none block text-current';
    const cAnchorDefault = 'hover:bg-surface-800-100-token focus:bg-surface-200-700-token hover:text-surface-100-800-token focus:text-secondary-800-100-token';
    const cAnchorMediaMd = 'hover:md:variant-filled-surface focus:md:variant-soft-primary';
    const cAnchorIndentedPl2 = `${cAnchorBase} ${cAnchorDefault} ${cAnchorMediaMd} -ml-2 pl-2`;
    const cAnchorIndentedPl4 = `${cAnchorBase}  ${cAnchorDefault} ${cAnchorMediaMd} -ml-4 pl-4`;
    const cNavBar = '';

    /*-- Reactives (styles) */
    let classesNavBar = $state(`${cNavBar} ${navBar}`);

    /*-- -- Coding -- */
    /*-- Enums */
    /*-- Constants (functional) */
    /*-- Properties (functional) */

    /*-- Variables and objects */
    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */
    /*-- Methods */
    /*-- Reactives (functional) */
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<nav class={classesNavBar}>
    <ul>
        <li><a href="/" class={cAnchorIndentedPl2}>Home</a></li>
        {#if $page.data.user}
            {#if $page.data.user.role === 'ADMIN' || $page.data.user.role === 'ADMIN'}
                <li><a href="/admin" class={cAnchorIndentedPl2}>Admin</a></li>
            {/if}
            <li><a href="/api/checklists" class={cAnchorIndentedPl2}>Checklists</a></li>
            <li><a href="/api/counties" class={cAnchorIndentedPl2}>Counties</a></li>
            <!-- <li><a href="/api/countypanes" class={cAnchorIndentedPl2}>County Panes</a></li> -->
            <li><a href="/api/sites" class={cAnchorIndentedPl2}>Sites</a></li>
            <li><a href="/api/nameaddresses" class={cAnchorIndentedPl2}>Name-Address</a></li>
        {/if}
        <li><a href="/api/ohio" class={cAnchorIndentedPl2}>Ohio</a></li>
        <li><a href="/api/taxonomy" class={cAnchorIndentedPl2}>Butterflies of North America</a></li>
        <li>
            Gallery
            <ul class="nav-list pl-2">
                <li><a href="/api/gallery/butterflies" class={cAnchorIndentedPl4}>Butterflies</a></li>
                <li><a href="/api/gallery/moths" class={cAnchorIndentedPl4}>Moths</a></li>
                <li><a href="/api/gallery/other" class={cAnchorIndentedPl4}>Other</a></li>
                {#if $page.data.user}
                    <li><a href="/api/gallery/user" class={cAnchorIndentedPl4}>User</a></li>
                {/if}
            </ul>
        </li>
        <li><a href="/api/newlayout" class={cAnchorIndentedPl2}>New Layout Tests</a></li>
    </ul>
</nav>
