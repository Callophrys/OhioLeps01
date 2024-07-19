<script lang="ts">
    import Container from '$lib/components/layouts/Container.svelte';
    import { page } from '$app/stores';
    import { formatDate } from '$lib/utils';

    console.log($page.data?.user);
</script>

{#snippet body()}
    <div class="">
        <h1>Account</h1>

        <div class="p-4">
            <div>Details</div>
            <div class="pl-4 pt-2">
                <div class="flex flex-row gap-4">
                    <div class="w-32 text-right">User login:</div>
                    <div class="">{$page.data?.user.name}</div>
                </div>
                <div class="flex flex-row gap-4">
                    <div class="w-32 text-right">User name:</div>
                    <div class="">{$page.data?.user.lastFirst}</div>
                </div>
                <div class="flex flex-row gap-4">
                    <div class="w-32 text-right">Member since:</div>
                    <div class="">{formatDate(new Date($page.data?.user.createdAt).toISOString())}</div>
                </div>
                <div class="flex flex-row gap-4">
                    <div class="w-32 text-right">Status:</div>
                    <div class="">{$page.data?.user.disabled ? 'disabled' : 'enabled'}</div>
                </div>
            </div>
        </div>
        <div class="p-4">
            <div>Security</div>
            <div class="pl-4 pt-2">
                <div class="flex flex-row gap-4">
                    <div class="w-32 text-right">Role(s):</div>
                    <div class="">{$page.data?.user.role}</div>
                </div>
                <div class="flex flex-row gap-4">
                    <div class="w-32 text-right my-auto">Change Password:</div>
                    <button type="button" class="btn w-48 variant-filled">Update password</button>
                </div>
            </div>
        </div>
        <div class="p-4">
            <div>Options</div>
            <div class="pl-4 pt-2">
                <div class="flex flex-row gap-4">
                    <div class="w-32 text-right my-auto">Avatar</div>
                    <button type="button" class="btn w-48 variant-filled">Update avatar</button>
                </div>
            </div>
        </div>
    </div>
{/snippet}

<Container head={null} {body} bodyClasses={''} tail={null} />
