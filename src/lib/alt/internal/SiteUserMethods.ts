export const UserState = {
  IncludedUsers: "incl",
  ExcludedUsers: "excl",
};

export type UserStateType = (typeof UserState)[keyof typeof UserState]

export async function removeAllSiteUsers(siteId: number) {
  console.log("Removing all site users");
  if (siteId > 0) {
    await fetch(`/admin/siteuser/${siteId}`, {
      method: "DELETE",
    });
  }
}

export async function fetchUserSet(siteId: number, userState: UserStateType) {
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
