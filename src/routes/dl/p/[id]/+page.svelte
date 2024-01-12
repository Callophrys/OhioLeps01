<script lang="ts">
    import { goto } from '$app/navigation';
    //import CCounty from '$lib/components/CCounty.svelte';
    //import CCounty from '$lib/components'; /* this works but annoying linter or something complains */
    //import type { County } from '@prisma/client' /* is this doing anything? */

    //export let data: { county: County; } // & { author?: { name: string } } }
    export let data;
    console.log(data);

    /*
import type { PageData } from './$types';
export let data: PageData;

  const county: County = data.county as County;
  //const { county } = data;
*/

    /*
  const deleteCounty = async () => {
    await (
      await fetch(`/api/county/${data.county.countyId}`, {
        method: 'DELETE',
      })
    ).json()
    goto('/')
  }

  const publishCounty = async () => {
    await (
      await fetch(`/api/publish/${data.county.countyId}`, {
        method: 'PUT',
      })
    ).json()
    goto('/')
  }
  */
</script>

<div class="page">
    <main>
        <h2>{data.county[0].state.name}</h2>
        <p>{data.county[0].name}</p>
        <span>{data.county[0].sites.length}</span>
        <div class="actions">
            <!--
        {#if !county.published}
        <button on:click={publishCounty}>Publish</button>
      {/if}
      -->
            <!--<button on:click={deleteCounty}>Delete</button>-->
            <button class="btn variant-filled">Blank</button>
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
