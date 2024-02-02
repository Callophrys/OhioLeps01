<script lang="ts">
    import { camelToFriendly } from "$lib/utils";
    import type { AppConfigFormKeyChecked } from "$lib/types";
    import { getContext } from 'svelte';
    
    let appConfigs: AppConfigFormKeyChecked[] = getContext('appConfigs');
    //console.log(appConfigs);
    /*
    *
    * https://svelte.dev/repl/253ddd578806497b8b54c339490f8221?version=3.21.0
    *
    * */
    const candidates: any = {};
    for (const p of appConfigs)
        candidates[p.formKey] = {
            'configValue': p.configValue,
            'changed': false,
            'class':'',
            'checked': p.checked
        }

    $: console.log(candidates);
    
    $: {
        appConfigs.forEach(c => {
            if (c.configType === 'checkbox') {
                candidates[c.formKey].class =
                    c.checked !== candidates[c.formKey].checked ?
                    '!bg-orange-300' : '';
            } else {
                candidates[c.formKey].class =
                    c.configValue !== candidates[c.formKey].configValue ?
                    '!bg-orange-300' : '';
            }
        })
    }
</script>

{#each appConfigs as appConfig}
<label for={appConfig.formKey} class="flex space-x2">
    <div class="w-56">{camelToFriendly(appConfig.configName)}</div>
    <div class="w-20">({appConfig.configType})</div>
    <div class="w-fit">

    {#if (appConfig.configType === 'string') }
        {#if (appConfig.configName.toLocaleLowerCase() === 'description')}
            <textarea
                id={appConfig.formKey}
                name={appConfig.formKey}
                rows="3" cols="50"
                class="resize p-1 rounded-md variant-filled {candidates[appConfig.formKey].class}"
                bind:value={appConfig.configValue} />
        {:else}
            <input
                id={appConfig.formKey}
                name={appConfig.formKey}
                type="text"
                class="p-1 rounded-md variant-filled {candidates[appConfig.formKey].class}"
                bind:value={appConfig.configValue} />
        {/if}

    {:else if (appConfig.configType === 'number')}
        <input
            id={appConfig.formKey}
            name={appConfig.formKey}
            type="number"
            class="p-1 rounded-md variant-filled {candidates[appConfig.formKey].class}"
            value={appConfig.configValue} />

    {:else if (appConfig.configType === 'boolean')}
        <input
            id={appConfig.formKey}
            name={appConfig.formKey}
            type="checkbox"
            class="p-1 rounded-md variant-filled {candidates[appConfig.formKey].class}"
            bind:checked={appConfig.checked} />

    {:else if (appConfig.configType === 'object')}
        <pre class="hover:cursor-not-allowed">{appConfig.configValue}</pre>
    {/if}

    </div>
</label>
{/each}