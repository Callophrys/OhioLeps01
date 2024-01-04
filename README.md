# Popups
pnpm install @floating-ui/dom
#### Import Floating UI into your application's root layout /src/routes/+layout.svelte.
import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
#### Import storePopup in your root layout, then pass an object containing the required Floating UI modules shown below.
import { storePopup } from '@skeletonlabs/skeleton';
storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
			

# Auth
https://joyofcode.xyz/sveltekit-authentication-using-cookies
https://github.com/Dan6erbond/sk-auth
Figure out shared auth via wordpress or such
Figure out roles (can see regular data, can see privileged data, can edit regular data, edit priv. data, can review data, can approve data, admin to fix users, super admin, reports access), sign off (approvals to edits and new data), auditing (what was done), security (who is doing this or trying to) and error (problems and exceptions) logs.  Privileged data can be dictionaries or site lists and can effect the whole system.
Need IP blocking (start with whitelisting USA), relog delays, and account disabling

https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes/prisma/seed.ts


# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Steps


6.
pnpm i -D @skeletonlabs/skeleton @skeletonlabs/tw-plugin
npx svelte-add@latest tailwindcss  # only needed to add tailwind
pnpm install




5.
pnpm run dev -- --open

4.
git init && git add -A && git commit -m "Initial commit"

3.
pnpm install @prisma/client
pnpx prisma init --datasource-provider mysql
:: https://www.prisma.io/docs/orm/overview/databases/mysql
:: do mappings and such for schema
:: create seed.ts

pnpm install -D tsx
Add then add this to package.json
	, "prisma": {
		"seed": "tsx ./prisma/seed.ts"
	}
pnpm prisma db seed
UGH not working
trying this:
npm install -D typescript ts-node @types/node

npx prisma migrate dev --name init

worked:
 pnpm install tsx --save-dev
 npx prisma migrate dev --name init
 npx prisma db seed -- --environment development


2.
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
:: do these things - https://tailwindcss.com/docs/guides/sveltekit

1.
pnpm create svelte@latest .
pnpm install

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.


use ohioleps
mysql --user=zabulon --password ohioleps

```SQL
CREATE USER 'zabulon'@'localhost' IDENTIFIED BY 'The......123';
GRANT ALL
  ON *.*
  TO 'zabulon'@'localhost'
  WITH GRANT OPTION;
```

```SQL
create database ohioleps;
use ohioleps
show tables;
```

```SQL
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';
```
bis........
-- pwd is empty at first
mysql -u root -p
choco install mysql

    /installLocation - filesystem location for mysql binaries
    /dataLocation - filesystem location for mysql data
    /port - numberic TCP listening port
    /serviceName - custom name for the Windows services entry

Example: choco install mysql --params "/port:3307 /serviceName:AltSQL"

#### Need first
- node
- pnpm
- mysql
- choco
- npx
- prisma
npx and ,not sure but also, prisma need to be global installs.
Probably can remove ts-node and tsx after db seeding is done.
Bring in tailwind/forms and skeleton/ui as needed.

#### 12/28/23
```
mysql> select * from checklist where checklistKey is null;
+------------+---------+------------+--------------------------+------------------------+------+------+---------+--------+------+------------+----------+---------+------------+---------+--------+-------+-----+-----------+--------------------+----------------+---------------+-------------+--------------+-------------+----------------+
| genus      | species | subspecies | combinedLatin            | commonName             | show | kind | revised | author | year | changeDate | changeBy | comment | endangered | synonym | family | gCKey | grp | sortOrder | tmp_SitesReporting | tmp_TotalCount | tmp_HighCount | checklistId | checklistKey | countyCount | referenceCount |
+------------+---------+------------+--------------------------+------------------------+------+------+---------+--------+------+------------+----------+---------+------------+---------+--------+-------+-----+-----------+--------------------+----------------+---------------+-------------+--------------+-------------+----------------+
| Epargyreus | clarus  | clarus     | Epargyreus clarus clarus | Silver-spotted Skipper |    1 | S    | T       | Cramer | 1779 | NULL       | NULL     | NULL    | NULL       | NULL    |     40 |    40 |   0 | NULL      |                  0 |              0 |             0 |        3870 | NULL         |           0 |              0 |
+------------+---------+------------+--------------------------+------------------------+------+------+---------+--------+------+------------+----------+---------+------------+---------+--------+-------+-----+-----------+--------------------+----------------+---------------+-------------+--------------+-------------+----------------+
1 row in set (0.00 sec)

mysql> update checklist set checklistKey = '3870' where checklistKey is null;
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> select * from checklist where checklistKey is null;
Empty set (0.00 sec)
```

```
update siteObservation o join checklist k on o.checklistKey = k.checklistKey
   set o.checklistId = k.checklistId

update site s join statecounty y on s.county = y.county
   set s.stateCountyId = y.stateCountyId

update siteObservation o join siteDate d on o.seqId = d.seqId
   set o.siteDateId = d.siteDateId
```
### Node.js way to get json from mdb
import * as adodb  from "node-adodb";
import * as fs from "fs";

// write to a new file named 2pac.txt

const connection = adodb.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=db.mdb;');
async function toJSON(filename:string,sql:string) {
  try {
    const data = await connection.query(sql);
    const dataString=JSON.stringify(data, null, 2);

    fs.writeFile('data/' + filename, dataString, (err) => {  
      if (err) throw err;
      console.log(filename + ' saved!');
  });
  } catch (error) {
    console.log(filename + ' error !');
    console.error(error);
  }
}


### Svelte comments 
use JS to comment out HTML elements. Its hackky but works:
```<div id="myDiv" {...{/*commented-parameter=true*/}} regular-paramter=true />```

 It only works for attributes, here is a solution for tag-level comments:

```{""+/* Gets the job done.. */""}```

### SUNDRY

for nvim lang server issue, install:
pnpm i -g vscode-langservers-extractedo

#### MySql stuff
select table_name, table_rows from INFORMATION_SCHEMA.TABLES where table_schema = 'ohioleps';
show create table site;

SELECT COUNT(*) CT FROM nameaddress;
SELECT COUNT(*) CT FROM checklist;
SELECT COUNT(*) CT FROM site;
SELECT COUNT(*) CT FROM sitedate;
SELECT COUNT(*) CT FROM siteobservation;
SELECT COUNT(*) CT FROM sitestatus;
SELECT COUNT(*) CT FROM statecounty;
SELECT COUNT(*) CT FROM statuscode;
SELECT COUNT(*) CT FROM taxonomyfamily;
SELECT COUNT(*) CT FROM taxonomysubfamily;

#### Squash migrations
ALTER TABLE SITEOBSERVATION DROP FOREIGN KEY SiteObservation_checklistId_fkey;
ALTER TABLE SITE DROP FOREIGN KEY Site_stateCountyId_fkey;
ALTER TABLE SITEDATE DROP FOREIGN KEY SiteDate_siteId_fkey;
ALTER TABLE SITEDATE DROP FOREIGN KEY SiteObservation_siteDateId_fkey;

DROP TABLE IF EXISTS _prisma_migrations;
DROP TABLE IF EXISTS nameaddress;
DROP TABLE IF EXISTS checklist;
DROP TABLE IF EXISTS site;
DROP TABLE IF EXISTS sitedate;
DROP TABLE IF EXISTS siteobservation;
DROP TABLE IF EXISTS sitestatus;
DROP TABLE IF EXISTS statecounty;
DROP TABLE IF EXISTS statuscode;
DROP TABLE IF EXISTS taxonomysubfamily;
DROP TABLE IF EXISTS taxonomyfamily;

npx prisma migrate dev --name initial_migration
npx prisma migrate dev --name <date + letter or number>
npx prisma migrate dev --create-only


-- random color butterfly
https://codepen.io/JEFworks/pen/XzKJmv

paseto and auth0:
https://github.com/auth0/auth0.js
https://github.com/panva/paseto/


// Create subclass
import { Prisma } from "@prisma/client";
//import { Types } from "@prisma/client/runtime/library";
const stateCountiesWithSites = Prisma.validator<Prisma.StateCountyDefaultArgs>()({
	include: { sites: true }
});
type StateCountiesWithSites = Prisma.StateCountyGetPayload<typeof stateCountiesWithSites>;

https://www.paigeniedringhaus.com/blog/tips-and-tricks-for-using-the-prisma-orm
https://www.mikenikles.com/blog/svelte-kit-prisma-a-match-made-in-digital-heaven
https://github.com/mootoday/sveltekit-prisma  // hooks
https://github.com/prisma/prisma-client-extensions


- export and use globals

- I use this nasty trick to disable type checking of a single attribue :
```
<script lang="ts">
	const notypecheck = (x:any)=>x;
</script>

<MyComponent {...notypecheck({
    attribute:  value
})} />
```
