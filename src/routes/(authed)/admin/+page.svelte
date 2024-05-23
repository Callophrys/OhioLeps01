<script lang="ts">
    import { page } from '$app/stores';
    import AppConfigControl from '$lib/components/AppConfigControl.svelte';
    import Container from '$lib/components/layouts/Container.svelte';
    import { setContext } from 'svelte';

    let { data } = $props();
    setContext('appConfigs', data.appConfigs);

    //$: console.log(data.appConfigs);
    //$: configEntries = new Map(Object.entries(config));
    //$: console.log(configEntries);
    /*
    const candidates: any = {};
    for (const p of data.appConfigs)
        candidates[p.configName] = { 'configValue': p.configValue, 'changed': false, 'class': '' }

    $: console.log(candidates);
    */
</script>

{#snippet head()}
    <div class="flex flex-row justify-between pb-2">
        <div class="capitalize">Welcome, {$page.data.user?.name}.</div>
        <div class="pl-8">Panes for editing, user management, and system configuration.</div>
    </div>
    <hr />
{/snippet}

{#snippet body()}
    <form method="POST" action="?/updateAppConfigs" id="appConfigs" name="appConfigs">
        <div class="flex flex-col space-y-2">
            <AppConfigControl />
        </div>
    </form>
{/snippet}

{#snippet tail()}
    <div class="text-center flex">
        <div class="flex flex-cols justify-between space-x-4 max-w-2xl mx-auto">
            <button type="submit" form="appConfigs" class="btn w-32 variant-filled" formaction="?/updateAppConfigs">Save</button>
            <button type="submit" form="appConfigs" class="btn w-32 variant-filled" formaction="?/resetAppConfigs">Reset All</button>
        </div>
    </div>
{/snippet}

<Container {head} {body} {tail} />
