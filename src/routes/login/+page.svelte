<!--
<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
</script>

<StandardContainer>

    <h1 class="w-60 pb-6 text-center">Login</h1>
    <form method="POST" class="w-60 kp-4 space-y-4 text-center">
        <input class="input variant-form-material" type="text" name="user" required />
        <input class="input variant-form-material" type="password" name="password" required />
        <button class="btn variant-filled w-36 justify-between">
          <span class="capitalize">Login</span>
          <span>↓</span>
        </button>
    </form>

</StandardContainer>
-->

<script lang="ts">
    import type { ActionData } from './$types';
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { enhance } from '$app/forms';

    export let form: ActionData;
</script>

<StandardContainer>
	<svelte:fragment slot="standard-content">
    <h1>Login</h1>

    <form action="?/login" method="POST" class="max-w-80 min-w-32 space-y-2" use:enhance>
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

        {#if form?.invalid}
            <p class="error">Username and password is required.</p>
        {/if}

        {#if form?.credentials}
            <p class="error">You have entered the wrong credentials.</p>
        {/if}

        <button type="submit" class="btn variant-filled">Log in</button>
    </form>

    <div class="pt-16 max-w-80">
        No account?
        <a href="/register" class="btn variant-filled">Register</a>
        <p>
            This is here for development purposes and will be removed in prod. Authentication will
            preferably happen via single sign on shared authentication via Ohio Leps-wordpress
            account.
        </p>
    </div>
    </svelte:fragment>
</StandardContainer>
