<script lang="ts">
    import { page } from '$app/stores';
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import AppConfigControl from '$lib/components/AppConfigControl.svelte';
    import { setContext } from 'svelte';

    export let data;
    setContext('appConfigs', data.appConfigs);

    //$: console.log(data.appConfigs);
    //$: configEntries = new Map(Object.entries(config));
    //$: console.log(configEntries);
    /*
    const candidates: any = {};
    for (const p of data.appConfigs)
        candidates[p.configName] = { 'configValue': p.configValue, 'changed': false }

    $: console.log(candidates);
    */

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
                <AppConfigControl />
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
