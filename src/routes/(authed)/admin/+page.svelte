<script lang="ts">
    import { page } from '$app/stores';
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import * as config from '$lib/config';
    import { camelToFriendly } from '$lib/utils';
    import type { AppConfig } from '@prisma/client';

    export let data;
    //console.log(data.appConfigs);

    //$: configEntries = new Map(Object.entries(config));
    //$: console.log(configEntries);

    function getControl(config: AppConfig) {
        //console.log(config);
        if (config.configType === 'string') {
            if (config.configName.toLocaleLowerCase() === 'description') {
                return `<textarea id=${config.configName} name=${config.configName} rows="3" cols="50" class="resize p-1 rounded-md variant-filled">${config.configValue}</textarea>`;
            } else {
                return `<input id=${config.configName} name=${config.configName} type="text" class="p-1 rounded-md variant-filled" value=${config.configValue} />`;
            }
        }

        if (config.configType === 'number') {
            return `<input id=${config.configName} name=${config.configName} type="number" class="p-1 rounded-md variant-filled" value=${config.configValue} />`;
        }

        if (config.configType === 'boolean') {
            return `<input id=${config.configName} name=${config.configName} type="checkbox" class="p-1 rounded-md variant-filled" ${config.configValue === 'true' ? 'checked' : ''} />`;
        }

        if (config.configType === 'object') {
            return `<pre class="hover:cursor-not-allowed">${config.configValue}</pre>`;
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
        <form method="POST" action="?/updateAppConfigs" id="appConfigs" name="appConfigs">
            <div class="flex flex-col space-y-2">
                {#each data.appConfigs as config}
                    <div class="flex space-x-2">
                        <div class="w-56">{camelToFriendly(config.configName)}</div>
                        <div class="w-20">({config.configType})</div>
                        <div class="w-fit">{@html getControl(config)}</div>
                    </div>
                {/each}
            </div>
        </form>
    </svelte:fragment>
    <svelte:fragment slot="standardTail">
    <div class="text-center flex">
        <div class="flex flex-cols justify-between space-x-4 max-w-2xl mx-auto">
            <button type="submit" form="appConfigs" class="btn w-32 variant-filled">Save</button>
            <button type="submit" form="appConfigs" class="btn w-32 variant-filled">Reset All</button>
        </div>
    </div>
    </svelte:fragment>
</StandardContainer>
