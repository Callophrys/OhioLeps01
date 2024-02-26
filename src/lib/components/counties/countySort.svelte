<script lang="ts">
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import { SORTORDER, type CountyComplete } from '$lib/types.js';

    export let counties: CountyComplete[];

    enum GEOGRAPHIC {
        COUNTY = 0,
        REGION = 1,
    }

    let valueCountyRegion: number = GEOGRAPHIC.COUNTY;
    let sortOrderCounty: SORTORDER = SORTORDER.ASC;
    let sortOrderRegion: SORTORDER = SORTORDER.NONE;
    let sortIconCounty: string = 'table-sort-asc';
    let sortIconRegion: string = '';

    function handleSortClick(e: any) {
        console.log(valueCountyRegion, sortOrderCounty, sortOrderRegion, sortIconCounty, sortIconRegion);

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
            if (sortOrderRegion !== SORTORDER.NONE) {
                sortOrderRegion = SORTORDER.NONE;
                sortIconRegion = '';
            } else {
                if (sortOrderCounty !== SORTORDER.ASC) {
                    sortOrderCounty = SORTORDER.ASC;
                    sortIconCounty = 'table-sort-asc';
                } else {
                    sortOrderCounty = SORTORDER.DSC;
                    sortIconCounty = 'table-sort-dsc';
                }
            }

            sortCountyDir = sortOrderCounty === SORTORDER.ASC ? 1 : -1;
            counties.sort(compareCounty);
        } else {
            if (sortOrderRegion !== SORTORDER.ASC) {
                sortOrderRegion = SORTORDER.ASC;
                sortIconRegion = 'table-sort-asc';
                sortRegionDir = 1;
            } else {
                sortOrderRegion = SORTORDER.DSC;
                sortIconRegion = 'table-sort-dsc';
                sortRegionDir = -1;
            }

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
            <RadioItem bind:group={valueCountyRegion} on:click={handleSortClick} class={sortIconCounty} name="toggle-sort-county" value={GEOGRAPHIC.COUNTY}>County</RadioItem>
            <RadioItem bind:group={valueCountyRegion} on:click={handleSortClick} class={sortIconRegion} name="toggle-sort-region" value={GEOGRAPHIC.REGION}>Region</RadioItem>
        </RadioGroup>
    </div>
</div>
