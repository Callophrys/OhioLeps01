<script lang="ts">
    import '../app.css';
	import * as config from '$lib/config'
</script>

<!-- Header -->
<div>Header block - {config.title}
    <span>{new Intl.DateTimeFormat('en-US').format(Date.now())}</span>
</div>

<!-- Body -->
<main>
    <slot />
</main>

<!-- Footer -->
<footer class="flex flex-col justify-between min-h-screen border-t border-solid border-t-slate-400 text-center"><p class="text-xs">{config.title} &copy;{new Date().getFullYear()}</p></footer>