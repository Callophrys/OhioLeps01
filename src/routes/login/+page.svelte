<script lang="ts">
  import { enhance } from '$app/forms'

  //export let data
  //export let form
  
</script>

<h1>log in</h1>

<div class="container w-60">
    <form method="POST">
		<input type="text" name="user" required />
		<input type="password" name="password" required />
        <button>log in</button>
    </form>
</div>