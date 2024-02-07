<script lang="ts">
    export let urls: string[];
    export let elemCarousel: HTMLDivElement;
    export let imageIndex: number = 0;
    //$: console.log(urls);

    function carouselThumbnail(index: number) {

        imageIndex = index;
        elemCarousel.scroll(elemCarousel.clientWidth * index, 0);

        /*
         * TODO: use this to remove long range scrolls.
         * Just support smooth on single foward-back moves
         *
         * Ideal would be a smooth transition from current
         * to new while skipping those in between
         * 
        // Change scroll behavior
        elemCarousel.setAttribute("style", "scroll-behavior: auto;");

        // Timeout ensures styles are applied before scrolling
        setTimeout(function () {
            elemCarousel.scroll(elemCarousel.clientWidth * index, 0);
            //window.scrollBy(0, -2000);

            // Reset to CSS defaults.
            //elemCarousel.removeAttribute("style");
            elemCarousel.setAttribute("style", "scroll-behavior: smooth;");

        }, 0)
        
        */

    }

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
            hover:cursor-grab
            active:hover:cursor-grabbing"
        style:background-image="url('{url}')"
        on:click={() => carouselThumbnail(i)}
    >
        &nbsp;
    </button>
{/each}
