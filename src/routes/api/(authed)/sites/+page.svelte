<script lang="ts">
    //import type { PopupSettings } from '@skeletonlabs/skeleton';
    import Container from '$lib/components/layouts/Container.svelte';
    import { popup } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    //import { enhance } from '$app/forms';
    // import { isEmpty, camelToFriendly } from '$lib/utils';
    // import { formatDate } from '$lib/utils';
    import GoBack from '$lib/components/datanavigation/GoBack.svelte';
    // import GoNext from '$lib/components/datanavigation/GoNext.svelte';
    import { GOTYPE } from '$lib/types.js';

    let { data, form }: { data: any; form: any | null } = $props();

    // console.log(data.sites[0]);

    let targetId = $state(data?.sites?.length ? data.sites[0].countyId : -1);
    let targetIdSecondary = -1;

    function isEmpty(x: any) {
        return typeof x === 'undefined' || !!x;
    }

    function formatDate(_: any) {
        return 'XYZ';
    }

    function addSite() {
        goto(`/api/sites/new/-1`);
    }
</script>

{#snippet head()}
    <div class="">
        <GoBack bind:targetId targetType={GOTYPE.COUNTYSITES} targetIdSecondary={-1} controlBody="scale-90" buttonCenter="" scriptCenter="" labelledby="Select site-date" />
        {#if ($page.data.user?.role === 'ADMIN' || $page.data.user?.role === 'SUPER') && typeof form === 'object' && !isEmpty(form?.data)}
            <span>Site X of {data?.sites.length}: {form?.data?.siteName} </span>
            <button type="submit"> ➜ Next site</button>

            <div class="flex gap-2">
                <a href="/api/sites" class="p-2 hover:bg-sky-700">🔍 Return to all sites</a>
                <form method="POST" action="?/getSites" id="pickSite">
                    <label class="p-2 hover:bg-sky-700">
                        <button type="submit">🔍 Return to all sites</button>
                    </label>
                </form>
                <form method="POST" action="?/editSite" id="pickSite">
                    <label class="p-2 hover:bg-sky-700">
                        <button type="submit">✐ Edit this site</button>
                    </label>
                </form>
                <form method="POST" action="?/removeSite" id="pickSite">
                    <label class="p-2 hover:bg-sky-700">
                        <input type="hidden" name="siteId" value={data.sites?.siteId} />
                        <button type="submit">❌ Delete this site</button>
                    </label>
                </form>
            </div>
            <hr />
            <!--
    <form method="POST" action="?/addTodo">
        <input type="text" name="todo" value={form?.site ?? ''} />
        {#if form?.missing}
            <p class="error">This field is required</p>
        {/if}

        <button type="submit">+ Add Todo</button>

        <button formaction="?/clearTodos" class="secondary" type="submit"> Clear </button>
    </form>

    {#if form?.success}
        <p>Added todo! 🥳</p>
    {/if}
    -->
        {:else if typeof form === 'object' && !isEmpty(form?.data)}
            <span>Site X of {data?.sites.length}: {form?.data?.siteName} </span>
            <button type="submit"> ➜ Next site</button>
        {:else}
            <span>Sites: {data?.sites?.length}</span>
        {/if}
        {#if $page.data?.user && ($page.data.user.role === 'SUPER' || $page.data.user.role === 'ADMIN')}
            <button type="button" class="btn h-10 variant-soft" onclick={addSite} title="Add new site"><span class="text-success-400">✚</span>&nbsp;Add site</button>
        {/if}
    </div>
{/snippet}

{#snippet body()}
    <div class="">
        {#if typeof form === 'object' && !isEmpty(form?.data)}
            <div class="w-1/2">
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">SiteName</div>
                    <div>{form.data.siteName}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Description</div>
                    <div>{form.data.description}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Site Address</div>
                    <div>{form.data.siteAddress}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Site Address 2</div>
                    <div>{form.data.siteAddress2}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Site City</div>
                    <div>{form.data.siteCity}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Site State</div>
                    <div>{form.data.siteState}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Site Zip</div>
                    <div>{form.data.siteZip}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">County</div>
                    <div>{form.data.county}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Township</div>
                    <div>{form.data.township}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">LocationZip</div>
                    <div>{form.data.locationZip}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">LatitudeEnd</div>
                    <div>{form.data.latitudeEnd}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">LatitudeStart</div>
                    <div>{form.data.latitudeStart}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">LongitudeEnd</div>
                    <div>{form.data.longitudeEnd}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">LongitudeStart</div>
                    <div>{form.data.longitudeStart}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Person</div>
                    <div>{form.data.person}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Person Address</div>
                    <div>{form.data.personAddress}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Person Address 2</div>
                    <div>{form.data.personAddress2}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Person City</div>
                    <div>{form.data.personCity}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Person State</div>
                    <div>{form.data.personState}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Person Zip</div>
                    <div>{form.data.personZip}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Person Phone</div>
                    <div>{form.data.personPhone}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Person Email</div>
                    <div>{form.data.personEmail}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Alt. Person</div>
                    <div>{form.data.altPerson}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Alt Person Address</div>
                    <div>{form.data.altPersonAddress}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Alt Person Address 2</div>
                    <div>{form.data.altPersonAddress2}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Alt Person City</div>
                    <div>{form.data.altPersonCity}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Alt Person State</div>
                    <div>{form.data.altPersonState}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Alt Person Zip</div>
                    <div>{form.data.altPersonZip}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Alt Person Phone</div>
                    <div>{form.data.altPersonPhone}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Alt Person Email</div>
                    <div>{form.data.altPersonEmail}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">OtherParticipants</div>
                    <div>{form.data.otherParticipants}</div>
                </div>
                {#each form.data.siteStatuses as siteStatus}
                    <div class="grid grid-cols-2 space-x-2 w-max">
                        <div class="text-right w-40">{siteStatus.year}</div>
                        <div>{siteStatus.statusCode?.description}</div>
                    </div>
                {/each}
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Created on</div>
                    <div>{form.data.createdAt.toString()}</div>
                </div>
            </div>
        {:else if typeof data?.sites === 'object'}
            <div>
                <div class="flex flex-wrap gap-2">
                    {#each data.sites as site}
                        <a href="/api/sites/{site.siteId}">
                            <div class="card relative grid w-56 h-32 p-0 m-0 text-wrap hover:variant-soft">
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
                                        Last update: {formatDate(site.updatedAt ?? site.createdAt)}
                                    </div>
                                </div>
                                <!--
                            <div class="flex flex-row m-0">
                                <a
                                    href="/api/sites/{site.siteId}"
                                    class="edit mx-auto w-1/2 text-center hover:variant-soft">🔍</a
                                >
                                <form
                                    method="POST"
                                    action="?/removeSite"
                                    class="mx-auto w-1/2 text-center hover:variant-soft"
                                >
                                    <input type="hidden" name="siteId" value={site.siteId} />
                                    <button class="delete" type="submit">❌</button>
                                    <! -- later add use:enhance -- >
                                </form>
                            </div>
                            -->
                            </div>
                        </a>
                    {/each}
                </div>
            </div>
        {:else}
            <div>
                <div class="grid grid-cols-3 gap-4 w-fit">
                    {#each data.sites ?? [] as site, i}
                        <!-- Trigger -->
                        <div
                            class="card w-60 p-4 [&>*]:pointer-events-none"
                            use:popup={{
                                event: 'hover',
                                target: 'loopExample-' + i,
                                placement: 'right',
                            }}>
                            <h3>{site.siteName}</h3>
                            <div>
                                {site.siteAddress ?? ''}{#if site.siteCity || site.siteState || site.siteZip}
                                    {site.siteAddress ? ',' : ''}
                                    {@html site.siteCity + ', ' + site.siteState + ' ' + site.siteZip + '&nbsp;&#124;&nbsp;'}{/if}
                                {site.county.state.name} (County: {site.county.name})
                            </div>
                        </div>

                        <!-- Popup -->
                        <div data-popup="loopExample-{i}">
                            <div class="card py-2 px-4 shadow-xl variant-filled-surface">
                                <div class="underline">Directions</div>
                                <p>{site.siteName}<br />{site.person}</p>
                                <div class="arrow variant-filled-surface"></div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
{/snippet}

<Container {head} {body} tail={null} />
