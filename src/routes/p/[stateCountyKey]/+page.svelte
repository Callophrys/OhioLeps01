<script lang="ts">
import { goto } from '$app/navigation'
import CStateCounty from '$lib/components/CStateCounty.svelte';
import type { StateCounty } from '@prisma/client'

export let data: { stateCounty: CStateCounty; } // & { author?: { name: string } } }

  const { stateCounty } = data

  const deleteStateCounty = async () => {
    await (
      await fetch(`/api/stateCounty/${stateCounty.stateCountyKey}`, {
        method: 'DELETE',
      })
    ).json()
    goto('/')
  }

  const publishStateCounty = async () => {
    await (
      await fetch(`/api/publish/${stateCounty.stateCountyKey}`, {
        method: 'PUT',
      })
    ).json()
    goto('/')
  }
</script>

<div class="page">
  <main>
    <h2>{stateCounty.state} &gt;</h2>
    <p>{stateCounty.county}</p>
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
    background: white;
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