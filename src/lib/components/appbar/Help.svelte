<script lang="ts">
    import { browser } from '$app/environment'
    import { popup } from '@skeletonlabs/skeleton';
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';

    let comboboxHelpValue: string;

    const popupComboboxHelp: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboboxHelp',
        placement: 'bottom',
        closeQuery: '.listbox-item'
    };

    if (browser) {
        comboboxHelpValue = localStorage.helpToolTips ?? 'false';
    }

	$: {
		if (browser) {
            if (typeof document !== 'undefined') {
                localStorage.setItem('helpToolTips', comboboxHelpValue);
            }
		}
	}
				
</script>

<button class="btn variant-filled w-32 justify-between" use:popup={popupComboboxHelp}>
	<span class="capitalize">Help</span>
	<span>↓</span>
</button>

<div class="card w-48 shadow-xl py-2" data-popup="popupComboboxHelp">

    <div class="content-center flex justify-between px-2 pb-1">
        <div class="pl-2">Show Tooltips</div><!-- toggle hide instead of show -->
        <SlideToggle name="medium" size="sm" />
    </div>

    <hr>

    <slot />

</div>
