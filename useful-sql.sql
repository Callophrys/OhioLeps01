
```sql
CREATE USER 'zabulon'@'localhost' IDENTIFIED BY 'The......123';
GRANT ALL
  ON *.*
  TO 'zabulon'@'localhost'
  WITH GRANT OPTION;
```

```sql
create database ohioleps;
use ohioleps
show tables;
```

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';
```

```sql
use ohioleps

select * from checklist where hodges is null;

update siteDateObservation o join checklist k on o.hodges = k.hodges
   set o.checklistId = k.checklistId;

update siteDateObservation o join siteDate d on o.seqId = d.seqId
   set o.siteDateId = d.siteDateId;
```

```sql
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
SELECT COUNT(*) CT FROM continent;
SELECT COUNT(*) CT FROM country;
SELECT COUNT(*) CT FROM state;
SELECT COUNT(*) CT FROM region;
SELECT COUNT(*) CT FROM county;
SELECT COUNT(*) CT FROM audit;

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
ALTER TABLE county               DROP FOREIGN KEY County_stateRegionId_fkey;
ALTER TABLE county               DROP FOREIGN KEY County_stateId_fkey;
ALTER TABLE stateRegion          DROP FOREIGN KEY StateRegion_stateId_fkey;
ALTER TABLE state                DROP FOREIGN KEY State_countryId_fkey;
ALTER TABLE countryRegion        DROP FOREIGN KEY CountryRegion_countryId_fkey;
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
DROP TABLE IF EXISTS countryRegion;
DROP TABLE IF EXISTS state;
DROP TABLE IF EXISTS stateRegion;
DROP TABLE IF EXISTS country;
DROP TABLE IF EXISTS continent;
DROP TABLE IF EXISTS appconfig;
DROP TABLE IF EXISTS organization;
DROP TABLE IF EXISTS audit;

model Taxonomy {
model AppConfig {
model User {
model Organization {
model Role {
model Site {
model Checklist {
model SiteDateObservation {
model StatusCode {
model SiteStatus {
model SiteDate {
model NameAddress {
model Continent {
model Country {
model CountryRegion {
model State {
model StateRegion {
model County {
model Audit {

END //
DELIMITER ;
```

```sql
with ranked as (
  select *,
    row_number() over (partition by stateId order by name) as nn
  from countyNumber
)
update county, ranked
set county.countyNumber = ranked.nn
where county.id = ranked.id;
```

```sql
select distinct c.name county, s.sitename, year(sd.recordDate)
from site s
inner join sitedate sd on s.siteId = sd.siteId
inner join county c on c.id = s.countyId
order by 1, 2, 3;
```

