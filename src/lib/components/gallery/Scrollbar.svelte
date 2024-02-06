<script lang="ts">
    import { carouselThumbnail } from './carousel';
    export let urls: string[];
    export let elemCarousel: HTMLDivElement;
    //$: console.log(urls);
    
</script>

{#each urls as url, i}
    <button
        type="button"
        class="size-24
            min-w-24
            bg-center
            bg-cover
            bg-no-repeat
            bg-transparent
            active:hover:cursor-grab"
        style:background-image="url('{url}')"
        on:click={() => carouselThumbnail(elemCarousel, i)}>&nbsp;</button
    >
{/each}
