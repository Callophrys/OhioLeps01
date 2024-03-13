<script lang="ts">
    /*-- Imports */
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import { SORTORDER, type CountyComplete } from '$lib/types.js';
    import type { CssClasses } from '@skeletonlabs/skeleton';

    /*-- -- Data -- */
    /*-- Exports */
    export let counties: CountyComplete[];

    /*-- Context */
    /*-- -- Styling -- */
    /*-- Properties (styles) */
    export let elementEins: CssClasses = 'pr-2';
    export let elementZwei: CssClasses = '-mr-9';
    export let elementDrei: CssClasses = '';

    /*-- Constants (styles) */
    const cClassesElementEins = "my-auto before:content-['Counties:'] before:lg:content-['County_count:']";
    const cClassesElementZwei = 'flex flex-row space-x-2';
    const cClassesElementDrei = "my-auto text-right before:content-[''] md:before:content-['Sort_by'] lg:before:content-['Sort_by_County/Region:']";

    /*-- Reactives (styles) */
    $: classesElementEins = `${cClassesElementEins} ${elementEins} ${$$props.class ?? ''}`;
    $: classesElementZwei = `${cClassesElementZwei} ${elementZwei} ${$$props.class ?? ''}`;
    $: classesElementDrei = `${cClassesElementDrei} ${elementDrei} ${$$props.class ?? ''}`;

    /*-- -- Coding -- */
    /*-- Enums */
    enum GEOGRAPHIC {
        COUNTY = 0,
        REGION = 1,
    }

    /*-- Constants (functional) */
    /*-- Properties (functional) */
    /*-- Variables and objects */
    let valueCountyRegion: number = GEOGRAPHIC.COUNTY;
    let sortOrderCounty: SORTORDER = SORTORDER.ASC;
    let sortOrderRegion: SORTORDER = SORTORDER.NONE;
    let sortIconCounty: string = 'table-sort-asc';
    let sortIconRegion: string = '';

    /*-- Run first stuff */
    /*-- onMount, beforeNavigate, afterNavigate */
    /*-- Handlers */
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

    /*-- Methods */
    /*-- Reactives (functional) */

</script>

<div class={classesElementEins}>
    &nbsp;{counties.length}
</div>
<div class={classesElementZwei}>
    <span class={classesElementDrei} />
    <div class="scale-75 origin-left">
        <RadioGroup name="toggle-naming-group" active="variant-filled-primary" hover="hover:variant-soft-primary">
            <RadioItem bind:group={valueCountyRegion} on:click={handleSortClick} class={sortIconCounty} name="toggle-sort-county" value={GEOGRAPHIC.COUNTY}>County</RadioItem>
            <RadioItem bind:group={valueCountyRegion} on:click={handleSortClick} class={sortIconRegion} name="toggle-sort-region" value={GEOGRAPHIC.REGION}>Region</RadioItem>
        </RadioGroup>
    </div>
</div>
