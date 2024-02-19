<script lang="ts">
    export let urls: string[];
    export let elemCarousel: HTMLDivElement;
    export let imageIndex: number = 0;

    const scrollPaneClasses = 'card h-36 p-4 flex gap-4 scroll-smooth overflow-x-auto overflow-y-hidden hover:cursor-grab active:hover:cursor-grabbing';

    let startX: number;
    let startSliderLeft: number;
    let slider: HTMLDivElement;
    let dragging = false;

    function carouselThumbnail(index: number) {
        if (!dragging) {
            imageIndex = index;
            elemCarousel.scroll(elemCarousel.clientWidth * index, 0);
            console.log('Index:', imageIndex, 'image:', urls[imageIndex]);
        }
    }

    function start(e: any) {
        console.log(e);
        dragging = true;
        startSliderLeft = slider.scrollLeft; // - slider.offsetLeft;
        startX = e.pageX;
        //console.log('mousedown -> startX', e.pageX, 'slider.scrollLeft', slider.scrollLeft, 'slider.offsetLeft', slider.offsetLeft);
    }

    function stop(e: any) {
        //console.log('mouseup -> startX', startX, 'stop x', e.pageX, 'slider.scrollLeft', slider.scrollLeft, 'moved', startX - e.pageX, 'movementX', e.movementX);
        dragging = false;
    }

    function moveComponent(e: any) {
        if (dragging) {
            e.preventDefault();
            //console.log('mousemove -> startX', e.pageX, 'movementX', e.movementX, 'slider.scrollLeft', slider.scrollLeft, 'delta', e.pageX - startX);
            setTimeout(() => {
                slider.scrollLeft = startSliderLeft - (e.pageX - startX);
            }, 0);
        }
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="image-scrollbar" bind:this={slider} draggable="true" class={scrollPaneClasses} on:mouseup={stop} on:mouseleave={stop} on:mousemove={moveComponent} on:mousedown={start} on:load={() => (imageIndex = 0)}>
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
            on:click={() => carouselThumbnail(i)}>
            &nbsp;
        </button>
    {/each}
</div>
