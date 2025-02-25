<script lang="ts">
    import Container from "$lib/components/layouts/Container.svelte";
    import FlexContainer from "$lib/components/FlexContainer.svelte";
    /*-- Imports */
    /*-- -- Data -- */
    /*-- Exports */
    /*-- Context */
    /*-- -- Styling -- */
    /*-- Properties (styles) */
    /*-- Constants (styles) */
    /*-- Variables (styles) */
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
</script>

{#snippet leftPane()}
    <Container outerBodyClasses="px-0" />
{/snippet}

{#snippet centerPane()}
    <Container outerBodyClasses="px-0" />
{/snippet}

<FlexContainer {leftPane} {centerPane} />
