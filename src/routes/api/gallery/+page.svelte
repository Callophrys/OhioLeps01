<script lang="ts">
    import * as config from '$lib/config';
    import type { CssClasses } from '@skeletonlabs/skeleton';
    import Display from '$lib/components/gallery/Display.svelte';
    import Scrollbar from '$lib/components/gallery/Scrollbar.svelte';
    import GA0994 from '$lib/assets/gallery/DSCF0994.jpg';
    import GA1819 from '$lib/assets/gallery/DSCF1819.jpg';
    import GA1898 from '$lib/assets/gallery/DSCF1898.jpg';
    import GA1972 from '$lib/assets/gallery/DSCF1972.jpg';
    import GA1997 from '$lib/assets/gallery/DSCF1997.jpg';
    import GA2546 from '$lib/assets/gallery/DSCF2546.jpg';
    import GA5402 from '$lib/assets/gallery/DSCF5402.jpg';
    import GA5439 from '$lib/assets/gallery/DSCF5439.jpg';
    import GA5465 from '$lib/assets/gallery/DSCF5465.jpg';
    import GA5469 from '$lib/assets/gallery/DSCF5469.jpg';
    import GA5552 from '$lib/assets/gallery/DSCF5552.jpg';
    import GA5887 from '$lib/assets/gallery/DSCF5887.jpg';
    import GA5890 from '$lib/assets/gallery/DSCF5890.jpg';
    import GA6506 from '$lib/assets/gallery/DSCF6506.jpg';
    import GA6727 from '$lib/assets/gallery/DSCF6727.jpg';
    import GA6983 from '$lib/assets/gallery/DSCF6983.jpg';
    import GA8126 from '$lib/assets/gallery/DSCF8126.jpg';
    import GA9144 from '$lib/assets/gallery/DSCF9144.jpg';
    import GA9151 from '$lib/assets/gallery/DSCF9151.jpg';
    import GA9335 from '$lib/assets/gallery/DSCF9335.jpg';
    import { onMount } from 'svelte';
    import { slide } from 'svelte/transition';

    let elemCarousel: HTMLDivElement;
    const unsplashIds = [GA0994, GA1819, GA1898, GA1972, GA1997, GA2546, GA5402, GA5439, GA5465, GA5469, GA5552, GA5887, GA5890, GA6506, GA6727, GA6983, GA8126, GA9144, GA9151, GA9335];
    console.log(unsplashIds);

    let isDown = false;
    let startX: number;
    let scrollLeft: number;


    /*
    onMount(() => {
        console.log('slider', slider);

        if (slider) {
            slider.addEventListener('mousedown', (e) => {
                console.log('md');
                console.log(e);
                isDown = true;
                slider.classList.add('active');
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });
            slider.addEventListener('mouseleave', () => {
                console.log('ml');
                isDown = false;
                slider.classList.remove('active');
            });
            slider.addEventListener('mouseup', () => {
                console.log('mu');
                isDown = false;
                slider.classList.remove('active');
            });
            slider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                //console.log('mm');
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 3; //scroll-fast
                slider.scrollLeft = scrollLeft - walk;
                console.log(walk);
            });
        }
    });
    */

    $: heightAdjust = (config.showAppBar ? 128 : 0) + (config.showFooter ? 16 : 0);

    // another try at draging the scrollbar

    let slider: HTMLElement | null;

    onMount(() => {
        slider = document.getElementById('image-scrollbar'); // as HTMLElement;
    });

        let dragging = false;

        function start() {
            console.log('start');
            dragging = true
        }

        function stop() {
            console.log('stop');
            dragging = false
        }

        function moveComponent(event: any) {
            if ( dragging && slider ) {
                console.log('moveComponent');
                event.preventDefault();
                slider.scrollLeft = scrollLeft - event.movementX;
            }
        }
</script>

<div class="h-[calc(100%_-_144px)] p-4 mb-2 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
    <Display bind:elemCarousel urls={unsplashIds} />
</div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    id="image-scrollbar"
    class="card h-36 p-4 flex gap-4 scroll-smooth overflow-x-auto overflow-y-hidden"
    on:mouseup={stop}
    on:mousemove={moveComponent}
    on:mousedown={start} >
    <Scrollbar bind:elemCarousel urls={unsplashIds} />
</div>

<!--div style="height: calc(100% - {heightAdjust});" class="gallery h-[calc(100%_-_{heightAdjust}px)] p-8">
    </div-->
<!--div class="h-svh">
</div-->

<!--style>
    .gallery {
        height: calc(100% - 128px);
    }
</style-->
