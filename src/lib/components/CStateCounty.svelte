<script lang="ts">
  import { goto } from '$app/navigation'
  import type { StateCounty } from '@prisma/client'

  export let stateCounty: StateCounty;
  /*
   & {
    county?: {
      name: string
    }
  }
  */
</script>

<div class="p-2 mt-2 rounded bg-slate-400 w-fit">
<h2>{stateCounty.state}</h2>
  <p>{stateCounty.county}</p>
  <button type="button" class="btn" on:click={() => goto(`/p/${stateCounty.stateCountyId}`)}> See Sites </button>
</div>
