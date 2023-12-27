<script lang="ts">
  import CStateCounty from '$lib/components/CStateCounty.svelte'
  import type { PageData } from './$types'

  // data returned from +page.server.js
  export let data: PageData
      //{#each data.stateCounties as stateCounty (stateCounty.stateCountyId)}
</script>

<div>
  <h1>My Blog</h1>
  <main>
    <div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-4"
      style="background-color: coral">
      {#each data.stateCounties as stateCounty}
        <CStateCounty {stateCounty} />
      {/each}
    </div>
  </main>
</div>