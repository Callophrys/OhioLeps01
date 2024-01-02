<script>
	import { page } from '$app/stores'
</script>

<div class="error h-full grid place-content-center">
	<h1>{$page.status}: {$page.error?.message}</h1>
    <p>Uh oh...</p>
</div>
