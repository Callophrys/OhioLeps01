<script lang="ts">
    /*-- Imports */
    /*-- -- Data -- */
    /*-- Exports */
    /*-- Context */
    /*-- -- Styling -- */
    /*-- Properties (styles) */
    /*-- Constants (styles) */
    /*-- Reactives (styles) */
    /*-- -- Coding -- */
    /*-- Enums */
    /*-- Constants (functional) */
    /*-- Properties (functional) */
    /*-- Variables and objects */
    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */
    /*-- Methods */
    /*-- Reactives (functional) */
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
        closeQuery: '.listbox-item',
    };

    let themes: string[] = ['skeleton', 'rocket', 'modern', 'crimson', 'wintry', 'seafoam', 'vintage', 'sahara', 'hamlindigo', 'gold-nouveau'];

    function setTheme(themeName: string) {
        document.body.setAttribute('data-theme', themeName);
        localStorage.setItem('themeName', themeName);
    }

    function handleClick(event: any) {
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
<button class="btn variant-filled w-32 justify-between" use:popup={popupCombobox}>
    <span class="capitalize">Theme</span>
    <span>↓</span>
</button>

<div data-popup="popupCombobox">
    <div class="card w-36 shadow-xl py-2">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="content-center flex justify-between px-2 pb-1">
            <span class="my-auto pl-2">Mode</span>
            <LightSwitch />
        </label>
        <hr />
        <ListBox rounded="rounded-none" class="capitalize">
            {#each themes as theme}
                <ListBoxItem bind:group={comboboxValue} name="medium" on:click={handleClick} value={theme}>{theme.replace('-', ' ')}</ListBoxItem>
            {/each}
        </ListBox>
    </div>
</div>
