<script lang="ts">
    import * as config from '$lib/config';
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
    import GA1858 from '$lib/assets/gallery/DSCF1858.jpg';
    import GA2164 from '$lib/assets/gallery/DSCF2164.jpg';
    import GA5084 from '$lib/assets/gallery/DSCF5084.jpg';
    import GA5323 from '$lib/assets/gallery/DSCF5323.jpg';
    import GA5443 from '$lib/assets/gallery/DSCF5443.jpg';
    import GA5472 from '$lib/assets/gallery/DSCF5472.jpg';
    import GA5473 from '$lib/assets/gallery/DSCF5473.jpg';
    import GA5521 from '$lib/assets/gallery/DSCF5521.jpg';
    import GA5527 from '$lib/assets/gallery/DSCF5527.jpg';

    $: heightAdjust = (config.showAppBar ? 128 : 0) + (config.showFooter ? 16 : 0);
    let imageIndex: number;

    let elemCarousel: HTMLDivElement;
    const unsplashIds = [GA0994, GA1819, GA1898, GA1972, GA1997, GA2546, GA5402, GA5439, GA5465, GA5469, GA5552, GA5887, GA5890, GA6506, GA6727, GA6983, GA8126, GA9144, GA9151, GA9335, GA1858, GA2164, GA5084, GA5323, GA5443, GA5472, GA5473, GA5521, GA5527];
    //console.log(unsplashIds);

    let startX: number;
    let startSliderLeft: number;
    let draggedBy: number;
    let slider: HTMLDivElement;
    let dragging = false;

    function start(e: any) {
        console.log(e);
        dragging = true;
        startSliderLeft = slider.scrollLeft; // - slider.offsetLeft;
        startX = e.pageX;
        console.log('start x', e.pageX, 'slider.scrollLeft', slider.scrollLeft, 'slider.offsetLeft', slider.offsetLeft);
    }

    function stop(e: any) {
        console.log('start x', startX, 'stop x', e.pageX, 'slider.scrollLeft', slider.scrollLeft, 'moved', startX - e.pageX, 'movementX', e.movementX);
        dragging = false;
    }

    function moveComponent(e: any) {
        if (dragging) {
            e.preventDefault();
            console.log('moved to', e.pageX, 'movementX', e.movementX, 'slider.scrollLeft', slider.scrollLeft, 'delta', e.pageX - startX);
            setTimeout(() => {
                slider.scrollLeft = startSliderLeft - (e.pageX - startX);
            }, 0);
        }
    }
</script>

<div class="h-[calc(100%_-_144px)] p-4 mb-2 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
    <Display bind:elemCarousel bind:imageIndex urls={unsplashIds} />
</div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="image-scrollbar" bind:this={slider} class="card h-36 p-4 flex gap-4 scroll-smooth overflow-x-auto overflow-y-hidden hover:cursor-grab active:hover:cursor-grabbing" on:mouseup={stop} on:mouseleave={stop} on:mousemove={moveComponent} on:mousedown={start}>
    <Scrollbar bind:elemCarousel bind:imageIndex urls={unsplashIds} />
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
