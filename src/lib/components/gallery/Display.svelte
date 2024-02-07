<script lang="ts">
    export let urls: string[];
    export let elemCarousel: HTMLDivElement;
    export let imageIndex: number = 0;

    //console.log(urls);

    function carouselLeft(): void {
        const x =
            elemCarousel.scrollLeft === 0
                ? elemCarousel.clientWidth * elemCarousel.childElementCount // loop to last
                : elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
        elemCarousel.scroll(x, 0);
    }

    function carouselRight(): void {
        const x =
            elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
                ? 0 // loop to first
                : elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
        elemCarousel.scroll(x, 0);
    }


    /*
	function dragMe(node) {
		 let moving = false;
		 let left = 300;
		 let top = 100;

		 node.style.position = 'absolute';
		 node.style.top = `${top}px`;
		 node.style.left = `${left}px`;
		 node.style.cursor = 'move';
		 node.style.userSelect = 'none';

		 node.addEventListener('mousedown', () => {
			 moving = true;
		 });
		 
		window.addEventListener('mousemove', (e) => {
			  if (moving) {
					 left += e.movementX;
					 top += e.movementY;
					 node.style.top = `${top}px`;
					 node.style.left = `${left}px`;
				}
		 });
		
		 window.addEventListener('mouseup', () => {
			 moving = false;
		 });
	
         return { destroy() {

         }}
	}
    */

    let zoom = 1;
    const ZOOM_SPEED = 0.1;

    function handleMouseDown(e: MouseEvent) {}

    function wheelMouseDown (e: any) {
        if (e.shiftKey) {
            const imageTarget = elemCarousel.querySelectorAll('img')[imageIndex];

            /* Also set classList for img to contain zoom-pos or zoom-neg,
             * if missing then zoom-pos if not yet at max ELSE zoom-neg  */
            if (true /* over target image AND not yet at some max size */) {
                (imageTarget as HTMLElement).style.transform = `scale(${(zoom += ZOOM_SPEED)})`;
            } else if (true /* over target image AND still above min size */) {
                (imageTarget as HTMLElement).style.transform = `scale(${(zoom -= ZOOM_SPEED)})`;
            }
        }
    };

    function wheelZoom (e: any) {
        debugger;
        e.preventDefault();
        const imageTarget = elemCarousel.querySelectorAll('img')[imageIndex];
        console.log(imageTarget);

        if (e.deltaY > 0) {
            (imageTarget as HTMLElement).style.transform = `scale(${(zoom -= ZOOM_SPEED)})`;
        } else {
            (imageTarget as HTMLElement).style.transform = `scale(${(zoom += ZOOM_SPEED)})`;
        }
    };
</script>

<button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
    <span class="mr-1">◀</span>
</button>

<div bind:this={elemCarousel} on:wheel={wheelZoom} class="image-box h-full snap-x snap-mandatory scroll-smooth flex overflow-x-auto overflow-y-hidden hover:cursor-zoom-in">
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
