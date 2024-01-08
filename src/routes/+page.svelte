<script lang="ts">
    import { page } from '$app/stores'
</script>
<div class="container h-full mx-auto p-8">
    <div class="card h-full p-8 space-x-2 space-y-2">
        <a href="/query" class="btn variant-filled"> Search Database </a>
        {#if ($page.data.user)}
        <a href="/entry" class="btn variant-filled"> Enter/Update Database </a>
        <a href="/admin" class="btn variant-filled"> Administrate Database </a>
        <a href="/[auth]/account" class="btn variant-filled"> User Account</a>
        {/if}
    </div>
</div>

