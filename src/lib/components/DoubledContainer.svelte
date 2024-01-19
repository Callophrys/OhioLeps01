<script lang="ts">
    export let basisLeft = 'basis-1/2';
    export let basisRight = 'basis-1/2';
</script>

<div class="container p-8 flex flex-row gap-8 h-[calc(100vh_-_128px)]">
    <div class="card p-4 {basisLeft} space-y-2 h-full overflow-y-auto">
        <slot name="left" />
    </div>
    <div class="card p-4 {basisRight} h-full overflow-y-auto">
        <slot name="right" />
    </div>
</div>
