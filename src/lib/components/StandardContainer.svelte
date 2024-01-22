<script lang="ts">
    import { showFooter } from '$lib/config';
    let configclass = showFooter
        ? 'flex flex-col space-y-2 h-[calc(100vh_-_148px)] px-8 pt-8 pb-4'
        : 'flex flex-col space-y-2 h-[calc(100vh_-_132px)] p-8'; //should be 144 (with footer) or 128
</script>

<div class={configclass}>
    <div class="card py-4 pl-4 h-full flex flex-col space-y-2">
        <div class="pr-4">
            <slot name="standard-head" />
        </div>
        <div class="space-y-2 h-full overflow-y-auto">
            <slot name="standard-content" />
        </div>
        <div class="pr-4">
            <slot name="standard-tail" />
        </div>
    </div>
</div>
