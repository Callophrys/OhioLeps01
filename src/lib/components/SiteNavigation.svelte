<script lang="ts">
    import { page } from "$app/stores";
    import { type CssClasses } from "@skeletonlabs/skeleton";
    export let navBarClasses: CssClasses = "";
    $: navBarClasses = navBarClasses;
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<nav class={navBarClasses} on:mouseover on:mouseleave>
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
        {/if}
        <li><a href="/api/ohio">Ohio</a></li>
        <li><a href="/api/taxonomy">Butterflies of North America</a></li>
        <li>
            Gallery
            <ul class="nav-list">
                <li><a href="/api/gallery/butterflies"><span class="badge">Butterflies</span></a></li>
                <li><a href="/api/gallery/moths"><span class="badge">Moths</span></a></li>
                <li><a href="/api/gallery/other"><span class="badge">Other</span></a></li>
                {#if $page.data.user}
                    <li><a href="/api/gallery/user"><span class="badge">User</span></a></li>
                {/if}
            </ul>
        </li>
    </ul>
</nav>