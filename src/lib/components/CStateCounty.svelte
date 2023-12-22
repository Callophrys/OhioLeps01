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
  <p>{@html stateCounty.county}</p>
  <button type="button" class="btn" on:click={() => goto(`/p/${stateCounty.stateCountyKey}`)}> See Sites </button>
</div>

<style>

.button-base-styles {

		/* Size (match base) */
		@apply text-base;
		/* Padding */
		@apply px-5 py-[9px];
		/* Core */
		@apply text-center whitespace-nowrap;
		/* Flex Columns */
		@apply inline-flex justify-center items-center space-x-2;
		/* States */
		@apply hover:brightness-[1.15];
		/* Transitions */
		@apply transition-all;
	}

.btn {
    background-color: cadetblue;
    @apply button-base-styles rounded active:scale-[95%] active:brightness-90;
}

/*
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

  .stateCounty {
    margin-top: 2rem;
  }
*/
</style>