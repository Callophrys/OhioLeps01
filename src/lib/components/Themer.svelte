<script lang="ts">
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem, LightSwitch } from '@skeletonlabs/skeleton';
			
    import { browser } from '$app/environment'
	$: {
		if (browser) { //&& typeof document !== 'undefined') {
            if (typeof document !== 'undefined') {
                console.log('comboboxvalue:', comboboxValue, " data-theme is", document.documentElement.getAttribute('data-theme'));
                document.body.setAttribute('data-theme', comboboxValue);
            }
		}
	}

    let comboboxValue: string;

    const popupCombobox: PopupSettings = {
        event: 'focus-click',
        target: 'popupCombobox',
        placement: 'bottom',
        closeQuery: '.listbox-item'
    };
				
</script>

<button class="btn variant-filled w-36 justify-between" use:popup={popupCombobox}>
	<span class="capitalize">{comboboxValue ?? 'Trigger'}</span>
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
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>
