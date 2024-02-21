<script lang="ts">
    import { page } from '$app/stores';
    import { type CssClasses } from '@skeletonlabs/skeleton';
    export let navBarClasses: CssClasses = '';
    $: navBarClasses = navBarClasses;
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<nav class={navBarClasses}>
    <ul>
        <li><a href="/" class="hover:variant-filled-surface focus:variant-soft-primary rounded-l-full outline-none block -ml-2 pl-2">Home</a></li>
        {#if $page.data.user}
            {#if $page.data.user.role === 'ADMIN' || $page.data.user.role === 'ADMIN'}
                <li><a href="/admin" class="hover:variant-filled-surface focus:variant-soft-primary rounded-l-full outline-none block -ml-2 pl-2">Admin</a></li>
            {/if}
            <li><a href="/api/checklists" class="hover:variant-filled-surface focus:variant-soft-primary rounded-l-full outline-none block -ml-2 pl-2">Checklists</a></li>
            <li><a href="/api/counties" class="hover:variant-filled-surface focus:variant-soft-primary rounded-l-full outline-none block -ml-2 pl-2">Counties</a></li>
            <li><a href="/api/countypanes" class="hover:variant-filled-surface focus:variant-soft-primary rounded-l-full outline-none block -ml-2 pl-2">County Panes</a></li>
            <li><a href="/api/sites" class="hover:variant-filled-surface focus:variant-soft-primary rounded-l-full outline-none block -ml-2 pl-2">Sites</a></li>
            <li><a href="/api/nameaddresses" class="hover:variant-filled-surface focus:variant-soft-primary rounded-l-full outline-none block -ml-2 pl-2">Name-Address</a></li>
        {/if}
        <li><a href="/api/ohio" class="hover:variant-filled-surface focus:variant-soft-primary rounded-l-full outline-none block -ml-2 pl-2">Ohio</a></li>
        <li><a href="/api/taxonomy" class="hover:variant-filled-surface focus:variant-soft-primary rounded-l-full outline-none block -ml-2 pl-2">Butterflies of North America</a></li>
        <li>
            Gallery
            <ul class="nav-list pl-2">
                <li><a href="/api/gallery/butterflies" class="hover:variant-filled-surface focus:variant-soft-primary rounded-l-full outline-none block -ml-4 pl-4"><span class="badge">Butterflies</span></a></li>
                <li><a href="/api/gallery/moths" class="hover:variant-filled-surface focus:variant-soft-primary rounded-l-full outline-none block -ml-4 pl-4"><span class="badge">Moths</span></a></li>
                <li><a href="/api/gallery/other" class="hover:variant-filled-surface focus:variant-soft-primary rounded-l-full outline-none block -ml-4 pl-4"><span class="badge">Other</span></a></li>
                {#if $page.data.user}
                    <li><a href="/api/gallery/user" class="hover:variant-filled-surface focus:variant-soft-primary rounded-l-full outline-none block -ml-4 pl-4"><span class="badge">User</span></a></li>
                {/if}
            </ul>
        </li>
    </ul>
</nav>
