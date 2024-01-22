<script lang="ts">
    import { showFooter } from '$lib/config';
    export let basisLeft = 'basis-1/2';
    export let basisRight = 'basis-1/2';
    let configclass = showFooter ?
        "container flex flex-row gap-8 h-[calc(100vh_-_148px)] px-8 pt-8 pb-4" :
        "container flex flex-row gap-8 h-[calc(100vh_-_132px)] p-8"; //should be 144 (with footer) or 128
</script>

<div class={configclass} >

    <div class="card py-4 pl-4 {basisLeft} h-full flex flex-col space-y-2">
        <div class="pr-4">
            <slot name="left-head" />
        </div>
        <div class="space-y-2 h-full overflow-y-auto">
            <slot name="left" />
        </div>
    </div>

    <div class="card py-4 pl-4 {basisRight} h-full flex flex-col space-y-2">
        <div class="pr-4">
            <slot name="right-head" />
        </div>
        <div class="space-y-2 h-full overflow-y-auto">
            <slot name="right" />
        </div>
    </div>

</div>
