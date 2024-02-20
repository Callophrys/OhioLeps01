<script lang="ts">
    import { page } from '$app/stores';
    import { type CssClasses } from '@skeletonlabs/skeleton';
    export let navBarClasses: CssClasses = '';
    $: navBarClasses = navBarClasses;
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<nav class={navBarClasses}>
    <ul>
        <li><a href="/" class="bg-primary-hover-token focus:variant-soft-primary outline-none block -ml-2 pl-2">Home</a></li>
        {#if $page.data.user}
            {#if $page.data.user.role === 'ADMIN'}
                <li><a href="/admin" class="bg-primary-hover-token focus:variant-soft-primary outline-none block -ml-2 pl-2">Admin</a></li>
            {/if}
            <li><a href="/api/checklists" class="bg-primary-hover-token focus:variant-soft-primary outline-none block -ml-2 pl-2">Checklists</a></li>
            <li><a href="/api/counties" class="bg-primary-hover-token focus:variant-soft-primary outline-none block -ml-2 pl-2">Counties</a></li>
            <li><a href="/api/countypanes" class="bg-primary-hover-token focus:variant-soft-primary outline-none block -ml-2 pl-2">County Panes</a></li>
            <li><a href="/api/sites" class="bg-primary-hover-token focus:variant-soft-primary outline-none block -ml-2 pl-2">Sites</a></li>
            <li><a href="/api/nameaddresses" class="bg-primary-hover-token focus:variant-soft-primary outline-none block -ml-2 pl-2">Name-Address</a></li>
        {/if}
        <li><a href="/api/ohio" class="bg-primary-hover-token focus:variant-soft-primary outline-none block -ml-2 pl-2">Ohio</a></li>
        <li><a href="/api/taxonomy" class="bg-primary-hover-token focus:variant-soft-primary outline-none block -ml-2 pl-2">Butterflies of North America</a></li>
        <li>
            Gallery
            <ul class="nav-list pl-2">
                <li><a href="/api/gallery/butterflies" class="bg-primary-hover-token focus:variant-soft-primary outline-none block -ml-4 pl-4"><span class="badge">Butterflies</span></a></li>
                <li><a href="/api/gallery/moths" class="bg-primary-hover-token focus:variant-soft-primary outline-none block -ml-4 pl-4"><span class="badge">Moths</span></a></li>
                <li><a href="/api/gallery/other" class="bg-primary-hover-token focus:variant-soft-primary outline-none block -ml-4 pl-4"><span class="badge">Other</span></a></li>
                {#if $page.data.user}
                    <li><a href="/api/gallery/user" class="bg-primary-hover-token focus:variant-soft-primary outline-none block -ml-4 pl-4"><span class="badge">User</span></a></li>
                {/if}
            </ul>
        </li>
    </ul>
</nav>
