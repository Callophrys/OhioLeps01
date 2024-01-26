<script lang="ts">
    import type { ActionData } from './$types';
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { enhance } from '$app/forms';

    export let form: ActionData;
</script>

<StandardContainer>
	<svelte:fragment slot="standardBody">
    <h1>Register</h1>

    <form action="?/register" method="POST" class="max-w-80 min-w-32 space-y-2" use:enhance>
        <div>
            <label for="username">Username</label>
            <input
                id="username"
                name="username"
                class="input pl-4"
                type="text"
                placeholder="Username"
                required
            />
        </div>

        <div>
            <label for="password">Password</label>
            <input
                id="password"
                name="password"
                class="input pl-4"
                type="password"
                placeholder="Password"
                required
            />
        </div>

        {#if form?.user}
            <p class="error">Username is taken.</p>
        {/if}

        <button type="submit" class="btn variant-filled">Register</button>
    </form>
    </svelte:fragment>
</StandardContainer>
