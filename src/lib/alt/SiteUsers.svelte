<script lang="ts">
  import UsersExcl from "./internal/UsersExcl.svelte";
  import UsersIncl from "./internal/UsersIncl.svelte";
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

  async function fetchUserSet(siteId: number, userState: string) {
    try {
      const response = await fetch(`/admin/site/${siteId}/users/${userState}`);
      const data = await response.json();
      // console.error("data", userState, data.users);
      return data.users;
    } catch (error) {
      // console.error("Error fetching data", error);
      return [];
    }
  }

  async function loadUserSets(siteId: number) {
    console.log("in loadUserSets", siteId);

    if (selectedSiteState.selectedSite > 0) {
      const [excludedUsers, includedUsers] = await Promise.all([
        fetchUserSet(siteId, "excl"),
        fetchUserSet(siteId, "incl"),
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
      await loadUserSets(selectedSiteState.selectedSite);
    })();
  });
</script>

<!-- Users (site selected: {selectedSiteState.selectedSite}) -->
<UsersExcl userObj={usersExcl} />

<UsersIncl userObj={usersIncl} />
