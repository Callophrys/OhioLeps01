import type { Handle } from "@sveltejs/kit";
import prisma from "$lib/prisma";
import { defaultOrganization } from "$lib/config";
import {
  getAppConfigsByOrgId,
  getAppConfigsByOrgName,
  getTemplateAppConfigs,
} from "$lib/database/appconfig";

export const handle: Handle = (async ({ event, resolve }) => {
  // get cookies from browser
  const session = event.cookies.get("session");
  let appConfigs: any[] | undefined;

  if (!session) {
    // if there is no session load page as normal
    appConfigs = await getAppConfigsByOrgName(defaultOrganization);
    // console.log(`appConfigs by defaultOrganzition (${defaultOrganization})`, appConfigs);

    if (typeof appConfigs === "undefined" || appConfigs.length === 0) {
      appConfigs = await getTemplateAppConfigs();
      // console.log('appConfigs of TEMPLATE', appConfigs);
    }

    if (appConfigs) {
      let config: any = {};
      Array.from(appConfigs ?? []).forEach((c: any) => {
        if (c.configType === "boolean") {
          config[c.configName] = c.configValue === "true";
        } else if (c.configType === "number") {
          config[c.configName] = Number(c.configValue);
        } else if (c.configType === "object") {
          config[c.configName] = JSON.parse(c.configValue);
        } else {
          config[c.configName] = c.configValue;
        }
      });
      event.locals.config = config;
    }

    return await resolve(event);
  }

  // find the user based on the session
  const user = await prisma.user.findUnique({
    where: { userAuthToken: session },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      role: true,
      organizationId: true,
      disabled: true,
      createdAt: true,
    },
  });

  // if `user` exists set `events.local`
  if (user) {
    event.locals.user = {
      id: user.id,
      name: user.username,
      firstLast: user.firstName + " " + user.lastName,
      lastFirst: user.lastName + ", " + user.firstName,
      role: user.role?.name ?? "",
      organizationId: user.organizationId ?? "",
      disabled: user.disabled,
      createdAt: user.createdAt,
    };

    appConfigs = await getAppConfigsByOrgId(user.organizationId ?? "");
    //console.log('appConfigs by user organizationId', user, appConfigs, 'fin');
  }

  if (typeof appConfigs === "undefined" || appConfigs.length === 0) {
    appConfigs = await getAppConfigsByOrgName(defaultOrganization);
    console.log(
      `appConfigs by defaultOrganzition (${defaultOrganization})`,
      appConfigs,
    );
  }

  if (typeof appConfigs === "undefined" || appConfigs.length === 0) {
    appConfigs = await getTemplateAppConfigs();
    //console.log('appConfigs of TEMPLATE', appConfigs);
  }

  if (appConfigs) {
    let config: any = {};
    Array.from(appConfigs ?? []).forEach((c: any) => {
      if (c.configType === "boolean") {
        config[c.configName] = c.configValue === "true";
      } else if (c.configType === "number") {
        config[c.configName] = Number(c.configValue);
      } else if (c.configType === "object") {
        config[c.configName] = JSON.parse(c.configValue);
      } else {
        config[c.configName] = c.configValue;
      }
    });
    event.locals.config = config;
  }

  // load page as normal
  return await resolve(event);
}) satisfies Handle;
