<script lang="ts">
import { goto } from '$app/navigation'
//import CStateCounty from '$lib/components/CStateCounty.svelte';
//import CStateCounty from '$lib/components'; /* this works but annoying linter or something complains */
//import type { StateCounty } from '@prisma/client' /* is this doing anything? */

//export let data: { stateCounty: StateCounty; } // & { author?: { name: string } } }
export let data;
console.log(data);

/*
import type { PageData } from './$types';
export let data: PageData;

  const stateCounty: StateCounty = data.stateCounty as StateCounty;
  //const { stateCounty } = data;
*/

  const deleteStateCounty = async () => {
    await (
      await fetch(`/api/stateCounty/${data.stateCounty.stateCountyId}`, {
        method: 'DELETE',
      })
    ).json()
    goto('/')
  }

  const publishStateCounty = async () => {
    await (
      await fetch(`/api/publish/${data.stateCounty.stateCountyId}`, {
        method: 'PUT',
      })
    ).json()
    goto('/')
  }
</script>

<div class="page">
  <main>
    <h2>{data.stateCounty[0].state}</h2>
    <p>{data.stateCounty[0].county}</p>
    <span>{data.stateCounty[0].sites.length}</span>
    <div class="actions">
      <!--
        {#if !stateCounty.published}
        <button on:click={publishStateCounty}>Publish</button>
      {/if}
      -->
      <button on:click={deleteStateCounty}>Delete</button>
    </div>
  </main>
</div>

<style>
  .page {
    background: olive;
    padding: 2rem;
  }

  .actions {
    margin-top: 2rem;
  }

  button {
    background: #ececec;
    border: 0;
    border-radius: 0.125rem;
    padding: 1rem 2rem;
  }

  /*
  button + button {
    margin-left: 1rem;
  }
  */
</style>