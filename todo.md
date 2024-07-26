
# TODO: Figure out edit history
# TODO: hook up checklists to taxonomy
# TODO: think views to better fetch and compute data, e.g. all checklists to a site

# TODO
----
Make sure a single click on a county on Ohio page can toggle a single county
Switching from country filter to not filtered should effect the selected site appropriately - Q: left site showing on change to another country?  Or set to first of county or empty if country possesses no sites.
Admin section - edit, reset users, etc
User admin - update details, set avatar picture

Make browsing easy for non-researchers
Tie to gardening
Hide site contacts from public

# TODO:
---
Assure navigation and sitedate controls are working in SiteDate and SDO pages, and others too.
The head, body, and tail parts of Container are all same - so snippitafy these into one thing.
Snippitafy double container - think unifying both into one flexy thing.
Move "View All" of SDO into DataOption control item
"Recently Updated" option of DataOption control (1) needs to do something or hide it (2) could be extended to show a data range dropdown or somethi
Support selection of SDO multi-record so a point of reference is maintained when going from multi to single mode.

# TODO
---
Fix cancel on add site and add site date

# TODO
---
Convert species picker to Svelte5

# TODO
---
Fix lock-unlock and unlock-lock where 1st use works but second loses the sdo.id

# TODO
---
SiteDatePicker from SDO seems to not work, at least on left or right arrow clicks.  Dropdown on weeks looks okay.
SiteDatePicker from SD is empty - not working at all

# TODO
---
Converted all table keys from <table name>Id to just id.  Makes working with the database nicer but it makes it harder to tell
when app code should use "id" or the named id.  Revisit this.
