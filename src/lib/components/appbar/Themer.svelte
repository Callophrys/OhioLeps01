<script lang="ts">
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem, LightSwitch } from '@skeletonlabs/skeleton';
    import { setInitialClassState } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';

    let comboboxValue: string;

    const popupCombobox: PopupSettings = {
        event: 'focus-click',
        target: 'popupCombobox',
        placement: 'bottom',
        closeQuery: '.listbox-item'
    };

    let themes: string[] = [
        "skeleton",
        "rocket",
        "modern",
        "crimson",
        "wintry",
        "seafoam",
        "vintage",
        "sahara",
        "hamlindigo",
        "gold-nouveau",
    ];

    function setTheme(themeName: string){
        document.body.setAttribute('data-theme', themeName);
        localStorage.setItem('themeName', themeName);
    }

    function handleClick(event: any){
        if (event.currentTarget?.value) {
            setTheme(event.currentTarget.value);
        }
    }

	onMount(() => {
        comboboxValue = localStorage?.themeName ?? 'rocket';
		setTheme(comboboxValue);
	});
</script>

<svelte:head>{@html '<script>(' + setInitialClassState.toString() + ')();</script>'}</svelte:head>
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
	<ListBox rounded="rounded-none" class="capitalize">
    {#each themes as theme}
		<ListBoxItem bind:group={comboboxValue} name="medium" on:click={handleClick} value={theme}>{theme.replace('-', ' ')}</ListBoxItem>
    {/each}
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>
