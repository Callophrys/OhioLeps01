<script lang="ts">
    import { goto } from '$app/navigation';
    export let county: any;
</script>

<div class="p-2 rounded bg-slate-400 size-28">
    <h2>{county.state.name}</h2>
    <p>{county.name}</p>
    <button type="button" class="btn" on:click={() => goto(`/api/sites/${county.id}`)}>
        See {county.sites.length !== 1 ? 'sites' : 'site'}
    </button>
</div>
