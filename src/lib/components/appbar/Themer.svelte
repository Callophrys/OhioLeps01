<script lang="ts">
    /*-- Imports */
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { ListBox, ListBoxItem, LightSwitch, popup, setInitialClassState } from '@skeletonlabs/skeleton';

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
    let comboboxThemeValue: string = $state('');

    /*-- Variables and objects */
    const popupComboTheme: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboTheme',
        placement: 'bottom',
        closeQuery: '.listbox-item',
    };

    const themes: string[] = ['skeleton', 'rocket', 'modern', 'crimson', 'wintry', 'seafoam', 'vintage', 'sahara', 'hamlindigo', 'gold-nouveau'];

    /*-- Run first stuff */
    /*-- onMount, beforeUpdate, afterUpdate */
    /*-- Handlers */
    function handleClick(event: any) {
        if (event.currentTarget?.value) {
            setTheme(event.currentTarget.value);
        }
    }

    /*-- Methods */
    function setTheme(themeName: string) {
        document.body.setAttribute('data-theme', themeName);
        localStorage.setItem('themeName', themeName);
    }

    /*-- Reactives (functional) */
    $effect(() => {
        comboboxThemeValue = localStorage?.themeName ?? 'rocket';
        setTheme(comboboxThemeValue);
    });
</script>

<svelte:head>{@html '<script>(' + setInitialClassState.toString() + ')();</script>'}</svelte:head>
<button class="btn variant-filled w-32 justify-between" use:popup={popupComboTheme}>
    <span class="capitalize">Theme</span>
    <span>↓</span>
</button>

<div data-popup="popupComboTheme">
    <div class="card w-36 shadow-xl py-2">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="content-center flex justify-between px-2 pb-1">
            <span class="my-auto pl-2">Mode</span>
            <LightSwitch />
        </label>
        <hr />
        <ListBox rounded="rounded-none" class="capitalize">
            {#each themes as theme}
                <ListBoxItem bind:group={comboboxThemeValue} name="medium" on:click={handleClick} value={theme}>{theme.replace('-', ' ')}</ListBoxItem>
            {/each}
        </ListBox>
    </div>
</div>
