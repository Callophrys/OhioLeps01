<script lang="ts">
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import { GOTYPE } from '$lib/types';
    import { goto } from '$app/navigation';

    export let targetId: number;
    export let targetType: GOTYPE;
    export let targetIdSecondary: number = -1;
    export let controlDisabled: boolean = false;

    /*-- -- Styling -- */
    /*-- Properties (styles) */
    export let controlBody: CssClasses = '';
    export let buttonCenter: CssClasses = '';
    export let scriptCenter: CssClasses = '';

    // Properties (a11y)
    /** Provide the ARIA labelledby value.  Default: "Select site-date" */
    export let labelledby = 'Select site-date';

    /*-- Constants (styles) */
    const cControlBody = 'btn-group w-fit variant-soft my-auto';
    const cButtonCenter = '';
    const cScriptCenter = 'w-full my-auto text-center truncate overflow-hidden text-ellipsis';

    /*-- Reactives (styles) */
    $: classesControlBody = `${cControlBody} ${controlBody} ${$$props.class ?? ''}`;
    $: classesButtonCenter = `${cButtonCenter} ${buttonCenter} ${$$props.class ?? ''}`;
    $: classesScriptCenter = `${cScriptCenter} ${scriptCenter} ${$$props.class ?? ''}`;

    /*-- Handlers */
    function handleClick() {
        switch (targetType) {
            case GOTYPE.SITEDATEOBSERVATIONS:
                goto(`/api/sitedateobservations/${targetId}/${targetIdSecondary}`);
                break;
            case GOTYPE.SITEDATES:
                goto('/api/sitedates/' + targetId);
                break;
            case GOTYPE.SITES:
                goto('/api/sites/' + targetId);
                break;
            case GOTYPE.COUNTYSITES:
                goto('/api/countysites/' + targetId);
                break;
            case GOTYPE.COUNTIES:
                goto('/api/counties');
                break;
            // //TODO: TBD and implemented
            // case GOTYPE.STATEREGIONS,
            //     GOTYPE.STATES,
            //     GOTYPE.COUNTRYREGIONS,
            //     GOTYPE.COUNTRIES,
            //     GOTYPE.CONTINENTREGIONS,
            //     GOTYPE.CONTINENTS:
            //     goto('/');
            //     break;
            default:
                goto('/');
                break;
        }
    }
</script>

<div class={classesControlBody} aria-labelledby={labelledby}>
    <button type="button" class={classesButtonCenter} on:click={handleClick} title={`Proceed to ${GOTYPE[targetType]}`} disabled={controlDisabled || targetType === GOTYPE.UNKNOWN}>
        <span class={classesScriptCenter}>▶</span>
    </button>
</div>
