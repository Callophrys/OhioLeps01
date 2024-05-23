<script lang="ts">
    import { page } from '$app/stores';

    interface Configs {
        showHeader: boolean;
        showFooter: boolean;
    }

    let { showHeader = true, showFooter = false }: Configs = $props();

    showHeader = $page.data.config.showHeader;
    showFooter = $page.data.config.showFooter;
</script>
