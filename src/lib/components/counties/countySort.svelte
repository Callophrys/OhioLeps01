<script lang="ts">
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import { SORTORDER, type CountyComplete } from '$lib/types.js';

    export let counties: CountyComplete[];

    let useCounty: number = 1;
    let sortOrderCounty: SORTORDER = SORTORDER.NONE;
    let sortOrderRegion: SORTORDER = SORTORDER.NONE;
    let sortIconCounty: string = '';
    let sortIconRegion: string = '';

    function handleSortClick(e: any) {
        let sortCountyDir = 1;
        let sortRegionDir = 1;

        const compareCounty = (a: CountyComplete, b: CountyComplete) => {
            if (a.name > b.name) return 1 * sortCountyDir;
            if (a.name < b.name) return -1 * sortCountyDir;
            return 0;
        };

        const compareRegionFirst = (a: CountyComplete, b: CountyComplete) => {
            if (a.region.name > b.region.name) return 1 * sortRegionDir;
            if (a.region.name < b.region.name) return -1 * sortRegionDir;
            if (a.name > b.name) return 1 * sortCountyDir;
            if (a.name < b.name) return -1 * sortCountyDir;
            return 0;
        };

        if (e.target.name === 'toggle-sort-county') {
            if (sortOrderCounty !== SORTORDER.ASC) {
                sortOrderCounty = SORTORDER.ASC;
                sortIconCounty = 'table-sort-asc';
            } else {
                sortOrderCounty = SORTORDER.DSC;
                sortIconCounty = 'table-sort-dsc';
            }

            sortOrderRegion = SORTORDER.NONE;
            sortIconRegion = '';
            sortCountyDir = sortOrderCounty === SORTORDER.ASC ? 1 : -1;
            counties.sort(compareCounty);
        } else {
            if (sortOrderRegion !== SORTORDER.ASC) {
                sortOrderRegion = SORTORDER.ASC;
                sortIconRegion = 'table-sort-asc';
            } else {
                sortOrderRegion = SORTORDER.DSC;
                sortIconRegion = 'table-sort-dsc';
            }

            sortRegionDir = sortOrderRegion === SORTORDER.ASC ? 1 : -1;
            sortCountyDir = sortOrderCounty === SORTORDER.ASC ? 1 : -1;
            counties.sort(compareRegionFirst);
        }

        counties = counties;
        return true;
    }
</script>

<div class="my-auto">County count: {counties.length}</div>
<div class="flex flex-row space-x-2">
    <span class="my-auto text-right">Sort by County Region</span>
    <div class="scale-75 origin-left">
        <RadioGroup name="toggle-naming-group" active="variant-filled-primary" hover="hover:variant-soft-primary">
            <RadioItem bind:group={useCounty} on:click={handleSortClick} class={sortIconCounty} name="toggle-sort-county" value={0}>County</RadioItem>
            <RadioItem bind:group={useCounty} on:click={handleSortClick} class={sortIconRegion} name="toggle-sort-region" value={1}>Region</RadioItem>
        </RadioGroup>
    </div>
</div>
