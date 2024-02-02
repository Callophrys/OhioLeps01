<script lang="ts">
    import { camelToFriendly } from "$lib/utils";
    import type { AppConfigChecked } from "$lib/types";
    import { getContext } from 'svelte';
    
    let appConfigs: AppConfigChecked[] = getContext('appConfigs');
    //console.log(appConfigs);
    /*
    *
    * https://svelte.dev/repl/253ddd578806497b8b54c339490f8221?version=3.21.0
    *
    * */
</script>

{#each appConfigs as appConfig}
    <label for={appConfig.id + '_' + appConfig.configName} class="flex space-x2">
    <div class="w-56">{camelToFriendly(appConfig.configName)}</div>
    <div class="w-20">({appConfig.configType})</div>
    <div class="w-fit">

{#if (appConfig.configType === 'string') }
    {#if (appConfig.configName.toLocaleLowerCase() === 'description')}
        <textarea
            id={appConfig.id + '_' + appConfig.configName}
            name={appConfig.id + '_' + appConfig.configName}
            rows="3" cols="50"
            class="resize p-1 rounded-md variant-filled">{appConfig.configValue}</textarea>
    {:else}
        <input
            id={appConfig.id + '_' + appConfig.configName}
            name={appConfig.id + '_' + appConfig.configName}
            type="text"
            class="p-1 rounded-md variant-filled"
            bind:value={appConfig.configName} />
    {/if}

{:else if (appConfig.configType === 'number')}
    <input
        id={appConfig.id + '_' + appConfig.configName}
        name={appConfig.id + '_' + appConfig.configName}
        type="number"
        class="p-1 rounded-md variant-filled"
        value={appConfig.configValue} />

{:else if (appConfig.configType === 'boolean')}
    <input
        id={appConfig.id + '_' + appConfig.configName}
        name={appConfig.id + '_' + appConfig.configName}
        type="checkbox"
        class="p-1 rounded-md variant-filled"
        bind:checked={appConfig.checked} />

{:else if (appConfig.configType === 'object')}
    <pre class="hover:cursor-not-allowed">{appConfig.configValue}</pre>
{/if}

    </div>
    </label>
{/each}