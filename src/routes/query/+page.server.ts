

//  From https://kit.svelte.dev/docs/form-actions#alternatives
export const actions = {
	query: async ({ request }) => {

        const data = await request.formData();
        console.log(data);

		//const email = data.get('email');
		//const password = data.get('password');
		//const user = await db.getUser(email);
		//cookies.set('sessionid', await db.createSession(user), { path: '/' });
        //

		return { success: true, snouts: "Piggy" };
	}
};
