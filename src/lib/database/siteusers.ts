import type { Site, User } from "$lib/types";

export async function fetchSites(): Promise<site[]> {
  const res = await fetch("/api/sites");
  return res.json();
}

export async function fetchUsersBySite(siteId: string): Promise<User[]> {
  const res = await fetch(`/api/sites/${siteId}/users`);
  return res.json();
}

export async function addUserToSite(siteId: string, userId: string): Promise<void> {
  await fetch(`/api/sites/${siteId}/users`, {
    method: "POST",
    body: JSON.stringify({ userId }),
    headers: { "Content-Type": "application/json" },
  });
}

export async function removeUserFromSite(siteId: string, userId: string): Promise<void> {
  await fetch(`/api/sites/${siteId}/users/${userId}`, {
    method: "DELETE",
  });
}
