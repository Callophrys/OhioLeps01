const UserState = {
  INCLUDEDUSERS: "incl",
  EXCLUDEDUSERS: "excl",
};

type UserStateType = (typeof UserState)[keyof typeof UserState]

export async function addAllSiteUsers(siteId: number) {
  console.log("Adding all site users");
  if (siteId > 0) {
    await fetch(`/admin/siteuser/${siteId}`, {
      method: "POST",
    });
  }
}

export async function removeAllSiteUsers(siteId: number) {
  console.log("Removing all site users");
  if (siteId > 0) {
    await fetch(`/admin/siteuser/${siteId}`, {
      method: "DELETE",
    });
  }
}

export async function loadUserSets(usersContext: any) {
  console.log("in loadUserSets", usersContext);

  if (usersContext.siteId > 0) {
    const [excludedUsers, includedUsers] = await Promise.all([
      fetchUserSet(String(usersContext.siteId), UserState.EXCLUDEDUSERS),
      fetchUserSet(String(usersContext.siteId), UserState.INCLUDEDUSERS),
    ]);
    // console.log("excludedUsers", excludedUsers);
    // console.log("includedUsers", includedUsers);

    usersContext.excludedUsers = excludedUsers;
    usersContext.includedUsers = includedUsers;
    // console.log("usersExcl", usersExcl);
    // console.log("usersIncl", usersIncl);
  }
}


async function fetchUserSet(siteId: string, userState: UserStateType) {
  console.log("fetchUserSet", [...arguments]);
  try {
    console.log(`/admin/site/${siteId}/users/${userState}`);
    const response = await fetch(`/admin/site/${siteId}/users/${userState}`);
    const data = await response.json();
    // console.error("data", userState, data.users);
    return data.users;
  } catch (error) {
    // console.error("Error fetching data", error);
    return [];
  }
}
