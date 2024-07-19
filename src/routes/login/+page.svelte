<script lang="ts">
    import type { ActionData } from './$types';
    import Container from '$lib/components/layouts/Container.svelte';
    import { enhance } from '$app/forms';
    import { focusTrap } from '@skeletonlabs/skeleton';

    export let form: ActionData;

    let isFocused: boolean = true;
</script>

{#snippet body()}
    <h1>Login</h1>

    <form action="?/login" method="POST" class="max-w-80 min-w-32 space-y-2" use:enhance use:focusTrap={isFocused}>
        <div>
            <label for="username">Username</label>
            <input id="username" name="username" class="input pl-4" type="text" placeholder="Username" required />
        </div>

        <div>
            <label for="password">Password</label>
            <input id="password" name="password" class="input pl-4" type="password" placeholder="Password" required />
        </div>

        {#if form?.invalid}
            <p class="error">Username and password is required.</p>
        {/if}

        {#if form?.credentials}
            <p class="error">Login unsuccessful.</p>
        {/if}

        <button type="submit" class="btn variant-filled">Log in</button>
    </form>

    <div class="pt-16 max-w-80">
        No account?
        <a href="/register" class="btn variant-filled">Register</a>
        <p>This is here for development purposes and will be removed in prod. Authentication will preferably happen via single sign on shared authentication via Ohio Leps-wordpress account.</p>
    </div>
{/snippet}

<Container head={null} {body} bodyClasses={''} tail={null} />
