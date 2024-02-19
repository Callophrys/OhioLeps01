<script lang="ts">
    import Display from '$lib/components/gallery/Display.svelte';
    import Scrollbar from '$lib/components/gallery/Scrollbar.svelte';

    export let data;
    $: unsplashIds = data.unsplashIds;

    let elemCarousel: HTMLDivElement;
    // TODO: try to remeber last subset index if known, else reset to 0
    let imageIndex: number = 0;
</script>

<Display bind:elemCarousel {imageIndex} urls={unsplashIds} />
<Scrollbar bind:elemCarousel {imageIndex} urls={unsplashIds} />
