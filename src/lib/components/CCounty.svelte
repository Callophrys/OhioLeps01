<script lang="ts">
    import { goto } from '$app/navigation';
    export let county: any;
    console.log(county);
</script>

<div class="p-2 rounded bg-slate-400 size-28">
    <label for={`ctyId${county.id}`} class="hover:cursor-pointer">
        <h2>{county.state.name}</h2>
        <p>{county.name}</p>
        <input id={`ctyId${county.id}`} type="button" class="btn" on:click={() => (county.sites.length === 1 ? goto(`/api/sites/${county.sites[0].siteId}`) : goto(`/api/countysites/${county.id}`))} value={`See ${county.sites.length !== 1 ? 'sites' : 'site'}`} />
    </label>
</div>
