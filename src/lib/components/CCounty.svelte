<script lang="ts">
    import { goto } from '$app/navigation';
    import type { County } from '@prisma/client';

    export let county: County;
</script>

<div class="p-2 mt-2 rounded bg-slate-400 w-fit">
    <h2>{county.state.name}</h2>
    <p>{county.name}</p>
    <button type="button" class="btn" on:click={() => goto(`/p/${county.id}`)}> See Sites </button>
</div>
