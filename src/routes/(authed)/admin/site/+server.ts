// import { getSitesSlim } from "$lib/database/sites";
// import { json } from "@sveltejs/kit";
//
// // class SitesResponse {
// //   sites = $state();
// //   error = $state();
// //   isLoading = $state(false);
// // }
// export async function GET({ params }: any) {
//
//   console.log("getSiteData from /admin/site/+server.ts -> getSitesSlim");
//
//   const sites = await getSitesSlim();
//   // console.log("site data", sites);
//   //
//   return json({ success: true, sites: sites });
//
//   // const jsonYW = JSON.stringify(siteData);
//   // const jsonResultYW: any[] = JSON.parse(jsonYW);
//
//   // return json({ success: true, siteData: jsonResultYW });
//
//
//   // const resp = new SitesResponse();
//   //
//   // async function fetchData() {
//   //   resp.isLoading = true;
//   //   try {
//   //     const response = await getSitesSlim();
//   //     console.log("response", response);
//   //     resp.sites = (await response.json()).results;
//   //     resp.error = undefined;
//   //   } catch (err) {
//   //     resp.error = err;
//   //     resp.users = undefined;
//   //   }
//   //   resp.isLoading = false;
//   // }
//   //
//   // fetchData();
//   // return resp;
// }
