<script lang="ts">
  import UsersExcl from "./internal/UsersExcl.svelte";
  import UsersIncl from "./internal/UsersIncl.svelte";
  import { loadUserSets } from "$lib/alt/internal/SiteUserMethods";
  import { getContext } from "svelte";

  const context = getContext("usersContext");
  console.log("SiteUsers usersContext", context);

  $effect(() => {
    (async () => {
      await loadUserSets(context);
    })();
  });
</script>

<UsersExcl />

<UsersIncl />
