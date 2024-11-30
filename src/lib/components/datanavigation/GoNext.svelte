<script lang="ts">
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import { GOTYPE } from '$lib/types';
    import { goto } from '$app/navigation';

    let {
        targetId,
        targetType,
        targetIdSecondary = -1,
        controlDisabled = false,
        controlBody = '',
        buttonCenter = '',
        scriptCenter = '',
        labelledby = 'Go toward data',
    }: {
        targetId: number;
        targetType: GOTYPE;
        targetIdSecondary: number;
        controlDisabled: boolean;
        controlBody: CssClasses;
        buttonCenter: CssClasses;
        scriptCenter: CssClasses;
        labelledby: string;
    } = $props();

    /*-- -- Styling -- */
    /*-- Properties (styles) */

    // Properties (a11y)
    /** Provide the ARIA labelledby value.  Default: "Select site-date" */

    /*-- Constants (styles) */
    const cControlBody = 'btn-group w-fit variant-soft my-auto';
    const cButtonCenter = '';
    const cScriptCenter = "w-full my-auto text-center truncate overflow-hidden text-ellipsis before:content-['▶']";

    /*-- Reactives (styles) */
    let classesControlBody = $derived(`${cControlBody} ${controlBody}`);
    let classesButtonCenter = $derived(`${cButtonCenter} ${buttonCenter}`);
    let classesScriptCenter = $derived(`${cScriptCenter} ${scriptCenter}`);

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

<div class={classesControlBody}>
    <button type="button" class={classesButtonCenter} onclick={handleClick} title={`Proceed to ${GOTYPE[targetType]}`} disabled={controlDisabled || targetType === GOTYPE.UNKNOWN} aria-labelledby={labelledby}>
        <span class={classesScriptCenter}></span>
    </button>
</div>
