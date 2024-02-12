<script lang="ts">
    import type { CssClasses } from '@skeletonlabs/skeleton';
    //import LEP01 from '$lib/assets/lep01.svg';
    export let urls: string[];
    export let elemCarousel: HTMLDivElement;
    export let imageIndex: number = 0;

    //console.log(urls);

    enum ZOOM_DIR {
        SHRINK = -1,
        ENLARGE = 1,
    }

    const ZOOMCURSORIN = 'hover:cursor-zoom-in'; // '-'
    const ZOOMCURSOROUT = 'hover:cursor-zoom-out'; // '+'
    const ZOOM_BY_WHEEL_SPEED = 0.1;
    const ZOOM_BY_CLICK_SPEED = 0.5;

    const cBaseCarousel = 'image-box bg-surface-300 dark:bg-surface-700 h-full min-h-full snap-x snap-mandatory scroll-smooth flex overflow-x-auto overflow-y-hidden active:cursor-grab active:hover:cursor-grab';
    let clickZoomDirection = ZOOM_DIR.ENLARGE;
    let zoom = 1;
    let zoomingCursor: CssClasses = ZOOMCURSORIN;

    $: classesCarousel = `${cBaseCarousel} ${zoomingCursor}`;

    function carouselLeft() {
        const x =
            elemCarousel.scrollLeft === 0
                ? elemCarousel.clientWidth * elemCarousel.childElementCount // loop to last
                : elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
        elemCarousel.scroll(x, 0);
    }

    function carouselRight() {
        const x =
            elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
                ? 0 // loop to first
                : elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
        elemCarousel.scroll(x, 0);
    }

    function isDoubled(img: HTMLImageElement) {
        return img.naturalWidth >= (2 * img.width * 19) / 20 || img.naturalHeight >= (2 * img.height * 19) / 20;
    }

    function isHalved(img: HTMLImageElement) {
        return img.naturalWidth <= elemCarousel.clientWidth && img.naturalHeight <= elemCarousel.clientHeight;
    }

    function mouseDown(e: any) {
    }

    function wheelZoom (e: any) {
        //debugger;
        e.preventDefault();
        const imageTarget = elemCarousel.querySelectorAll('img')[imageIndex];
        console.log(imageTarget);

        if (e.deltaY > 0) {
            (imageTarget as HTMLElement).style.transform = `scale(${(zoom -= ZOOM_BY_WHEEL_SPEED)})`;
            if (isHalved(imageTarget)) {
                zoomingCursor = ZOOMCURSORIN;
            }
        } else {
            (imageTarget as HTMLElement).style.transform = `scale(${(zoom += ZOOM_BY_WHEEL_SPEED)})`;
            if (isDoubled(imageTarget)) {
                zoomingCursor = ZOOMCURSOROUT;
            }
        }
    }

    function clickZoom(e: any) {
        //debugger;
        e.preventDefault();
        const imageTarget = elemCarousel.querySelectorAll('img')[imageIndex];
        if (clickZoomDirection === ZOOM_DIR.SHRINK) {
            zoom -= ZOOM_BY_CLICK_SPEED;

            let minX = Math.min(elemCarousel.clientWidth / 2, imageTarget.naturalWidth);
            let minY = Math.min(elemCarousel.clientHeight / 2, imageTarget.naturalHeight);

            if (imageTarget.naturalWidth * zoom <= minX && imageTarget.height * zoom <= minY) {
                // shrink to min of 1/2 pane or orig sizes
                zoom = Math.max(minX / elemCarousel.clientWidth, minY / elemCarousel.clientHeight);
                clickZoomDirection = ZOOM_DIR.ENLARGE;
                zoomingCursor = ZOOMCURSORIN;
            } else {
                zoomingCursor = ZOOMCURSOROUT;
            }
        } else {
            zoom += ZOOM_BY_CLICK_SPEED;

            if (imageTarget.naturalHeight * 2 <= elemCarousel.clientHeight && imageTarget.naturalWidth * 2 <= elemCarousel.clientWidth) {
                /* Zoom to max of pane dims when 2 * w or h are still both smaller than pane */

                if (imageTarget.naturalHeight * zoom >= elemCarousel.clientHeight || imageTarget.naturalWidth * zoom >= elemCarousel.clientWidth) {
                    // Maxed so expand to pane dims and no more, and reverse
                    // TODO maybe check a condition and set zoom to precisely 1 when that is the limit
                    zoom = Math.min((imageTarget.naturalWidth * zoom) / elemCarousel.clientWidth, (imageTarget.naturalHeight * zoom) / elemCarousel.clientHeight);
                    clickZoomDirection = ZOOM_DIR.SHRINK;
                    zoomingCursor = ZOOMCURSOROUT;
                } else {
                    // expand per new zoom
                    zoomingCursor = ZOOMCURSORIN;
                }
            } else {
                /* Zoom to larger of 2 * w or h and 2 times pane dims */

                let maxX = Math.min(elemCarousel.clientWidth * 2, imageTarget.naturalWidth * 2);
                let maxY = Math.min(elemCarousel.clientHeight * 2, imageTarget.naturalHeight * 2);

                if (imageTarget.naturalWidth * zoom >= (maxX * 19) / 20 || imageTarget.naturalHeight * zoom >= (maxY * 19) / 20) {
                    // Maxed so expand to max of 2 * images dims or 2 * pane dims and no more, and reverse
                    // TODO maybe check a condition and set zoom to precisely 2 when that is the limit
                    zoom = Math.max(imageTarget.naturalWidth / maxX, imageTarget.naturalHeight / maxY);
                    clickZoomDirection = ZOOM_DIR.SHRINK;
                    zoomingCursor = ZOOMCURSOROUT;
                } else {
                    zoomingCursor = ZOOMCURSORIN;
                }
            }
        }

        (imageTarget as HTMLElement).style.transform = `scale(${zoom})`;
    }
</script>

<button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
    <span class="mr-1">◀</span>
</button>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div bind:this={elemCarousel} on:wheel={wheelZoom} on:click={clickZoom} class={classesCarousel} >
    {#each urls as url, i}
        <img class="snap-center object-cover min-w-full rounded-container-token" src={url} alt={url} loading="lazy" />
    {/each}
</div>

<button type="button" class="btn-icon variant-filled" on:click={carouselRight}>
    <span class="ml-1">▶</span>
</button>

<style>
    img {
        height: inherit;
    }
</style>
