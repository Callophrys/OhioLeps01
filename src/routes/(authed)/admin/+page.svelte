<script lang="ts">
    import AppConfigControl from '$lib/components/AppConfigControl.svelte';
    import Container from '$lib/components/layouts/Container.svelte';
    import Papa from 'papaparse';
    import { page } from '$app/stores';
    import { setContext } from 'svelte';

    let { data } = $props();
    setContext('appConfigs', data.appConfigs);

    async function fetchSiteData(siteId: number) {
        let sdpath = `/admin/${siteId}`;
        try {
            const response = await fetch(`${sdpath}`);
            const data = await response.json();
            return data.siteData;
        } catch (error) {
            console.error('Error fetching data:', error, 'from sdpath', sdpath);
        }
    }

    // https://www.basedash.com/blog/how-to-use-papaparse-with-typescript
    // https://www.papaparse.com/docs#json-to-csv
    async function exportToCSV() {
        try {
            // TODO: replace test json with return set from Prisma
            // TODO: figure out the upload-reverse
            //       Note upload will require a lot of data verification and cleaning code
            //
            const siteData = await fetchSiteData(35);
            // console.log(siteData);
            // debugger;
            // const jsonD = JSON.stringify(data);

            // const csv = Papa.unparse(JSON.parse(jsonD), {
            const csv = Papa.unparse(siteData, {
                quotes: false,
                quoteChar: '"',
                escapeChar: '"',
                delimiter: ',',
                header: true,
                newline: '\r\n',
                skipEmptyLines: false,
            });

            let csvData: string = '';
            csvData = csv;

            const csvContent = `data:text/csv;charset=utf-8,${csvData}`;

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', 'export.csv');
            document.body.appendChild(link); // Required for Firefox
            link.click();
        } catch (error) {
            console.error('Error exporting to CSV:', error);
        }
    }

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
    <button type="button" class="btn variant-soft" onclick={exportToCSV}>Export to CSV</button>
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
    {#each data.users as user}
        <div class="flex flex-row">
            <div class="w-36">{user.username}</div>
            <div class="w-24">{user.disabled ? 'Disabled' : 'Active'}</div>
            <div class="w-36">{user.firstName}</div>
            <div class="w-36">{user.lastName}</div>
            <div>{user.role.name}</div>
        </div>
    {/each}
{/snippet}

<Container {head} {body} bodyClasses="overflow-y-auto" {tail} />
