<script lang="ts">
    let {
        year = $bindable(),
        week = $bindable(),
        sdoCount = $bindable(),
    }: {
        year: number;
        week: number | null;
        sdoCount: number;
    } = $props();
</script>

<div class="flex flex-row space-x-2 text-sm fixed top-[102px] pl-10">
    Year: {year}&nbsp;&nbsp;Week: {week}&nbsp;&nbsp;Distinct Species: {sdoCount}
</div>
