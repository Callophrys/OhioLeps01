<script lang="ts">
	import StandardContainer from '$lib/components/StandardContainer.svelte';
  import CStateCounty from '$lib/components/CStateCounty.svelte'
  import type { PageData } from '../../$types'

  // data returned from +page.server.js
  export let data: PageData
</script>

<StandardContainer>
    <h1>The root page</h1>
    <main>
      <div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-4"
        style="background-color: coral">
        {#each data.stateCounties as stateCounty}
        {#if stateCounty.sites.length > 0}
          <CStateCounty {stateCounty} />
          {/if}
        {/each}
      </div>
    </main>
</StandardContainer>