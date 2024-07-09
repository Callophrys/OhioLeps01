<script lang="ts">
    /*-- Imports */
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import { SORTORDER, type CountyComplete } from '$lib/types.js';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

    type CountySortProps = {
        counties: CountyComplete[];
        elementZwei: CssClasses;
        elementDrei: CssClasses;
        controlBody: CssClasses | null;
    };

    let { counties = $bindable(), elementZwei = '-mr-9', elementDrei = '', controlBody = null }: CountySortProps = $props();

    /*-- -- Data -- */
    /*-- Exports */
    /*-- Context */
    /*-- -- Styling -- */
    /*-- Properties (styles) */

    /*-- Constants (styles) */
    const cClassesElementZwei = 'flex flex-row space-x-2';
    const cClassesElementDrei = "my-auto text-right before:content-[''] md:before:content-['Sort_by'] lg:before:content-['Sort_by_County/Region:']";
    const cControlBody = '';

    /*-- Reactives (styles) */
    let classesElementZwei = $derived(`${cClassesElementZwei} ${elementZwei}`); // ${$$props.class ?? ''}`);
    let classesElementDrei = $derived(`${cClassesElementDrei} ${elementDrei}`); // ${$$props.class ?? ''}`);
    let classesControlBody = $derived(`${cControlBody} ${controlBody}`); //${$$props.class ?? ''}`);

    /*-- -- Coding -- */
    /*-- Enums */
    enum GEOGRAPHIC {
        COUNTY = 0,
        REGION = 1,
    }

    /*-- Constants (functional) */
    /*-- Properties (functional) */
    /*-- Variables and objects */
    let valueCountyRegion: number = $state(GEOGRAPHIC.COUNTY);
    let sortOrderCounty: SORTORDER = $state(SORTORDER.ASC);
    let sortOrderRegion: SORTORDER = $state(SORTORDER.NONE);
    let sortIconCounty: string = $state('table-sort-asc');
    let sortIconRegion: string = $state('');

    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
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

<div class={classesElementZwei}>
    <span class={classesElementDrei}></span>
    <div class={classesControlBody}>
        <RadioGroup name="toggle-naming-group" active="variant-filled-primary" hover="hover:variant-soft-primary">
            <RadioItem bind:group={valueCountyRegion} on:click={handleSortClick} class={sortIconCounty} name="toggle-sort-county" value={GEOGRAPHIC.COUNTY}>County</RadioItem>
            <RadioItem bind:group={valueCountyRegion} on:click={handleSortClick} class={sortIconRegion} name="toggle-sort-region" value={GEOGRAPHIC.REGION}>Region</RadioItem>
        </RadioGroup>
    </div>
</div>
