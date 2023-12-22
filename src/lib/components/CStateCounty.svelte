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

<div class="stateCounty">
  <h2>{stateCounty.state}</h2>
  <p>{@html stateCounty.county}</p>
  <button on:click={() => goto(`/p/${stateCounty.stateCountyKey}`)}>
    Try this
  </button>
</div>

<style>
  div {
    color: inherit;
    padding: 2rem;
  }
  .stateCounty {
    background: white;
    transition: box-shadow 0.1s ease-in;
  }

  .stateCounty:hover {
    box-shadow: 1px 1px 3px #aaa;
    cursor: pointer;
  }

  .stateCounty,
  .stateCounty {
    margin-top: 2rem;
  }
</style>