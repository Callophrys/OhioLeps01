<script lang="ts">
    import SiteList from "$lib/components/admin/SiteList.svelte";
    import SiteUsers from "$lib/components/admin/SiteUsers.svelte";
    import UserManagementModal from "$lib/modals/admin/UserManagementModal.svelte";
    import { SiteContextKey } from "$lib/context";

    import { ROLE } from "$lib/types.js";
    import type { AppConfigFormKeyChecked } from "$lib/types.js";
    import AppConfigControl from "$lib/components/AppConfigControl.svelte";
    import Container from "$lib/components/layouts/Container.svelte";
    import Papa from "papaparse";
    import { TabGroup, Tab } from "@skeletonlabs/skeleton";
    import { page } from "$app/stores";
    import { setContext } from "svelte";
    import { SlideToggle } from "@skeletonlabs/skeleton";

    let { data } = $props();
    // console.log(data);

    const myOrganizations = data.organziations;

    type User = { id: string; name: string };
    type Site = { id: number; name: string };

    let selectedSite: string | null = $state(null);
    let users: User[] = $state([]);

    async function loadUsers(siteId: string) {
        // const res = await fetch(`/api/organizations/${orgId}/users`);
        // users = await res.json();
        users = [];
    }

    async function fetchUsersOnChange() {
        if (selectedSite) await loadUsers(selectedSite);
    }

    $effect(async () => {
        await fetchUsersOnChange();

        setContext(SiteContextKey, {
            selectedSite,
            users,
            loadUsers,
        });
    });

    let isDebug: boolean =
        data.appConfigs.find(
            (x: AppConfigFormKeyChecked) => x.configName === "modeDebug",
        )?.configValue === "true";
    let config: any = $state({});

    $effect(() => {
        config = $page.data.config;
    });

    let tabSet: number = $state(0);

    async function fetchSiteData(siteId: number) {
        let sdpath = `/admin/${siteId}`;
        try {
            const response = await fetch(`${sdpath}`);
            const data = await response.json();
            return data.siteData;
        } catch (error) {
            console.error("Error fetching data:", error, "from sdpath", sdpath);
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
                delimiter: ",",
                header: true,
                newline: "\r\n",
                skipEmptyLines: false,
            });

            let csvData: string = "";
            csvData = csv;

            const csvContent = `data:text/csv;charset=utf-8,${csvData}`;

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "export.csv");
            document.body.appendChild(link); // Required for Firefox
            link.click();
        } catch (error) {
            console.error("Error exporting to CSV:", error);
        }
    }

    function handleSiteUsers(e: Event) {
        alert("ok");
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

{#snippet organizationMain()}
    <form
        method="POST"
        action="?/updateAppConfigs"
        id="appConfigs"
        name="appConfigs"
    >
        <div class="flex flex-col space-y-2">
            <AppConfigControl />
        </div>
    </form>
{/snippet}

{#snippet organizationTail()}
    <div class="text-center flex">
        <div class="flex flex-cols justify-between space-x-4 max-w-2xl mx-auto">
            <button
                type="submit"
                form="appConfigs"
                class="btn w-32 variant-filled"
                formaction="?/updateAppConfigs">Save</button
            >
            <button
                type="submit"
                form="appConfigs"
                class="btn w-32 variant-filled"
                formaction="?/resetAppConfigs">Reset All</button
            >
        </div>
    </div>
{/snippet}

{#snippet organizationList(organizations)}
    <div class="w-fit flex flex-row border-b-2 border-b-red-100">
        <div class="w-36">Name</div>
    </div>
    {#each organizations as organization}
        <div class="flex flex-row">
            <div class="w-36">{organization.name}</div>
        </div>
    {/each}
{/snippet}

{#snippet organizationBlock()}
    {@render organizationMain()}
    {@render organizationTail()}
{/snippet}

{#snippet userList()}
    <div class="w-fit flex flex-row border-b-2 border-b-red-100">
        <div class="w-36">Username</div>
        <div class="w-24">Status</div>
        <div class="w-36">First Name</div>
        <div class="w-36">Last Name</div>
        <div class="w-32">Role</div>
        <div class="w-80"></div>
    </div>
    {#each data.users as user}
        <div class="flex flex-row space-y-1">
            <div class="w-36">{user.username}</div>
            <div class="pr-4">
                <SlideToggle
                    name="slide"
                    size="sm"
                    disabled
                    checked={!user.disabled}
                />
            </div>
            <!-- <div class="w-24">{user.disabled ? 'Disabled' : 'Active'}</div> -->
            <div class="w-36">{user.firstName}</div>
            <div class="w-36">{user.lastName}</div>
            <div class="w-32">{user.role.name}</div>
            <div class="">
                <button class="btn variant-soft" disabled
                    >Expire Password</button
                >
                <button class="btn variant-soft" disabled>Reset Password</button
                >
            </div>
        </div>
    {/each}
{/snippet}

{#snippet siteMain()}
    <div class="w-fit flex flex-row border-b-2 border-b-red-100">
        <div class="w-80">Site Name</div>
        <div class="w-36">County</div>
        <div class="w-24">State</div>
        <div class="w-80"></div>
    </div>
    {#each data.sites as site}
        <div class="flex flex-row space-y-1">
            <div class="w-80">{site.siteName}</div>
            <div class="w-36">{site.county.name}</div>
            <div class="w-36">{site.county.state.name}</div>
            <div class="">
                <button class="btn variant-soft" onclick={handleSiteUsers}
                    >Users</button
                >
                <button class="btn variant-soft" disabled>Something</button>
                <button class="btn variant-soft" disabled>Something Else</button
                >
            </div>
        </div>
    {/each}

    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold">Sites</h1>
        <div class="grid grid-cols-2 gap-4">
            <SiteList />
            {#if selectedSite}
                <SiteUsers />
            {/if}
        </div>
        <UserManagementModal />
    </div>
{/snippet}
{#snippet dataBlock()}
    <button type="button" class="btn variant-soft" onclick={exportToCSV}
        >Export to CSV</button
    >
{/snippet}

{#snippet body()}
    <TabGroup>
        {#if $page.data?.user && $page.data.user.role === ROLE.SUPER}
            <Tab bind:group={tabSet} name="tab1" value={0}>📝 Organizations</Tab
            >
        {:else}
            <Tab bind:group={tabSet} name="tab1" value={0}>🛠 Organization</Tab>
        {/if}
        <Tab bind:group={tabSet} name="tab2" value={1}>👤 Users</Tab>
        <Tab bind:group={tabSet} name="tab3" value={2}>👤 Sites</Tab>
        <Tab bind:group={tabSet} name="tab4" value={3}>📝 Data</Tab>
        {#if isDebug}
            <Tab bind:group={tabSet} name="tab5" value={4}>🛠 Organization</Tab>
        {/if}

        <!-- Tab Panels --->
        <svelte:fragment slot="panel">
            {#if tabSet === 0}
                {#if $page.data?.user && $page.data.user.role === ROLE.SUPER}
                    {@render organizationList(myOrganizations)}
                {:else}
                    {@render organizationBlock()}
                {/if}
            {:else if tabSet === 1}
                {@render userList()}
            {:else if tabSet === 2}
                {@render siteMain()}
            {:else if tabSet === 3}
                {@render dataBlock()}
            {:else if isDebug && tabSet === 4}
                {@render organizationBlock()}
            {/if}
        </svelte:fragment>
    </TabGroup>
{/snippet}

<Container head={null} {body} bodyClasses="overflow-y-auto" tail={null} />
