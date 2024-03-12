# Popups
pnpm install @floating-ui/dom
#### Import Floating UI into your application's root layout /src/routes/+layout.svelte.
import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
#### Import storePopup in your root layout, then pass an object containing the required Floating UI modules shown below.
import { storePopup } from '@skeletonlabs/skeleton';
storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

posts/sveltekit-authentication-using-cookies/sveltekit-authentication-using-cookies.md

# Auth
https://www.programmingtil.com/contents/better-protected-routes-with-endpoints-hooks-and-load-in-sveltekit
https://dev.to/brewhousedigital/secure-authentication-in-svelte-using-hooks-k5j
https://joyofcode.xyz/sveltekit-authentication-using-cookies
https://github.com/Dan6erbond/sk-auth
Figure out shared auth via wordpress or such
Figure out roles (can see regular data, can see privileged data, can edit regular data, edit priv. data, can review data, can approve data, admin to fix users, super admin, reports access), sign off (approvals to edits and new data), auditing (what was done), security (who is doing this or trying to) and error (problems and exceptions) logs.  Privileged data can be dictionaries or site lists and can effect the whole system.
Need IP blocking (start with whitelisting USA), relog delays, and account disabling

https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes/prisma/seed.ts



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

8.
# View/edit data
pnpx prisma studio

7.
# for hashing the password
pnpm i bcrypt

# optional bcrypt types
pnpm i -D @types/bcrypt



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

mysql> select * from checklist where hodges is null;

```

```
update siteDateObservation o join checklist k on o.hodges = k.hodges
   set o.checklistId = k.checklistId

update siteDateObservation o join siteDate d on o.seqId = d.seqId
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

```SQL
#### MySql stuff
select table_name, table_rows from INFORMATION_SCHEMA.TABLES where table_schema = 'ohioleps';
show create table site;

SELECT COUNT(*) CT FROM nameaddress;
SELECT COUNT(*) CT FROM checklist;
SELECT COUNT(*) CT FROM site;
SELECT COUNT(*) CT FROM sitedate;
SELECT COUNT(*) CT FROM siteDateObservation;
SELECT COUNT(*) CT FROM sitestatus;
SELECT COUNT(*) CT FROM statuscode;
SELECT COUNT(*) CT FROM taxonomy;
SELECT COUNT(*) CT FROM organization;
SELECT COUNT(*) CT FROM appConfig;
SELECT COUNT(*) CT FROM user;
SELECT COUNT(*) CT FROM role;
SELECT COUNT(*) CT FROM country;
SELECT COUNT(*) CT FROM state;
SELECT COUNT(*) CT FROM region;
SELECT COUNT(*) CT FROM county;
SELECT COUNT(*) CT FROM continent;

SELECT EXISTS (
SELECT * FROM information_schema.tables
WHERE table_schema = 'ohioleps' AND table_name = 'county')

-- Squash migrations
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS RemoveOhLeps()
BEGIN

-- Show create
SHOW CREATE TABLE user

IF (SELECT EXISTS (
SELECT * FROM information_schema.tables
WHERE table_schema = 'ohioleps' AND table_name = 'county')) THEN
BEGIN
END IF;

ALTER TABLE siteDateObservation  DROP FOREIGN KEY SiteDateObservation_checklistId_fkey;
ALTER TABLE siteDateObservation  DROP FOREIGN KEY SiteDateObservation_siteDateId_fkey;
ALTER TABLE sitestatus           DROP FOREIGN KEY SiteStatus_siteId_fkey;
ALTER TABLE sitestatus           DROP FOREIGN KEY SiteStatus_statusCodeId_fkey;
ALTER TABLE sitedate             DROP FOREIGN KEY SiteDate_siteId_fkey;
ALTER TABLE site                 DROP FOREIGN KEY Site_countyId_fkey;
ALTER TABLE site                 DROP FOREIGN KEY Site_stateId_fkey;
ALTER TABLE county               DROP FOREIGN KEY County_regionId_fkey;
ALTER TABLE county               DROP FOREIGN KEY County_stateId_fkey;
ALTER TABLE region               DROP FOREIGN KEY Region_stateId_fkey;
ALTER TABLE state                DROP FOREIGN KEY State_countryId_fkey;
ALTER TABLE country              DROP FOREIGN KEY Country_continentId_fkey;
ALTER TABLE checklist            DROP FOREIGN KEY Checklist_taxonId_fkey;
ALTER TABLE taxonomy             DROP FOREIGN KEY Taxonomy_baseTaxonId_fkey;
ALTER TABLE user                 DROP FOREIGN KEY User_roleId_fkey;
ALTER TABLE user                 DROP FOREIGN KEY User_organizationId_fkey;
ALTER TABLE appconfig            DROP FOREIGN KEY AppConfig_organizationId_fkey;

DROP TABLE IF EXISTS _prisma_migrations;
DROP TABLE IF EXISTS nameaddress;
DROP TABLE IF EXISTS checklist;
DROP TABLE IF EXISTS site;
DROP TABLE IF EXISTS sitedate;
DROP TABLE IF EXISTS siteDateObservation;
DROP TABLE IF EXISTS sitestatus;
DROP TABLE IF EXISTS statuscode;
DROP TABLE IF EXISTS taxonomy;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS county;
DROP TABLE IF EXISTS region;
DROP TABLE IF EXISTS state;
DROP TABLE IF EXISTS country;
DROP TABLE IF EXISTS continent;
DROP TABLE IF EXISTS appconfig;
DROP TABLE IF EXISTS organization;

END //
DELIMITER ;

```

npx prisma migrate dev --name initial_migration
npx prisma migrate dev --name <date + letter or number>
npx prisma migrate dev --create-only


-- random color butterfly
https://codepen.io/JEFworks/pen/XzKJmv

paseto and auth0:
https://github.com/auth0/auth0.js
https://github.com/panva/paseto/


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
### 1/9/2024

mysql history log: https://stackoverflow.com/questions/12563706/is-there-a-mysql-option-feature-to-track-history-of-changes-to-records

add, edit, remove with forms
https://joyofcode.xyz/working-with-forms-in-sveltekit

The SvelteKit language server is doing a lot of work under the hood and sometimes you might have a problem with the generated types in which case you can press Ctrl + P and type > Svelte: Restart Language Server but if that doesn’t work restart the development server or your editor as a last resort.

### 1/10/2024

Prima update:
Update available 5.7.1 -> 5.8.0
Run the following to update:
npm i --save-dev prisma@latest
npm i @prisma/client@latest
- first of above displays errors
- also must run 'pnpm run build' after
- can the npm commands be replaced with pnpm?

Pnpm update:
pnpm add -g pnpm  # updates package.json only
npm add -g pnpm   # updates actual pnpm but does it do the package.json update?
** seems i have to do both

After pnpm update and probably prisma update:
npx prisma generate

https://vercel.com/docs/beginner-sveltekit/data-binding-and-event-handling

### 1/12/2024
http://wedgefoundation.org/publications_paypal.asp
🌎
🔐
🔏
🔒
🔓
🔑
↺
↻
➜
✐
✎
✔
💥
🧽
❗
❕
❓
❔
❌
✘
✚
📷
📸
🔍
🔎
🔗
🔬
🔭
🦋
⨞
▶
◀
▲
▼
∅
↤
Character	Numerical Code	Name of Character
|	&#124;	vertical bar/pipe
¦	&#166;	broken vertical bar
:	&#58;	colon
;	&#59;	semicolon
∅   &varnothing; empty set or null symbol


TODO: Figure out edit history

### 1/15/2024

-- use information_schema.table_constraints table to get
-- the names of the constraints defined on each table
select *
from information_schema.table_constraints
where constraint_schema = 'ohioleps';

-- use information_schema.key_column_usage table to
-- get the fields in each one of those constraints
select *
from information_schema.key_column_usage
where constraint_schema = 'ohioleps';

-- use information_schema.referential_constraints to
-- get the foreign key constraints
select *
from information_schema.referential_constraints
where constraint_schema = 'ohioleps';

-- myssql does not support check constraints and silently discards them


select table_name, constraint_name from information_schema.referential_constraints where constraint_schema = 'ohioleps';

### 1/17//2024

Add property to each object in array
```
const siteDates: any = Array.from(ssiteDates).map((sd: any) => ({ ...sd, year: sd.year }));
```
TODO: hook up checklists to taxonomy
TODO: think views to better fetch and compute data, e.g. all checklists to a site

select c.name county,
r.name region,
s.sitename site,
d.recorddate,
l.commonname
from county c
inner join region r on c.regionId = r.id
inner join site s on s.countyId = c.id
inner join sitedate d on s.siteid = d.siteid
inner join siteDateObservation o on d.sitedateid = o.sitedateid
inner join checklist l on o.checklistid = l.checklistid
where c.name = 'greene';

select distinct
c.name county,
r.name region,
l.commonname
from county c
inner join region r on c.regionId = r.id
inner join site s on s.countyId = c.id
inner join sitedate d on s.siteid = d.siteid
inner join siteDateObservation o on d.sitedateid = o.sitedateid
inner join checklist l on o.checklistid = l.checklistid;


where c.name = 'greene';

### 1/22/2024

```
<style>
    .text-base-token {
        color: rgba(var(--theme-font-color-base));
    }
    .text-dark-token {
        color: rgba(var(--theme-font-color-dark));
    }
    .text-token {
        @apply text-base-token dark:text-dark-token;
    }
</style>
```

Example sort/filter of user list
https://svelte.dev/repl/13570eb8a00747279a583a95f6d5b4f6?version=3.24.1

### 1/25/2024
Interesting font, icon, svg and maps stuff
```
https://base64.guru/converter/encode/text text to base64
https://base64.guru/converter/decode/file base64 to file
https://base64.guru/converter/decode/file (for color arrow)....but
is a ttf
windows can't open per not a ttf file

https://github.com/donbright/font_to_svg
This code will convert a single character in a TrueType(R) font file into an SVG 'path' shape.

https://github.com/StephanWagner/svgMap
svgMap is a JavaScript library that lets you easily create an interactable world map comparing customizable data for each country.

https://stephanwagner.me/create-world-map-charts-with-svgmap#svgMapDemoGDP
show svg map with panning and hover popovers

https://github.com/bumbu/svg-pan-zoom
Simple pan/zoom solution for SVGs in HTML. It adds events listeners for mouse scroll, double-click and pan, plus it optionally offers:
- JavaScript API for control of pan and zoom behavior
- onPan and onZoom event handlers
- On-screen zoom controls

https://github.com/JosephM101/Force-Windows-11-Install/blob/main/docs/UUPDump-Tutorial.md


Table Sorts
https://svelte.dev/repl/08aca4e5d75e4ba7b8b05680f3d3bf7a?version=3.49.0

OPACITY stuff
https://stackoverflow.com/questions/15597167/css3-opacity-gradient
```


wsl --install
wsl --list --online
wsl --install -d ubuntu-22.04

54      ux frog butt
squeaks ux frogbutt - biscuit

curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

sudo apt install neovim
sudo apt install fd-find
ln -s $(which fdfind) ./bin

sudo apt-get install ninja-build gettext cmake unzip cur
cd ~
git clone https://github.com/neovim/neovim
cd neovim/
make CMAKE_BUILD_TYPE=Release
sudo make install

# 1/29/2024
```javascript
async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
```

# 1/30/2024
dump data to screen
```svelte
<div>
{#each dataarray as data}
    <pre>{JSON.stringify(data, null, 1)}</pre>
{/each}
</div>
```

```
Breakpoint prefix	Minimum width	CSS
sm	640px	@media (min-width: 640px) { ... }
md	768px	@media (min-width: 768px) { ... }
lg	1024px	@media (min-width: 1024px) { ... }
xl	1280px	@media (min-width: 1280px) { ... }
2xl	1536px	@media (min-width: 1536px) { ... }
```

```
git config --global pull.rebase true
git config --global fetch.prune true
git config --global diff.colorMoved zebra
```

-- 2 ways to cast
```javascript
(<NodeListOf<HTMLScriptElement>>document.getElementsByName(id))[0];
const script = document.getElementsByName("script")[0] as HTMLScriptElement;
```

# 2/21/2024
Update prisma
npm i --save-dev prisma@latest
npm i @prisma/client@latest
...and npm ERR! Cannot read properties of null (reading 'edgesOut')

npm ERR! A complete log of this run can be found in: C:\Users\ndonat\AppData\Local\npm-cache\_logs\2024-02-21T14_06_57_607Z-debug-0.log

Update node, Clear vs clean?
npm cache clear --force
npm cache clean --force
choco upgrade nodejs.install



   2    38:29.526 pnpm run dev -- --open
   3        2.306 npx prisma migrate dev --name 20240221A
   4       19.222 npx prisma db seed -- --environment development
   5        2.907 pnpm i --save-dev prisma@latest
   6        0.571 pnpm i @prisma@latest
   7        1.488 npm i @prisma@latest
   8     2:08.494 npm i --save-dev prisma@latest
   9     1:08.399 npm install prisma@latest
  10        1.251 pnpm install help
  11        0.971 pnpm remove help
  12        0.313 pnpm help
  13       29.524 pnpm update @latest
  14        2.171 npm cache clear --force
  15     2:01.357 npm install prisma@latest
  16
  17
  18        1.419 npm cache clear --force
  19        0.937 npm cache clean --force
  20        8.746 choco upgrade nodejs.install
  21
  22       38.561 npm update @latest
  23        6.239 pnpm update @latest
  24
  25        1.322 pnpm update @typescript-eslint/eslint-plugin@7.0.2
  26        0.962 pnpm update @typescript-eslint/parser@7.0.2
  27       16.604 pnpm update @latest
  28        0.608 pnpm install
  29       35.607 pnpm run dev -- --open
  30        1.899 npx prisma generate
                    
    # 2/22/2024
    
```Typescript
use:enhance={({ formReview, data, cancel }) => {
// `form` is the `<form>` element
// `data` is its `FormData` object response from action
// `cancel()` will prevent the submission

return async ({ result }) => {
    // `result` is an `ActionResult` object
};
}}
```


# 2/26/2024
```Javascript
const foo = {x1: "bat", x2: "cat", x3: "dog", x4: "emu"}
console.log(foo);
//{ x1: "bat", x2: "cat", x3: "dog", x4: "emu" }
console.log(Object.entries(foo));
//[{ x1: "bat" }, { x2: "cat" }, { x3: "dog" }, { x4: "emu" }]
console.log(Object.entries(foo).map(([k,v]) => ({[k]: v })));
//{ x1: "bat", x2: "cat", x3: "dog", x4: "emu" }


const bar = Object
	.entries(foo)
	.map(([k,v]) => ({[k]: v }))
	.filter((z) => Object.entries(z)[0][0].startsWith('x'));
console.log(bar);

// and back
const res = {};
bar.forEach((kvp) => {const x = Object.entries(kvp); res[x[0][0]]=x[0][1]});
console.log(res);
```
# 3/12/2024
// Imports
// -- Data --
// Exports
// Context
// -- Styling --
// Properties (styles)
// Constants (styles)
// Reactives (styles)
// -- Coding --
// Enums
// Constants (functional)
// Properties (functional)
// Variables and objects
// Run first stuff
// onMount, beforeNavigate, afterNavigate
// Handlers
// Methods
// Reactives (functional)
