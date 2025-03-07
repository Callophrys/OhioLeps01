import { getUsers } from "$lib/database/users";
import { json } from "@sveltejs/kit";

export async function GET({ params }: any) {
  console.log("getUser data from /admin/user/+server.ts");

  const users = await getUsers();
  // console.log("user data", users);
  return json({ success: true, users: users });
}
