<script lang="ts">
    import DataEntryLogs from "$lib/components/admin/DataEntryLogs.svelte";
    import { getContext, setContext } from "svelte";

    let { data } = $props();
    setContext("auditLog", data.auditLog);
</script>

<DataEntryLogs />
