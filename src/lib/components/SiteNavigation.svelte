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
    let classesNavBar = $derived(`${cNavBar} ${navBar}`);

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

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
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
        <ul>
            Interactive - USA
            <ul class="nav-list pl-2">
                <li><a href="/api/north_america/usa/kentucky" class={cAnchorIndentedPl4}>Kentucky</a></li>
                <li><a href="/api/north_america/usa/ohio" class={cAnchorIndentedPl4}>Ohio</a></li>
                <li><a href="/api/north_america/usa/virginia" class={cAnchorIndentedPl4}>Virginia</a></li>
                <li><a href="/api/north_america/usa/west_virginia" class={cAnchorIndentedPl4}>West Virginia</a></li>
            </ul>
            Interactive - Other
            <ul class="nav-list pl-2">
                <li><a href="/api/north_america/mexico/aguascalientes" class={cAnchorIndentedPl4}>Aguascalientes</a></li>
                <li><a href="/api/north_america/mexico/baja_california" class={cAnchorIndentedPl4}>Baja California</a></li>
                <li><a href="/api/north_america/mexico/baja_california_sur" class={cAnchorIndentedPl4}>Baja California Sur</a></li>
                <li><a href="/api/north_america/mexico/campeche" class={cAnchorIndentedPl4}>Campeche</a></li>
                <li><a href="/api/north_america/mexico/chiapas" class={cAnchorIndentedPl4}>Chiapas</a></li>
                <li><a href="/api/north_america/mexico/chihuahua" class={cAnchorIndentedPl4}>Chihuahua</a></li>
                <li><a href="/api/north_america/mexico/ciudad_de_méxico" class={cAnchorIndentedPl4}>Ciudad de México</a></li>
                <li><a href="/api/north_america/mexico/coahuila" class={cAnchorIndentedPl4}>Coahuila</a></li>
                <li><a href="/api/north_america/mexico/colima" class={cAnchorIndentedPl4}>Colima</a></li>
                <li><a href="/api/north_america/mexico/durango" class={cAnchorIndentedPl4}>Durango</a></li>
                <li><a href="/api/north_america/mexico/guanajuato" class={cAnchorIndentedPl4}>Guanajuato</a></li>
                <li><a href="/api/north_america/mexico/guerrero" class={cAnchorIndentedPl4}>Guerrero</a></li>
                <li><a href="/api/north_america/mexico/hidalgo" class={cAnchorIndentedPl4}>Hidalgo</a></li>
                <li><a href="/api/north_america/mexico/jalisco" class={cAnchorIndentedPl4}>Jalisco</a></li>
                <li><a href="/api/north_america/mexico/michoacán" class={cAnchorIndentedPl4}>Michoacán</a></li>
                <li><a href="/api/north_america/mexico/morelos" class={cAnchorIndentedPl4}>Morelos</a></li>
                <li><a href="/api/north_america/mexico/méxico" class={cAnchorIndentedPl4}>México</a></li>
                <li><a href="/api/north_america/mexico/nayarit" class={cAnchorIndentedPl4}>Nayarit</a></li>
                <li><a href="/api/north_america/mexico/nuevo_león" class={cAnchorIndentedPl4}>Nuevo León</a></li>
                <li><a href="/api/north_america/mexico/oaxaca" class={cAnchorIndentedPl4}>Oaxaca</a></li>
                <li><a href="/api/north_america/mexico/puebla" class={cAnchorIndentedPl4}>Puebla</a></li>
                <li><a href="/api/north_america/mexico/querétaro" class={cAnchorIndentedPl4}>Querétaro</a></li>
                <li><a href="/api/north_america/mexico/quintana_roo" class={cAnchorIndentedPl4}>Quintana Roo</a></li>
                <li><a href="/api/north_america/mexico/san_luis_potosí" class={cAnchorIndentedPl4}>San Luis Potosí</a></li>
                <li><a href="/api/north_america/mexico/sinaloa" class={cAnchorIndentedPl4}>Sinaloa</a></li>
                <li><a href="/api/north_america/mexico/sonora" class={cAnchorIndentedPl4}>Sonora</a></li>
                <li><a href="/api/north_america/mexico/tabasco" class={cAnchorIndentedPl4}>Tabasco</a></li>
                <li><a href="/api/north_america/mexico/tamaulipas" class={cAnchorIndentedPl4}>Tamaulipas</a></li>
                <li><a href="/api/north_america/mexico/tlaxcala" class={cAnchorIndentedPl4}>Tlaxcala</a></li>
                <li><a href="/api/north_america/mexico/veracruz" class={cAnchorIndentedPl4}>Veracruz</a></li>
                <li><a href="/api/north_america/mexico/yacatán" class={cAnchorIndentedPl4}>Yacatán</a></li>
                <li><a href="/api/north_america/mexico/zacatecas" class={cAnchorIndentedPl4}>Zacatecas</a></li>
            </ul>
        </ul>
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
