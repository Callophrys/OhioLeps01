<script lang="ts">
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import { GOBACK } from '$lib/types';
    import { goto } from '$app/navigation';

    export let returnId: number;
    export let returnTarget: GOBACK;

    /*-- -- Styling -- */
    /*-- Properties (styles) */
    export let controlBody: CssClasses = '';
    export let buttonCenter: CssClasses = '';
    export let scriptCenter: CssClasses = '';

    // Properties (a11y)
    /** Provide the ARIA labelledby value.  Default: "Select site-date" */
    export let labelledby = 'Select site-date';

    /*-- Constants (styles) */
    const cControlBody = 'btn-group w-16 variant-soft my-auto';
    const cButtonCenter = '';
    const cScriptCenter = 'w-full my-auto text-center truncate overflow-hidden text-ellipsis';

    /*-- Reactives (styles) */
    $: classesControlBody = `${cControlBody} ${controlBody} ${$$props.class ?? ''}`;
    $: classesButtonCenter = `${cButtonCenter} ${buttonCenter} ${$$props.class ?? ''}`;
    $: classesScriptCenter = `${cScriptCenter} ${scriptCenter} ${$$props.class ?? ''}`;

    /*-- Handlers */
    function handleClick() {
        switch (returnTarget) {
            case GOBACK.SITEDATES:
                goto('/api/sitedates/' + returnId);
                break;
            case GOBACK.SITES:
                goto('/api/sites/' + returnId);
                break;
            case GOBACK.COUNTYSITES:
                goto('/api/countysites/' + returnId);
                break;
            case GOBACK.COUNTIES:
                goto('/api/counties');
                break;
            // //TODO: TBD and implemented
            // case GOBACK.STATEREGIONS,
            //     GOBACK.STATES,
            //     GOBACK.COUNTRYREGIONS,
            //     GOBACK.COUNTRIES,
            //     GOBACK.CONTINENTREGIONS,
            //     GOBACK.CONTINENTS:
            //     goto('/');
            //     break;
            default:
                goto('/');
                break;
        }
    }
</script>

<div class={classesControlBody} aria-labelledby={labelledby}>
    <button type="button" class={classesButtonCenter} on:click={handleClick} title={`Return to ${GOBACK[returnTarget]}`}>
        <span class={classesScriptCenter}>◀</span>
    </button>
</div>
