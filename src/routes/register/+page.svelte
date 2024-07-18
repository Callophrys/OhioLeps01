<script lang="ts">
    import type { ActionData } from './$types';
    import Container from '$lib/components/layouts/Container.svelte';
    import { enhance } from '$app/forms';

    let { form }: { form: ActionData } = $props();
</script>

{#snippet body()}
    <h1>Register</h1>

    <form action="?/register" method="POST" class="max-w-80 min-w-32 space-y-2" use:enhance>
        <div>
            <label for="username">Username</label>
            <input id="username" name="username" class="input pl-4" type="text" placeholder="Username" required />
        </div>

        <div>
            <label for="firstName">First Name</label>
            <input id="firstName" name="firstName" class="input pl-4" type="text" placeholder="First Name" required />
        </div>

        <div>
            <label for="lastName">Last Name</label>
            <input id="lastName" name="lastName" class="input pl-4" type="text" placeholder="Last Name" required />
        </div>

        <div>
            <label for="password">Password</label>
            <input id="password" name="password" class="input pl-4" type="password" placeholder="Password" required />
        </div>

        {#if form?.user}
            <p class="error">Username is taken.</p>
        {/if}

        <button type="submit" class="btn variant-filled">Register</button>
    </form>
{/snippet}

<Container head={null} {body} bodyClasses={null} tail={null} />
