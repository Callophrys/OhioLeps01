<script lang="ts">
    import { camelToFriendly, toBool } from '$lib/utils';
    import type { AppConfigFormKeyChecked } from '$lib/types';
    import { getContext } from 'svelte';
    import { afterUpdate } from 'svelte';

    let appConfigs: AppConfigFormKeyChecked[] = getContext('appConfigs');
    //console.log(appConfigs);
    /*
     *
     * https://svelte.dev/repl/253ddd578806497b8b54c339490f8221?version=3.21.0
     *
     * */
    type candidate = {
        configValue: string;
        changed: boolean;
        class: string;
        checked: boolean;
    };

    const candidates: any = {};
    for (const p of appConfigs)
        candidates[p.formKey] = {
            configValue: p.configValue,
            changed: false,
            class: '',
            checked: p.checked,
        } as candidate;
    //console.log('c', candidates);

    afterUpdate(() => {
        appConfigs.forEach((c) => {
            if (c.configType === 'boolean') {
                let formValue = toBool(c.configValue);
                let origValue = toBool(candidates[c.formKey].configValue);

                if (c.formKey === '46_modeDebug') {
                    console.log('>>', { config: c, candidate: candidates[c.formKey] });
                    console.log('<<', formValue, origValue);
                }
                /*
                 */

                candidates[c.formKey].changed = formValue !== origValue;
                candidates[c.formKey].checked = formValue;
            } else {
                //if (c.formKey === '47_owner') console.log('>>', { 'config': c, 'candidate': candidates[c.formKey]});
                candidates[c.formKey].changed = c.configValue !== candidates[c.formKey].configValue;
            }
        });
    });
</script>

{#each appConfigs as appConfig}
    <label for={appConfig.formKey} class="flex space-x2">
        <div class="w-56">{camelToFriendly(appConfig.configName)}</div>
        <div class="w-20">({appConfig.configType})</div>
        <div class="w-fit flex flex-row">
            {#if appConfig.configType === 'string'}
                {#if appConfig.configName.toLocaleLowerCase() === 'description'}
                    <textarea id={appConfig.formKey} name={appConfig.formKey} rows="3" cols="50" class="resize p-1 rounded-md variant-filled {candidates[appConfig.formKey].class}" bind:value={appConfig.configValue} />
                {:else}
                    <input id={appConfig.formKey} name={appConfig.formKey} type="text" class="p-1 rounded-md variant-filled {candidates[appConfig.formKey].class}" bind:value={appConfig.configValue} />
                {/if}
            {:else if appConfig.configType === 'number'}
                <input id={appConfig.formKey} name={appConfig.formKey} type="number" class="p-1 rounded-md variant-filled {candidates[appConfig.formKey].class}" bind:value={appConfig.configValue} />
            {:else if appConfig.configType === 'boolean'}
                <div>hi</div>
            {:else if appConfig.configType === 'object'}
                <pre class="hover:cursor-not-allowed">{appConfig.configValue}</pre>
            {/if}

            {#if candidates[appConfig.formKey]?.changed}
                <div class="text-amber-300 pl-2 text-sm">Modified <span class="text-lg">↺</span></div>
            {/if}
        </div>
    </label>
{/each}

<!--
                <input id={appConfig.formKey} name={appConfig.formKey} type="checkbox" class="checkbox p-1 rounded-md variant-filled" bind:checked={appConfig.configValue} />
-->
