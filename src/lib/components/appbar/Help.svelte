<script lang="ts">
    import { popup } from '@skeletonlabs/skeleton';
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let comboboxHelpValue: string;

    const popupComboboxHelp: PopupSettings = {
        event: 'focus-click',
        target: 'popupComboboxHelp',
        placement: 'bottom',
        closeQuery: '.listbox-item',
    };

    onMount(() => {
        comboboxHelpValue = localStorage.helpToolTips ?? 'false';
    });

    $: if (browser && comboboxHelpValue) localStorage.setItem('helpToolTips', comboboxHelpValue);
</script>

<button class="btn variant-filled w-32 justify-between" use:popup={popupComboboxHelp}>
    <span class="capitalize">Help</span>
    <span>↓</span>
</button>

<div data-popup="popupComboboxHelp">
    <div class="card w-48 shadow-xl py-2">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="content flex justify-between px-2 pb-1">
            <span class="my-auto pl-2">Show Tooltips</span>
            <!-- toggle hide instead of show -->
            <SlideToggle name="medium" size="sm" />
        </label>

        <hr />

        <nav class="list-nav">
            <ul class="">
                <li>
                    <a href="https://tailwindcss.com/docs/container" target="_blank" class="hover:rounded-none">TailwindCSS</a>
                </li>
                <li>
                    <a href="https://www.skeleton.dev/elements/forms" target="_blank" class="hover:rounded-none">SkeletonUI</a>
                </li>
                <li class="">
                    <a href="https://svelte.dev/docs/introduction" target="_blank" class="hover:rounded-none">Svelte</a>
                </li>
                <li>
                    <a href="https://kit.svelte.dev/docs/introduction" target="_blank" class="hover:rounded-none">SvelteKit</a>
                </li>
                <li>
                    <a href="https://www.compart.com/en/unicode/block/U+2190" target="_blank" class="hover:rounded-none">Icons - Arrows</a>
                </li>
                <li>
                    <a href="https://www.compart.com/en/unicode/block/U+2700" target="_blank" class="hover:rounded-none">Icons - Dingbats</a>
                </li>
                <li>
                    <a href="https://www.compart.com/en/unicode/block/U+1F300" target="_blank" class="hover:rounded-none">Icons - Pics &amp; Symbols</a>
                </li>
                <li>
                    <a href="https://www.degraeve.com/reference/specialcharacters.php" target="_blank" class="hover:rounded-none">HTML special characters</a>
                </li>
                <li>
                    <a href="https://www.prisma.io/docs/orm/prisma-schema/data-model/models" target="_blank" class="hover:rounded-none">Prisma</a>
                </li>
                <li>
                    <a href="https://github.com/Callophrys/OhioLeps01" target="_blank" class="hover:rounded-none">Source repo</a>
                </li>
            </ul>
        </nav>
    </div>
</div>
