<script lang="ts">
    let {
        year = $bindable(-1),
        week = $bindable(-1),
        sdoCount = $bindable(0),
    }: {
        year: number;
        week: number | null;
        sdoCount: number;
    } = $props();
</script>

<div class="flex flex-row space-x-2 text-sm fixed top-[102px] pl-10">
    Year: {year}&nbsp;&nbsp;Week: {week}&nbsp;&nbsp;Distinct Species: {sdoCount}
</div>
