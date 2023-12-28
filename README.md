# Auth
https://joyofcode.xyz/sveltekit-authentication-using-cookies
https://github.com/Dan6erbond/sk-auth
Figure out shared auth via wordpress or such
Figure out roles (can see regular data, can see privileged data, can edit regular data, edit priv. data, can review data, can approve data, admin to fix users, super admin, reports access), sign off (approvals to edits and new data), auditing (what was done), security (who is doing this or trying to) and error (problems and exceptions) logs.  Privileged data can be dictionaries or site lists and can effect the whole system.
Need IP blocking (start with whitelisting USA), relog delays, and account disabling


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
update siteObservation o
  join checklist k
    on o.checklistKey = k.checklistKey
   set o.checklistId = k.checklistId
```