<script lang="ts">
    import { GOTYPE } from "$lib/types.js";
    import type { ModalSettings, ModalComponent } from "@skeletonlabs/skeleton";
    import type { Site } from "@prisma/client";
    import GoBack from "$lib/components/datanavigation/GoBack.svelte";
    import Container from "$lib/components/layouts/Container.svelte";
    import ModalSite from "$lib/components/ModalSite.svelte";
    import { formatDate } from "$lib/utils";
    import { getModalStore } from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { popup } from "@skeletonlabs/skeleton";
    import DataOptions from "$lib/components/datanavigation/DataOptions.svelte";
    //import { enhance } from '$app/forms';

    let { data }: { data: any } = $props();

    let currentStateId = $state(
        data.sites?.length ? data.sites[0].stateId : -1,
    );
    let currentCountyId = $state(
        data.sites?.length ? data.sites[0].countyId : -1,
    );
    let unitGps: string = $state("DMS"); // {DMS, DMM, DD}

    $effect(() => {
        let x = localStorage?.unitGps;
        if (x) unitGps = x;
    });

    const modalStore = getModalStore();

    function modalComponentSite(
        isNewRecord: boolean,
        unitGps: string,
        site: Site | null,
        countyId: number,
        stateId: number,
    ): void {
        const c: ModalComponent = { ref: ModalSite };
        const componentTitle = isNewRecord
            ? "Add New Site"
            : `Edit Site - ${site?.siteName}`;
        const componentUrl = isNewRecord
            ? "../api/sites/-1?/createSite"
            : `../api/site/${site?.id ?? "-1"}?/updateSite`;

        const componentValues = isNewRecord
            ? {
                  site: null,
                  siteId: -1,
                  countyId: countyId,
                  counties: data.counties,
                  stateId: stateId,
                  states: data.states,
                  unitGps: unitGps,
                  isNewRecord: isNewRecord,
              }
            : {
                  site: site,
                  siteId: site?.id,
                  countyId: countyId,
                  counties: data.counties,
                  stateId: stateId,
                  states: data.states,
                  unitGps: unitGps,
                  isNewRecord: isNewRecord,
              };

        const modal: ModalSettings = {
            type: "component",
            component: c,
            title: componentTitle,
            body: "Complete the form below and then press submit.",
            value: componentValues,
            response: (r) => {
                if (typeof r === "object") {
                    const formData = new FormData();
                    for (const [k, v] of Object.entries(r) as [string, any])
                        formData.append(k, v);

                    fetch(componentUrl, {
                        method: "POST",
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.status === 200) {
                                const rdata = JSON.parse(data.data);
                                console.log("rdata:", rdata);
                                let dataIndex = rdata[0].data;
                                let valueIndex = rdata[dataIndex].id;
                                let siteId = rdata[valueIndex];
                                //TODO: Assure that SiteDatePicker updates.  The following goto + invalidateAll does
                                // not accomplish it.  Thought that udpating the bound currentSiteDateId would cause
                                // the SiteDatePicker to update itself.  Hmmm.
                                //currentSiteDateId = siteDateId;
                                //NOTE: verified that invalidateAll assure that browsed for data renders after update
                                goto("/api/site/" + siteId, {
                                    invalidateAll: true,
                                });
                            }
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                }
            },
        };
        modalStore.trigger(modal);
    }
</script>

{#snippet head()}
    <div class="flex flex-row justify-between">
        <div>
            <GoBack
                bind:targetId={currentCountyId}
                targetType={GOTYPE.COUNTYSITES}
                targetIdSecondary={-1}
                controlBody="scale-90"
                buttonCenter=""
                scriptCenter=""
                labelledby="Select site-date"
            />
            <span>Sites: {data?.sites?.length}</span>
        </div>
        {#if $page.data?.user && ($page.data.user.role === "SUPER" || $page.data.user.role === "ADMIN")}
            <button
                type="button"
                class="btn h-10 variant-soft"
                onclick={() =>
                    modalComponentSite(
                        true,
                        unitGps,
                        null,
                        currentCountyId,
                        currentStateId,
                    )}
                title="Add a new site"
                ><span class="text-success-400">✚</span>&nbsp;Add Site</button
            >
        {/if}
    </div>
{/snippet}

{#snippet body()}
    <div class="">
        <div class="flex flex-wrap gap-2">
            {#each data.sites as site}
                <a href="/api/site/{site.id}">
                    <div
                        class="card relative grid w-56 h-32 p-0 m-0 text-wrap hover:variant-soft"
                    >
                        <div class="px-2 pt-2 w-full text-center">
                            <div class="flex flex-row justify-between">
                                <div class="">🔍</div>
                                <div class="w-full mr-4">{site.siteName}</div>
                            </div>
                            <div>
                                {site.county.state.name} - {site.county.name}
                            </div>
                            <div>{site.person}</div>
                            <div class="text-wrap">
                                Last update: {formatDate(
                                    site.updatedAt ?? site.createdAt,
                                    "short",
                                )}
                            </div>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    </div>
{/snippet}

<Container {head} {body} bodyClasses="overflow-y-auto" tail={null} />
