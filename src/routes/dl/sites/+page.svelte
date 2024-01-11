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
</script>

<StandardContainer>
    <div class="">
        {#if $page.data?.user?.role === 'ADMIN'}
            <form method="POST" action="?/addSite" id="pickSite">
                <label class="hover:cursor-pointer"
                    >Site Count: {data.sites?.length} <button>➕</button></label
                >
            </form>
        {:else}
            Site Count: {data.sites?.length}
        {/if}
    </div>

    {#if typeof data === 'object' && !isEmpty(data)}
        <section>
            {#if $page.data?.user?.role === 'ADMIN'}
                <div class="grid grid-cols-2 gap-2 place-content-start">
                    {#each data.sites as site, i}
                        <div class="card btn grid w-64 p-0 m-0 text-wrap">
                            <div class="px-2 pt-2 w-full">
                                <h3>{site.siteName}</h3>
                                <div>{site.person}</div>
                                <div>{site.stateCounty.state} - {site.stateCounty.county}</div>
                                <div>Last update: {formatDate(site.changeDate)}</div>
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
            {:else}
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
                                {site.stateCounty.state} (County: {site.stateCounty.county})
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
            {/if}
        </section>
    {/if}

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
</StandardContainer>
