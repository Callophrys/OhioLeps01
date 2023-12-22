<script lang="ts">
  import CStateCounty from '$lib/components/CStateCounty.svelte'
  import type { PageData } from './$types'

  // data returned from +page.server.js
  export let data: PageData
</script>

<div>
  <h1>My Blog</h1>
  <main>
    <div>
      {#each data.stateCounties as stateCounty (stateCounty.stateCountyKey)}
        <CStateCounty {stateCounty} />
      {/each}
    </div>
  </main>
</div>