<script lang="ts">
  import UsersExcl from "./internal/UsersExcl.svelte";
  import UsersIncl from "./internal/UsersIncl.svelte";
  import type { UserStateType } from "$lib/alt/internal/SiteUserMethods";
  import { UserState, fetchUserSet } from "$lib/alt/internal/SiteUserMethods";
  import { getContext } from "svelte";

  let { selectedSiteState } = $props();

  const usersExcl: any[] = $state({
    users: [],
    loadUserSets: loadUserSets,
  });

  const usersIncl: any[] = $state({
    users: [],
    loadUserSets: loadUserSets,
  });

  const usersContext: any[] = $state({
    includedUsers: [],
    excludedUsers: [],
    loadUserSets: loadUserSets,
  });

  async function loadUserSets(
    siteId: number,
    usersExcel: any[],
    userIncl: any[],
  ) {
    console.log("in loadUserSets", siteId);

    if (siteId > 0) {
      const [excludedUsers, includedUsers] = await Promise.all([
        fetchUserSet(siteId, UserState.ExcludedUsers),
        fetchUserSet(siteId, UserState.IncludedUsers),
      ]);
      // console.log("excludedUsers", excludedUsers);
      // console.log("includedUsers", includedUsers);

      usersExcl.users = excludedUsers;
      usersIncl.users = includedUsers;
      // console.log("usersExcl", usersExcl);
      // console.log("usersIncl", usersIncl);
    }
  }

  $effect(() => {
    (async () => {
      await loadUserSets(selectedSiteState.selectedSite, usersExcl, userIncl);
    })();
  });
</script>

<!-- Users (site selected: {selectedSiteState.selectedSite}) -->
<UsersExcl userObj={usersExcl} />

<UsersIncl userObj={usersIncl} />
