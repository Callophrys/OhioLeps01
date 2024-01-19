<div class="container p-8 flex flex-row gap-8 h-[calc(100vh_-_128px)]">
    <div class="card p-4 basis-1/2 space-y-2 h-full overflow-y-auto">
        <slot name="left" />
    </div>
    <div class="card p-4 basis-1/2 h-full overflow-y-auto">
        <slot name="right" />
    </div>
</div>
