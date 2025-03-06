import type { AppConfig, User, Organization, Site } from "@prisma/client";
import type { AppConfigFormKeyChecked, UserComplete } from "$lib/types";
import type { PageServerLoad } from "./$types";
import {
  getAppConfigsByOrgId,
  updateAllAppConfigs,
  getTemplateAppConfigs,
  resetAllAppConfigs,
} from "$lib/database/appconfig";
import { redirect } from "@sveltejs/kit";
import { getOrganizations } from "$lib/database/organizations";
import { getUsers } from "$lib/database/users.js";
import { getSites } from "$lib/database/sites";
import { promises } from "dns";

export const load: PageServerLoad = async ({ locals }) => {
  // redirect user if not logged in
  //console.log(locals.user?.role);
  if (locals.user?.role !== "ADMIN" && locals.user?.role !== "SUPER") {
    // TODO: figure out why this always goes to "/" when something else is hard-coded or passed in
    throw redirect(302, "/");
  }

  // const { appConfigs, users, organizations } = await Promise.all([getAppConfigsByOrgId(locals.user.organizationId), getUsers(locals.user.role === 'SUPER' || locals.user.role === 'ADMIN' ? null : locals.user.organizationId), getOrganizations()]);

  const appConfigs: AppConfig[] = await getAppConfigsByOrgId(
    locals.user.organizationId,
  );

  const users: User[] = await getUsers(
    locals.user.role === "SUPER" || locals.user.role === "ADMIN"
      ? null
      : locals.user.organizationId,
  );
  const organizations: Organization[] = await getOrganizations();
  const sites: Site[] = await getSites();

  const json = JSON.stringify(appConfigs);
  const jsonResult: AppConfigFormKeyChecked[] = JSON.parse(json);

  const jsonUsers = JSON.stringify(users);
  const jsonResultUsers: UserComplete[] = JSON.parse(jsonUsers);

  const jsonOrganizations = JSON.stringify(organizations);
  const jsonResultOrganizations: Organization[] = JSON.parse(jsonOrganizations);

  const jsonSites = JSON.stringify(sites);
  const jsonResultSites: Site[] = JSON.parse(jsonSites);

  console.log("done in server ");
  return {
    appConfigs: jsonResult,
    users: jsonResultUsers,
    organziations: jsonResultOrganizations,
    sites: sites,
  };
};

export const actions = {
  updateAppConfigs: async ({
    request,
    locals,
  }: {
    request: any;
    locals: any;
  }) => {
    console.log("updateAppConfigs from /api/admin/+page.server.ts");
    const formData = await request.formData();
    console.log(formData);
    const candidates: any = {};
    for (const p of formData)
      candidates[p[0].slice(0, p[0].indexOf("_"))] = p[1];

    const appConfigs = (await getAppConfigsByOrgId(
      locals.user.organizationId,
    )) as AppConfigFormKeyChecked[];
    const updateConfigs: AppConfigFormKeyChecked[] = [];
    appConfigs.forEach((c) => {
      if (c.configType === "boolean") {
        if (typeof candidates[c.id] === "undefined") {
          if (c.configValue === "true") {
            console.log(c.configName, c.configType, c.configValue, c.checked);
            c.configValue = "false";
            updateConfigs.push(c);
          }
        } else if (c.configValue === "false" && candidates[c.id] === "on") {
          //console.log('b2');
          c.configValue = "true";
          updateConfigs.push(c);
        }
      } else if (
        c.configType !== "object" &&
        c.configValue !== candidates[c.id]
      ) {
        //console.log(c.configValue, candidates[c.id]);
        //console.log('a');
        c.configValue = candidates[c.id];
        updateConfigs.push(c);
      }
    });

    const updatedConfigs = await updateAllAppConfigs(appConfigs);
    const json = JSON.stringify(updatedConfigs);
    const jsonResult: AppConfigFormKeyChecked[] = JSON.parse(json);

    return { success: true, appConfigs: jsonResult };
  },

  resetAppConfigs: async ({ locals }: { locals: any }) => {
    console.log("resetAppConfigs from /api/admin/+page.server.ts");

    const appConfigs = (await resetAllAppConfigs(
      locals.user.organizationId,
    )) as AppConfigFormKeyChecked[];
    const json = JSON.stringify(appConfigs);
    const jsonResult: AppConfigFormKeyChecked[] = JSON.parse(json);
    return { appConfigs: jsonResult };
  },
};
