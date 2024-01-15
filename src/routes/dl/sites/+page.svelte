<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { formatDate } from '$lib/utils';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';
    import { isEmpty } from '$lib/utils';
    export let data;
    export let form;

    console.log('+page.svelte > data:', data ?? 'empty');
    console.log('+page.svelte > form:', form ?? 'empty');
    /*
    */
    
    //$: ({ sites } = data)
</script>

<StandardContainer>
    <div class="">
        {#if $page.data?.user?.role === 'ADMIN' && typeof form === 'object' && !isEmpty(form?.data)}
            <span>Site X of {data.sites?.length}: {form?.data?.siteName} </span>
            <button type="submit"> ➜ Next site</button>

            <div class="flex gap-2">
                <a href="/dl/sites" class="p-2 hover:bg-sky-700">🔍 Return to all sites</a>
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
            <span>Site X of {data.sites?.length}: {form?.data?.siteName} </span>
            <button type="submit"> ➜ Next site</button>
        {:else}
            <span>Sites: {data.sites?.length}</span>
        {/if}
    </div>

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
                    <div class="text-right w-40">SiteAddress</div>
                    <div>{form.data.siteAddress}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">SiteAddress2</div>
                    <div>{form.data.siteAddress2}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">SiteCityStateZip</div>
                    <div>{form.data.siteCityStateZip}</div>
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
                    <div class="text-right w-40">Person</div>
                    <div>{form.data.person}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Address</div>
                    <div>{form.data.address}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Address2</div>
                    <div>{form.data.address2}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">CityStateZip</div>
                    <div>{form.data.cityStateZip}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Phone</div>
                    <div>{form.data.phone}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">Email</div>
                    <div>{form.data.email}</div>
                </div>

                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">AltPerson</div>
                    <div>{form.data.altPerson}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">AltAddress</div>
                    <div>{form.data.altAddress}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">AltAddress2</div>
                    <div>{form.data.altAddress2}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">AltCityStateZip</div>
                    <div>{form.data.altCityStateZip}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">AltPhone</div>
                    <div>{form.data.altPhone}</div>
                </div>
                <div class="grid grid-cols-2 space-x-2 w-max">
                    <div class="text-right w-40">AltEmail</div>
                    <div>{form.data.altEmail}</div>
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
                    <div>form.data.createdAt</div>
                </div>
            </div>
        {:else if typeof data === 'object' && !isEmpty(data)}
        <script>{console.log('made it here')}</script>
            <div>
                <div class="grid grid-cols-2 gap-2 place-content-start">
                    {#each data.sites as site, i}
                        <div class="card btn grid w-64 p-0 m-0 text-wrap">
                            <div class="px-2 pt-2 w-full">
                                <h3>{site.siteName}</h3>
                                <div>
                                    site.county.state.name - {site.county.name}
                                </div>
                                <div>{site.person}</div>
                                <div class="text-wrap">Last update: formatDate(site.changedAt)</div>
                            </div>
                            <div class="flex m-0">
                                <form method="POST" action="?/getSite">
                                    <input type="hidden" name="siteId" value={site.siteId} />
                                    <button class="edit" type="submit">🔍</button>
                                    <!-- later add use:enhance-->
                                </form>
                                <form method="POST" action="?/removeSite">
                                    <input type="hidden" name="siteId" value={site.siteId} />
                                    <button class="delete" type="submit">❌</button>
                                    <!-- later add use:enhance-->
                                </form>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {:else}
        <script> {console.log('made it to else', sites)} </script>
            <div>
                <div class="grid grid-cols-3 gap-4 w-fit">
                    {#each data.sites as site, i}
                        <!-- Trigger -->
                        <div
                            class="card w-60 p-4 [&>*]:pointer-events-none"
                            use:popup={{
                                event: 'hover',
                                target: 'loopExample-' + i,
                                placement: 'right',
                            }}
                        >
                            <h3>{site.siteName}</h3>
                            <div>
                                {site.siteAddress ?? ''}{#if site.siteCityStateZip}
                                    {site.siteAddress ? ',' : ''}
                                    {@html site.siteCityStateZip + '&nbsp;&#124;&nbsp;'}{/if}
                                {site.county.state} (County: {site.county.county})
                            </div>
                        </div>

                        <!-- Popup -->
                        <div data-popup="loopExample-{i}">
                            <div class="card py-2 px-4 shadow-xl variant-filled-surface">
                                <div class="underline">Directions</div>
                                <p>{site.siteName}<br />{site.person}</p>
                                <div class="arrow variant-filled-surface" />
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</StandardContainer>

<style>
    .text-base-token {
        color: rgba(var(--theme-font-color-base));
    }
    .text-dark-token {
        color: rgba(var(--theme-font-color-dark));
    }
    .text-token {
        @apply text-base-token dark:text-dark-token;
    }
</style>
