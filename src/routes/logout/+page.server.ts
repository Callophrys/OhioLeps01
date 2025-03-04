import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  console.log("sites - pageserverload");
  // we only use this endpoint for the api
  // and don't need to see the page
  throw redirect(302, "/");
};

export const actions: Actions = {
  default({ cookies }) {
    console.log("sites - default action - cookies");
    // eat the cookie
    cookies.set("session", "", {
      path: "/",
      expires: new Date(0),
    });

    console.log("sites - default action - before login");
    // redirect the user
    throw redirect(302, "/");
    //throw redirect(302, '/login')
  },
};
