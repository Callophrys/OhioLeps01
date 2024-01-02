<script lang="ts">
    import { browser } from '$app/environment'
    import { popup } from '@skeletonlabs/skeleton';
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

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
		if (browser) { //&& typeof document !== 'undefined') {
            if (typeof document !== 'undefined') {
                //console.log('comboboxvalue:', comboboxHelpValue, " data-theme is", document.documentElement.getAttribute('data-theme'));
                //document.body.setAttribute('data-theme', comboboxHelpValue);
                localStorage.setItem('helpToolTips', comboboxHelpValue);
            }
		}
	}
				
</script>

<button class="btn variant-filled w-36 justify-between" use:popup={popupComboboxHelp}>
	<span class="capitalize">Help</span>
	<span>↓</span>
</button>

<div class="card w-48 shadow-xl py-2" data-popup="popupComboboxHelp">
    <div class="content-center flex justify-between px-2 pb-1">
        <div class="pl-2">Show Tooltips</div><!-- toggle hide instead of show -->
        <SlideToggle name="medium" size="sm" />
    </div>
    <hr>
    <nav class="list-nav rounded-none">
    <ul class="rounded-none">
        <li class="rounded-none">
            <a href="/" class="rounded-none">Documents</a>
        </li>
        <li>
            <a href="/" class="">Other</a>
        </li>
        <li>
            <a href="/" class="">Other 2</a>
        </li>
    </ul>
    </nav>
    <!--
    <hr>
	<ListBox rounded="rounded-none">
		<ListBoxItem bind:group={comboboxHelpValue} name="medium" value="documents">Documents</ListBoxItem>
	</ListBox>
    -->
	<div class="arrow bg-surface-100-800-token" />
</div>
