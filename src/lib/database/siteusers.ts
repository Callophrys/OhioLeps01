import type { Organization, User } from "$lib/types";

export async function fetchOrganizations(): Promise<Organization[]> {
  const res = await fetch("/api/organizations");
  return res.json();
}

export async function fetchUsersByOrg(orgId: string): Promise<User[]> {
  const res = await fetch(`/api/organizations/${orgId}/users`);
  return res.json();
}

export async function addUserToOrg(orgId: string, userId: string): Promise<void> {
  await fetch(`/api/organizations/${orgId}/users`, {
    method: "POST",
    body: JSON.stringify({ userId }),
    headers: { "Content-Type": "application/json" },
  });
}

export async function removeUserFromOrg(orgId: string, userId: string): Promise<void> {
  await fetch(`/api/organizations/${orgId}/users/${userId}`, {
    method: "DELETE",
  });
}
