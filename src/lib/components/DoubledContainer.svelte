<div class="container p-8 grid grid-cols-2 gap-8 auto-rows-fr h-[calc(100vh_-_128px)]">
    <div class="card p-4 space-y-2 h-full overflow-y-auto">
        <slot name="left" />
    </div>
    <div class="card p-4 h-full overflow-y-auto">
        <slot name="right" />
    </div>
</div>
