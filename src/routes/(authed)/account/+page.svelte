<script lang="ts">
    import Container from '$lib/components/layouts/Container.svelte';
</script>

{#snippet body()}
    <div class="">
        <h1>Account</h1>

        <div class="p-4">
            <div>account details</div>
            <div class="pl-4 pt-4">
                <ul>
                    <li>Mortimer Snerd</li>
                    <li>mort@bergenville.com</li>
                    <li>member since: Jan. 1, 2024</li>
                    <li>status: active</li>
                </ul>
            </div>
        </div>
        <div class="p-4">
            <div>change password</div>
            <button type="button" class="btn variant-filled">Update password</button>
        </div>
        <div class="p-4">
            <div>avatar</div>
            <button type="button" class="btn variant-filled">Update avatar</button>
        </div>
    </div>
{/snippet}

<Container head={null} {body} tail={null} />
