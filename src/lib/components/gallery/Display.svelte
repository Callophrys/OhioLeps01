<script lang="ts">
    import * as carousel from './carousel';
    import { onMount } from 'svelte';
    export let urls: string[];
    export let elemCarousel: HTMLDivElement;
    export let imageIndex: number = 0;

    $: console.log(urls);

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

    const display: { zoomElement: HTMLElement | null } = { zoomElement: null };
    let zoom = 1;
    const ZOOM_SPEED = 0.1;

    function handleMouseDown(e: MouseEvent) {}

    onMount(() => {
        display.zoomElement = document.querySelector('.image-box') as HTMLElement;

        display.zoomElement.addEventListener('mousedown', function (e) {
            if (e.shiftKey) {
                const target = e.target as HTMLElement;
                const imageTarget = target.tagName === 'IMG' ? target : display.zoomElement?.querySelectorAll('img:target')[imageIndex];

                /* Also set classList for img to contain zoom-pos or zoom-neg,
                 * if missing then zoom-pos if not yet at max ELSE zoom-neg  */
                if (true /* over target image AND not yet at some max size */) {
                    (imageTarget as HTMLElement).style.transform = `scale(${(zoom += ZOOM_SPEED)})`;
                } else if (true /* over target image AND still above min size */) {
                    (imageTarget as HTMLElement).style.transform = `scale(${(zoom -= ZOOM_SPEED)})`;
                }
            }
        });

        display.zoomElement.addEventListener('wheel', function (e) {
            debugger;
            e.preventDefault();

            const target = e.target as HTMLElement;
            const imageTarget = target.tagName === 'IMG' ? target : display.zoomElement?.querySelectorAll('img:target')[imageIndex];
            console.log(imageTarget);

            if (e.deltaY > 0) {
                (imageTarget as HTMLElement).style.transform = `scale(${(zoom += ZOOM_SPEED)})`;
            } else {
                (imageTarget as HTMLElement).style.transform = `scale(${(zoom -= ZOOM_SPEED)})`;
            }
        });
    });
</script>

<button type="button" class="btn-icon variant-filled" on:click={() => carousel.carouselLeft(elemCarousel)}>
    <span class="mr-1">◀</span>
</button>

<div bind:this={elemCarousel} class="image-box h-full snap-x snap-mandatory scroll-smooth flex overflow-x-auto overflow-y-hidden hover:cursor-zoom-in">
    {#each urls as url, i}
        <img class="snap-center object-cover min-w-full rounded-container-token" src={url} alt={url} loading="lazy" />
    {/each}
</div>

<button type="button" class="btn-icon variant-filled" on:click={() => carousel.carouselRight(elemCarousel)}>
    <span class="ml-1">▶</span>
</button>

<style>
    img {
        height: inherit;
    }
</style>
