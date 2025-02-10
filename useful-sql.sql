
```sql
CREATE USER 'zabulon'@'localhost' IDENTIFIED BY 'biscuit33#F';
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
ALTER USER 'root'@'localhost' IDENTIFIED BY 'biscuit33#F';
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

ALTER TABLE sectionObservation   DROP FOREIGN KEY SectionObservation_sectionId_fkey;
ALTER TABLE sectionObservation   DROP FOREIGN KEY SectionObservation_siteDateObservationId_fkey;
ALTER TABLE siteDateObservation  DROP FOREIGN KEY SiteDateObservation_checklistId_fkey;
ALTER TABLE siteDateObservation  DROP FOREIGN KEY SiteDateObservation_siteDateId_fkey;
ALTER TABLE sitestatus           DROP FOREIGN KEY SiteStatus_siteId_fkey;
ALTER TABLE sitestatus           DROP FOREIGN KEY SiteStatus_statusCodeId_fkey;
ALTER TABLE sitedate             DROP FOREIGN KEY SiteDate_siteId_fkey;
ALTER TABLE site                 DROP FOREIGN KEY Site_countyId_fkey;
ALTER TABLE site                 DROP FOREIGN KEY Site_stateId_fkey;
ALTER TABLE section              DROP FOREIGN KEY Section_siteId_fkey;
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
DROP TABLE IF EXISTS section;
DROP TABLE IF EXISTS sitedate;
DROP TABLE IF EXISTS sectionObservation;
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

/*
model Taxonomy {
model AppConfig {
model User {
model Organization {
model Role {
model Site {
model Section {
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
*/

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

```sql
select s.sitename, s.siteId
     , ( select case when count(o.section1) > 0 then 'Y' else 'N' end from sitedate d join sitedateobservation o on d.sitedateId = o.sitedateid where d.siteId = s.siteId and o.section1 is not null) s1
     , ( select case when count(o.section2) > 0 then 'Y' else 'N' end from sitedate d join sitedateobservation o on d.sitedateId = o.sitedateid where d.siteId = s.siteId and o.section2 is not null) s2
     , ( select case when count(o.section3) > 0 then 'Y' else 'N' end from sitedate d join sitedateobservation o on d.sitedateId = o.sitedateid where d.siteId = s.siteId and o.section3 is not null) s3
     , ( select case when count(o.section4) > 0 then 'Y' else 'N' end from sitedate d join sitedateobservation o on d.sitedateId = o.sitedateid where d.siteId = s.siteId and o.section4 is not null) s4
     , ( select case when count(o.section5) > 0 then 'Y' else 'N' end from sitedate d join sitedateobservation o on d.sitedateId = o.sitedateid where d.siteId = s.siteId and o.section5 is not null) s5
     , ( select case when count(o.section6) > 0 then 'Y' else 'N' end from sitedate d join sitedateobservation o on d.sitedateId = o.sitedateid where d.siteId = s.siteId and o.section6 is not null) s6
     , ( select case when count(o.section7) > 0 then 'Y' else 'N' end from sitedate d join sitedateobservation o on d.sitedateId = o.sitedateid where d.siteId = s.siteId and o.section7 is not null) s7
     , ( select case when count(o.section8) > 0 then 'Y' else 'N' end from sitedate d join sitedateobservation o on d.sitedateId = o.sitedateid where d.siteId = s.siteId and o.section8 is not null) s8
     , ( select case when count(o.section9) > 0 then 'Y' else 'N' end from sitedate d join sitedateobservation o on d.sitedateId = o.sitedateid where d.siteId = s.siteId and o.section9 is not null) s9
     , ( select case when count(o.section10) > 0 then 'Y' else 'N' end from sitedate d join sitedateobservation o on d.sitedateId = o.sitedateid where d.siteId = s.siteId and o.section10 is not null) s10
     , ( select case when count(o.section11) > 0 then 'Y' else 'N' end from sitedate d join sitedateobservation o on d.sitedateId = o.sitedateid where d.siteId = s.siteId and o.section11 is not null) s11
     , ( select case when count(o.section12) > 0 then 'Y' else 'N' end from sitedate d join sitedateobservation o on d.sitedateId = o.sitedateid where d.siteId = s.siteId and o.section12 is not null) s12
     , ( select case when count(o.section13) > 0 then 'Y' else 'N' end from sitedate d join sitedateobservation o on d.sitedateId = o.sitedateid where d.siteId = s.siteId and o.section13 is not null) s13
     , ( select case when count(o.section14) > 0 then 'Y' else 'N' end from sitedate d join sitedateobservation o on d.sitedateId = o.sitedateid where d.siteId = s.siteId and o.section14 is not null) s14
     , ( select case when count(o.section15) > 0 then 'Y' else 'N' end from sitedate d join sitedateobservation o on d.sitedateId = o.sitedateid where d.siteId = s.siteId and o.section15 is not null) s15
from site s

/*
| Alrutz Loop                    |     42 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y
| Armington Pond                 |      3 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y
| Battelle-Darby Creek           |     17 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y
| Beavercreek Wildlife Area      |     34 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y
| Blacklick Park                 |     35 | Y    | Y    | Y    | Y    | Y
| Caley Wildlife Area            |      1 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    |
| Castalia Quarry Reserve        |     23 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y
| Cincinnati Nature Center       |     28 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    |
| Clear Creek Metro Park         |     43 | Y    | Y    | Y    | Y    | Y    | Y
| Coshocton                      |     20 |
| Farbach-Werner                 |     19 |
| Girdled Road Park              |     11 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    |
| Greenacres Foundation          |     40 | Y    | Y    | Y    | Y    | Y
| Heston's Wood Lot              |     21 | Y    | Y    | Y    | Y    | Y    | Y    | Y
| Huntoon Road                   |      8 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    |
| Jackson Field                  |     14 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | N    | Y    | Y    | N    | N    | Y    |
| James McBride Arboretum        |     24 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y
| Jude's Butterfly Trail         |     37 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    |
| Kelleys Island - Bookerman Roa |     10 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    |
| Kelleys Island - Coleman Tract |     46 |
| Kiracofe Prairie               |     13 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | N    | Y
| Koelliker Fen                  |      5 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y
| Krebs Farm                     |     25 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y
| Lakeshore Reservation          |     16 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y
| Luce Creek                     |      6 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    |
| McLean Teddy Bear Park         |     48 |
| Mentor Marsh                   |     15 | N    | Y    | N    | Y    | Y    | Y    | N    | N    | N    | N    | N    | N    | N    | N    | N    |
| Naturealm                      |     12 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y
| NCR-Bluebird Field             |     29 | Y
| NCR-Maintenance Meadow         |     32 | Y
| NCR-Meadow/Marsh               |      4 | Y
| NCR-Rogers Road                |     30 | Y
| NCR-Strawberry Field           |     31 | Y
| Oak Openings                   |     26 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y
| OR79-147JER                    |     39 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y
| Osborne Park Area              |     22 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y
| Penitentiary Glen              |      7 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    |
| Resthaven Wildlife Area        |      9 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    |
| Shaker Trace Wetlands          |     47 | Y    | Y    | Y    | Y    | Y
| Terra Vista                    |      2 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y
| Thoreau Wildlife Sanctuary     |     45 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y 
| Top Of The World               |     27 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y
| Wilderness Center              |     18 | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y    | Y
*/
```

```sql
insert into section
(description, labelLong, labelShort, sectionIndex, siteId)
select concat('Section ', x.y) description
, concat('Section ', x.y) labelLong
, concat('S', x.y) labelShort
, x.y sectionIndex
, s.siteId
from site s
join (select 1 y
union select 2 y
union select 3 y
union select 4 y
union select 5 y
union select 6 y
union select 7 y
union select 8 y
union select 9 y
union select 10 y
union select 11 y
union select 12 y
union select 13 y
union select 14 y
union select 15 y) x;
```



