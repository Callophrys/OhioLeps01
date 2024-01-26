<script lang="ts">
  import { page } from '$app/stores'
  import StandardContainer from '$lib/components/StandardContainer.svelte';
</script>

<StandardContainer>
	<svelte:fragment slot="standardBody">
  <h1>Admin</h1>

  {#if $page.data.user}
    <p>Welcome {$page.data.user.name}!</p>
  {/if}

    <form action="/logout" method="POST">
      <button type="submit" class="btn variant-filled">Log out</button>
    </form>

  {#if $page.data.user.role === 'ADMIN'}
  <p>Panes for editing, user management, and system configuration can go here.</p>
  {/if}

</svelte:fragment>
</StandardContainer>