<script lang="ts">
  import type { User } from "@prisma/client";
  import { getContext } from "svelte";
  import { loadUserSets } from "$lib/alt/internal/SiteUserMethods";
  import { SlideToggle } from "@skeletonlabs/skeleton";

  let {
    user = $bindable(),
    siteId = $bindable(),
    privilege = $bindable(),
  }: { user: User; siteId: BigInt; privilege: string } = $props();

  const context = getContext("usersContext");

  function getPrivilegeName(priv: string) {
    switch (priv) {
      case "V":
        return "View/Run reports";
      case "E":
        return "Data entry";
      case "R":
        return "Review/Sign off data";
      case "A":
        return "Administrator";
      case "S":
        return "Super user";
      default:
        return "Default/Fall back to user's role";
    }
  }

  function isPrivilegeSet(user, siteId, privilege) {
    debugger;
    if (user.siteUsers == null || user.siteUsers.length === 0) return false;

    const siteUser = user.siteUsers.find((s) => s.siteId === siteId);
    return siteUser?.privilege === privilege;
  }

  async function updateSiteUser(
    siteId: number,
    userId: string,
    privilege: string,
  ) {
    console.log("Updating privilege");
    if (siteId > 0) {
      const fd = new FormData();
      fd.append("privilege", privilege);

      await fetch(`/admin/siteuser/${siteId}/${userId}`, {
        method: "PUT",
        body: fd,
      });

      await loadUserSets(context);
    }
  }
</script>

<SlideToggle
  name={`toggle_r_${user.id}`}
  size="sm"
  checked={user.siteUsers.length > 0
    ? user.siteUsers[0].privilege === privilege
    : false}
  disabled={user.siteUsers.length > 0
    ? user.siteUsers[0].privilege === privilege && privilege === "V"
    : false}
  on:click={async () =>
    await updateSiteUser(
      siteId,
      user.id,
      user.siteUsers.length && user.siteUsers[0].privilege === privilege
        ? "V"
        : privilege,
    )}
></SlideToggle>
