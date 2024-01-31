<script lang="ts">
    import { page } from '$app/stores';
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import * as config from '$lib/config';
    import { camelToFriendly } from '$lib/utils';
    $: configEntries = new Map(Object.entries(config));
    $: console.log(configEntries);

    function getControl(key: string, value: any) {
        console.log(key, value);
        if (typeof value === 'string') {
            if (key.toLocaleLowerCase() === 'description') {
                return `<textarea id=${key} name=${key} rows="3" cols="50" class="resize p-1 rounded-md variant-filled">${value}</textarea>`;
            } else {
                return `<input id=${key} name=${key} type="text" class="p-1 rounded-md variant-filled" value=${value} />`;
            }
        }

        if (typeof value === 'number') {
            return `<input id=${key} name=${key} type="number" class="p-1 rounded-md variant-filled" value=${value} />`;
        }

        if (typeof value === 'boolean') {
            return `<input id=${key} name=${key} type="checkbox" class="p-1 rounded-md variant-filled" checked=${value} />`;
        }

        if (typeof value === 'object') {
            return `<pre class="hover:cursor-not-allowed">${JSON.stringify(value)}</pre>`;
        }

        return undefined;
    }
</script>

<StandardContainer>
    <svelte:fragment slot="standardHead">
        <div class="flex flex-row justify-between pb-2">
            <div class="capitalize">Welcome, {$page.data.user?.name}.</div>
            <div class="pl-8">Panes for editing, user management, and system configuration.</div>
        </div>
        <hr />
    </svelte:fragment>
    <svelte:fragment slot="standardBody">
        <form>
            <div class="flex flex-col space-y-2">
                {#each configEntries as [key, value]}
                    <div class="flex space-x-2">
                        <div class="w-56">{camelToFriendly(key)}</div>
                        <div class="w-20">({typeof value})</div>
                        <div class="w-fit">{@html getControl(key, value)}</div>
                    </div>
                {/each}
            </div>
        </form>
    </svelte:fragment>
    <svelte:fragment slot="standardTail">
        <div class="text-center">
            <button type="submit" class="btn variant-filled">Save</button>
        </div>
    </svelte:fragment>
</StandardContainer>
