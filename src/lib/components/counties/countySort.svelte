<script lang="ts">
    /*-- Imports */
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import { GEOGRAPHIC, SORTORDER, type CountyComplete } from '$lib/types.js';
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
    const cClassesElementDrei = "my-auto text-right before:content-[''] md:before:content-['Sort_by'] lg:before:content-['Sort_by_County/StateRegion:']";
    const cControlBody = '';

    /*-- Reactives (styles) */
    let classesElementZwei = $derived(`${cClassesElementZwei} ${elementZwei}`); // ${$$props.class ?? ''}`);
    let classesElementDrei = $derived(`${cClassesElementDrei} ${elementDrei}`); // ${$$props.class ?? ''}`);
    let classesControlBody = $derived(`${cControlBody} ${controlBody}`); //${$$props.class ?? ''}`);

    /*-- -- Coding -- */
    /*-- Enums */

    /*-- Constants (functional) */
    /*-- Properties (functional) */
    /*-- Variables and objects */
    let valueCountyStateRegion: GEOGRAPHIC = $state(GEOGRAPHIC.COUNTY);
    let sortOrderCounty: SORTORDER = $state(SORTORDER.ASC);
    let sortOrderStateRegion: SORTORDER = $state(SORTORDER.NONE);
    let sortIconCounty: string = $state('table-sort-asc');
    let sortIconStateRegion: string = $state('');

    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */
    function handleSortClick(e: any) {
        console.log(valueCountyStateRegion, sortOrderCounty, sortOrderStateRegion, sortIconCounty, sortIconStateRegion);

        let sortCountyDir = 1;
        let sortStateRegionDir = 1;

        const compareCounty = (a: CountyComplete, b: CountyComplete) => {
            if (a.name > b.name) return 1 * sortCountyDir;
            if (a.name < b.name) return -1 * sortCountyDir;
            return 0;
        };

        const compareStateRegionFirst = (a: CountyComplete, b: CountyComplete) => {
            if (a.stateRegion.name > b.stateRegion.name) return 1 * sortStateRegionDir;
            if (a.stateRegion.name < b.stateRegion.name) return -1 * sortStateRegionDir;
            if (a.name > b.name) return 1 * sortCountyDir;
            if (a.name < b.name) return -1 * sortCountyDir;
            return 0;
        };

        if (e.target.name === 'toggle-sort-county') {
            if (sortOrderStateRegion !== SORTORDER.NONE) {
                sortOrderStateRegion = SORTORDER.NONE;
                sortIconStateRegion = '';
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
            if (sortOrderStateRegion !== SORTORDER.ASC) {
                sortOrderStateRegion = SORTORDER.ASC;
                sortIconStateRegion = 'table-sort-asc';
                sortStateRegionDir = 1;
            } else {
                sortOrderStateRegion = SORTORDER.DSC;
                sortIconStateRegion = 'table-sort-dsc';
                sortStateRegionDir = -1;
            }

            sortCountyDir = sortOrderCounty === SORTORDER.ASC ? 1 : -1;
            counties.sort(compareStateRegionFirst);
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
            <RadioItem bind:group={valueCountyStateRegion} on:click={handleSortClick} class={sortIconCounty} name="toggle-sort-county" value={GEOGRAPHIC.COUNTY}>County</RadioItem>
            <RadioItem bind:group={valueCountyStateRegion} on:click={handleSortClick} class={sortIconStateRegion} name="toggle-sort-region" value={GEOGRAPHIC.STATEREGION}>StateRegion</RadioItem>
        </RadioGroup>
    </div>
</div>
