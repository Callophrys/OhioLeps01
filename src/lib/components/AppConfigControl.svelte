<script lang="ts">
    /* TODO (1) Make this work (2) Rethink how Svelt5 reactivity works here */

    /*-- Imports */
    import type { AppConfigFormKeyChecked } from '$lib/types';
    import { camelToFriendly, toBool } from '$lib/utils';
    import { getContext } from 'svelte';

    /*-- -- Data -- */
    /*-- Exports */
    /*-- Context */
    let appConfigs: AppConfigFormKeyChecked[] = getContext('appConfigs');
    //console.log(appConfigs);

    /*-- -- Styling -- */
    /*-- Properties (styles) */
    /*-- Constants (styles) */
    /*-- Reactives (styles) */
    /*-- -- Coding -- */
    /*-- Enums */
    type Candidate = {
        configValue: string;
        changed: boolean;
        class: string;
        checked: boolean;
    };

    /*-- Constants (functional) */
    const candidates: any = $state({});

    /*-- Properties (functional) */
    /*-- Variables and objects */
    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */

    for (const p of appConfigs) {
        const c = {
            configValue: p.configValue,
            changed: false,
            class: '',
            checked: p.checked,
        } as Candidate;
        candidates[p.formKey] = c;
    }
    //console.log('c', candidates);

    $effect(() => {
        appConfigs.forEach((c) => {
            if (c.configType === 'boolean') {
                let formValue = toBool(c.configValue);
                let origValue = toBool(candidates[c.formKey].configValue);

                if (c.formKey === '46_modeDebug') {
                    console.log('>>', { config: c, candidate: candidates[c.formKey] });
                    console.log('<<', formValue, origValue);
                }

                candidates[c.formKey].changed = formValue !== origValue;
                candidates[c.formKey].checked = formValue;
            } else {
                //if (c.formKey === '47_owner') console.log('>>', { 'config': c, 'candidate': candidates[c.formKey]});
                candidates[c.formKey].changed = c.configValue !== candidates[c.formKey].configValue;
            }
        });
        //console.log('d', candidates);
    });

    /*-- Handlers */
    /*-- Methods */
    /*-- Reactives (functional) */
    /*-- Other */

    /*
     *
     * https://svelte.dev/repl/253ddd578806497b8b54c339490f8221?version=3.21.0
     *
     * */
</script>

{#each appConfigs as appConfig}
    <label for={appConfig.formKey} class="flex space-x2">
        <div class="w-56">{camelToFriendly(appConfig.configName)}</div>
        <div class="w-20">({appConfig.configType})</div>
        <div class="w-fit flex flex-row">
            {#if appConfig.configType === 'string'}
                {#if appConfig.configName.toLocaleLowerCase() === 'description'}
                    <textarea id={appConfig.formKey} name={appConfig.formKey} rows="3" cols="50" class="resize p-1 rounded-md variant-filled" bind:value={appConfig.configValue}></textarea>
                {:else}
                    <input id={appConfig.formKey} name={appConfig.formKey} type="text" class="p-1 rounded-md variant-filled" bind:value={appConfig.configValue} />
                {/if}
            {:else if appConfig.configType === 'number'}
                <input id={appConfig.formKey} name={appConfig.formKey} type="number" class="p-1 rounded-md variant-filled" bind:value={appConfig.configValue} />
            {:else if appConfig.configType === 'boolean'}
                <input id={appConfig.formKey} name={appConfig.formKey} type="checkbox" bind:checked={appConfig.checked} />
            {:else if appConfig.configType === 'object'}
                <pre class="hover:cursor-not-allowed">{appConfig.configValue}</pre>
            {/if}

            {#if candidates[appConfig.formKey]?.changed}
                <div class="dark:text-amber-300 text-amber-700 pl-2 text-sm">Modified <span class="text-lg">↺</span></div>
            {/if}
        </div>
    </label>
{/each}
