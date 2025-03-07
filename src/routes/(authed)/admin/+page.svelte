<script lang="ts">
    import SiteList from "$lib/alt/SiteList.svelte";
    import SiteUsers from "$lib/alt/SiteUsers.svelte";
    import ButtonAddAllSiteUsers from "$lib/alt/ButtonAddAllSiteUsers.svelte";
    import ButtonRemoveAllSiteUsers from "$lib/alt/ButtonRemoveAllSiteUsers.svelte";
    import UserManagementModal from "$lib/modals/admin/UserManagementModal.svelte";
    import { usersContext } from "$lib/alt/internal/usersContext.svelte.ts";

    import { ROLE } from "$lib/types.js";
    import type { AppConfigFormKeyChecked } from "$lib/types.js";
    import type { Site, User } from "@prisma/client";
    import AppConfigControl from "$lib/components/AppConfigControl.svelte";
    import Container from "$lib/components/layouts/Container.svelte";
    // import Papa from "papaparse";
    import { TabGroup, Tab } from "@skeletonlabs/skeleton";
    import { page } from "$app/stores";
    import { getContext, setContext } from "svelte";
    import { SlideToggle } from "@skeletonlabs/skeleton";

    const TABS = Object.freeze({
        TAB1: 0,
        TAB2: 1,
        TAB3: 2,
        TAB4: 3,
        TAB5: 4,
        TAB6: 5,
        TAB7: 8,
    });

    let { data } = $props();
    // console.log(data);
    // console.log("xxx", data.users);
    // console.log("yyy");

    setContext("sites", data.sites);
    console.log("into usersContext", usersContext);
    setContext("usersContext", usersContext);

    const myOrganizations = data.organizations;

    let users: User[] | null = $state([]);

    let isDebug: boolean =
        data.appConfigs.find(
            (x: AppConfigFormKeyChecked) => x.configName === "modeDebug",
        )?.configValue === "true";
    let config: any = $state({});

    $effect(() => {
        config = $page.data.config;
    });

    let tabSet: number = $state(TABS.TAB0);

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
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold flex flex-row justify-between">
            <div>Sites</div>
            <div class="flex flex-row space-x-2">
                <ButtonAddAllSiteUsers />
                <ButtonRemoveAllSiteUsers />
            </div>
        </h1>
        <div class="flex flex-row space-x-4">
            <SiteList />
            <SiteUsers />
        </div>
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
            <Tab bind:group={tabSet} value={TABS.TAB0}>📝 Organizations</Tab>
        {:else}
            <Tab bind:group={tabSet} value={TABS.TAB0}>🛠 Organization</Tab>
        {/if}
        <Tab bind:group={tabSet} value={TABS.TAB1}>👤 Users</Tab>
        <Tab bind:group={tabSet} value={TABS.TAB2}>👤 Sites</Tab>
        <Tab bind:group={tabSet} value={TABS.TAB3}>📝 Data</Tab>
        {#if isDebug}
            <Tab bind:group={tabSet} value={TABS.TAB4}>🛠 Organization</Tab>
        {/if}
        <Tab bind:group={tabSet} value={TABS.TAB5}>👤 Test 1</Tab>
        <Tab bind:group={tabSet} value={TABS.TAB6}>👤 Test 2</Tab>
        <Tab bind:group={tabSet} value={TABS.TAB7}>👤 Test 3</Tab>

        <!-- Tab Panels --->
        <svelte:fragment slot="panel">
            {#if tabSet === TABS.TAB0}
                {#if $page.data?.user && $page.data.user.role === ROLE.SUPER}
                    {@render organizationList(myOrganizations)}
                {:else}
                    {@render organizationBlock()}
                {/if}
            {:else if tabSet === TABS.TAB1}
                {@render userList()}
            {:else if tabSet === TABS.TAB2}
                {@render siteMain()}
            {:else if tabSet === TABS.TAB3}
                {@render dataBlock()}
            {:else if isDebug && tabSet === TABS.TAB4}
                {@render organizationBlock()}
            {:else if tabSet === TABS.TAB5}
                <div>Okay</div>
            {:else if tabSet === TABS.TAB6}
                <div>Okay Okay</div>
            {:else if tabSet === TABS.TAB7}
                <div>Okay Okay Okay</div>
            {/if}
        </svelte:fragment>
    </TabGroup>
{/snippet}

<Container head={null} {body} bodyClasses="overflow-y-auto" tail={null} />
