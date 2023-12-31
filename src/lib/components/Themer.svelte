<script lang="ts">
    import { browser } from '$app/environment'
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem, LightSwitch } from '@skeletonlabs/skeleton';

    let comboboxValue: string;

    const popupCombobox: PopupSettings = {
        event: 'focus-click',
        target: 'popupCombobox',
        placement: 'bottom',
        closeQuery: '.listbox-item'
    };

    if (browser) {
        comboboxValue = localStorage.themeName ?? 'rocket';
    }

	$: {
		if (browser) { //&& typeof document !== 'undefined') {
            if (typeof document !== 'undefined') {
                console.log('comboboxvalue:', comboboxValue, " data-theme is", document.documentElement.getAttribute('data-theme'));
                document.body.setAttribute('data-theme', comboboxValue);
                localStorage.setItem('themeName', comboboxValue);
            }
		}
	}
				
</script>

<button class="btn variant-filled w-36 justify-between" use:popup={popupCombobox}>
	<span class="capitalize">Theme</span>
	<span>↓</span>
</button>

<div class="card w-36 shadow-xl py-2" data-popup="popupCombobox">
    <div class="content-center flex justify-between px-2 pb-1">
        <div>Mode</div>
        <LightSwitch />
    </div>
    <hr>
	<ListBox rounded="rounded-none">
		<ListBoxItem bind:group={comboboxValue} name="medium" value="skeleton">Skeleton</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="medium" value="rocket">Rocket</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="medium" value="modern">Modern</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="medium" value="crimson">Crimson</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="medium" value="wintry">Wintry</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="medium" value="seafoam">Seafoom</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="medium" value="vintage">Vintage</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="medium" value="sahara">Sahara</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="medium" value="hamlindigo">Hamlindigo</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="medium" value="gold-nouveau">Gold Nouveau</ListBoxItem>
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>
