# ROADMAP
## 1. Sites
### a. Convert Site's "Person" to "Primary Contact".
### b. Add field for relation to site. E.g. land owner, park director, trustee, free text for other
### c. Make addresses optional and able to handle more than one, and by type.  E.g. Home, Mailing, Office x {1..n}
### d. Make phone numbers optional and able to handle more than one, and by type.  E.g. Mobile, Home, Office, Fax x {1..n}
## 2. Users
### a. Show days until expire.  Add expire now button to admin users list. I.e. force them to reset. (ADMIN+)
### b. Add enable/disable toggle (ADMIN+).
### c. Use paseto for direct login and shared authentication for OhioLeps users.
## 3. Checklists
### a. Allow admin to edit checklist and take from known list before adding add hoc
### b. Allow admin to edit full known list. (ADMIN+) * But not allowed to remove species in use
### c. Support more than one checklist per study.
### d. Support download (USER+)/upload (ADMIN+) of checklist.
### e. Support drawing from more than one full species list.  E.g. allow for mixed species types in list
## 4. SiteDateObservations
### a. Add support for non-specific entries.
### E.g. by genus or subfamily or common name group such as skippers.
      A smarter checklist should support this.
      Make it a configurable option at the site or checklist level.
### When selecting a species opt to prioritize or display subgroups by what has been seen in the current site/county previously.
## 5. Organization
### a. Create and support Study/Studies between Organziation and work to support multiple projects
### b. Support copy-from during create or administration of new study.
## 6. Known species
### a. Support download (USER+)/upload (SUPER) of system species lists. * But not allowed to remove species in use
### b. System can have more than one list.  E.g. Leps, Ods, Coenoptera, etc.
## 7. Ohio (and more)
### a. Add more State-region-county and other region maps.
### b. Create variation to select species and highlight counties with these.
## 8. Change history
### a. Keep showing who and when of create, last update and last review where useful.
### b. Consider tracking and saving changes to some generic table.  Maybe leave as is since there is currently simple "isDeleted" field that allows for easy delete and restore, but not really the history.
### c. This is not active data and do not treat as such.  This is more for forensics and as a last resort to address some catastrophe.  A DB restore is surely the easier fix.
## 9. Audit
### a. Email admins on any major (tbd) change.
### b. Log all login attempts.
### c. Log all configuration changes at site, study, organization, and system levels.
### d. Log all batch loads of checklists, species lists, and data.
## 10. Security
### a. Email admins on any suspicious activity.
### E.g.
        some count of logins to {admin, root, super} from same location - AND Block this IP at once.
        some count of logins to {admin, root, super} from anywhere in some period of time - AND These are likely to be working in concert, so block them all. 
### b. Consider geoblocking of IPs from enemy states and regions that have no reason to log in.
