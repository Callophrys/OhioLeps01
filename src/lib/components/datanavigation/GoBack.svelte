<script lang="ts">
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import { GOTYPE } from '$lib/types';
    import { goto } from '$app/navigation';

    let {
        targetId = $bindable(),
        targetType = $bindable(),
        targetIdSecondary = $bindable(),
        controlBody = '',
        buttonCenter = '',
        scriptCenter = '',
        labelledby = 'Select site-date',
    }: {
        targetId: number;
        targetType: GOTYPE;
        targetIdSecondary: number | null;
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
    const cScriptCenter = 'w-full my-auto text-center truncate overflow-hidden text-ellipsis';

    /*-- Reactives (styles) */
    let classesControlBody = $derived(`${cControlBody} ${controlBody}`); // ${$$props.class ?? ''}`);
    let classesButtonCenter = $derived(`${cButtonCenter} ${buttonCenter}`); // ${$$props.class ?? ''}`);
    let classesScriptCenter = $derived(`${cScriptCenter} ${scriptCenter}`); // ${$$props.class ?? ''}`);

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
    <button type="button" class={classesButtonCenter} onclick={handleClick} title={`Return to ${GOTYPE[targetType]}`} disabled={targetType === GOTYPE.UNKNOWN} aria-labelledby={labelledby}>
        <span class={classesScriptCenter}>◀</span>
    </button>
</div>
