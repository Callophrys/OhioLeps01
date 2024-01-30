<script lang="ts">
    import { formatDate } from '$lib/utils';
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    export let data;
    //console.log(data);
</script>

<StandardContainer>
    <svelte:fragment slot="standardBody">
        <div>
            <div class="font-bold">{data.siteObservation.checklist.scientificName}</div>
            <div class="flex flex-row space-x-4">
                <div>Hodges: {data.siteObservation.hodges}</div>
                <div>Id Code: {data.siteObservation.idCode}</div>
            </div>
            <hr />
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 1:</div>
                    <div class="w-7">{@html data.siteObservation.section1 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 2:</div>
                    <div class="w-7">{@html data.siteObservation.section2 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 3:</div>
                    <div class="w-7">{@html data.siteObservation.section3 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 4:</div>
                    <div class="w-7">{@html data.siteObservation.section4 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 5:</div>
                    <div class="w-7">{@html data.siteObservation.section5 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 6:</div>
                    <div class="w-7">{@html data.siteObservation.section6 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 7:</div>
                    <div class="w-7">{@html data.siteObservation.section7 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 8:</div>
                    <div class="w-7">{@html data.siteObservation.section8 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 9:</div>
                    <div class="w-7">{@html data.siteObservation.section9 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 10:</div>
                    <div class="w-7">{@html data.siteObservation.section10 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 11:</div>
                    <div class="w-7">{@html data.siteObservation.section11 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 12:</div>
                    <div class="w-7">{@html data.siteObservation.section12 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 13:</div>
                    <div class="w-7">{@html data.siteObservation.section13 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 14:</div>
                    <div class="w-7">{@html data.siteObservation.section14 ?? '&varnothing;'}</div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="w-24 text-right">Section 15:</div>
                    <div class="w-7">{@html data.siteObservation.section15 ?? '&varnothing;'}</div>
                </div>
            </div>
            <hr />
            <div class="flex flex-row flex-wrap justify-between">
                <div class="flex flex-col basis-56">
                    <div>Created At: {formatDate(new Date(data.siteObservation.createdAt).toISOString(), undefined, 'short')}</div>
                    <div class="">Created By: {data.siteObservation.createdBy}</div>
                </div>
                <div class="flex flex-col basis-56">
                    <div>Updated At: {data.siteObservation.updatedAt ? formatDate(new Date(data.siteObservation.updatedAt).toISOString(), undefined, 'short') : ''}</div>
                    <div class="">Updated By: {data.siteObservation.updatedBy ?? ''}</div>
                </div>
                <div class="flex flex-col basis-56">
                    <div>Confirm At: {data.siteObservation.confirmAt ? formatDate(new Date(data.siteObservation.confirmAt).toISOString()) : ''}</div>
                    <div class="">Confirm By: {data.siteObservation.confirmBy ?? ''}</div>
                </div>
            </div>
        </div>
    </svelte:fragment>
</StandardContainer>
