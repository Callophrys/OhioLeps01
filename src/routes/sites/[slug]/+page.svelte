<script lang="ts">
	import { formatDate } from '$lib/utils'
    export let data
</script>

<hgroup>
  <h1>{data.site.siteName}</h1>
  <h2>{formatDate(data.site.changeDate)}</h2>
</hgroup>

<h2>Check out this site</h2>

<div class="content">
  <div>siteName: {@html data.site.siteName ?? ''}</div>
<div>county: {@html data.site.county ?? ''}</div>
<div>township: {@html data.site.township ?? ''}</div>
<div>locationZip: {@html data.site.locationZip ?? ''}</div>
<div>siteAddress: {@html data.site.siteAddress ?? ''}</div>
<div>siteAddress2: {@html data.site.siteAddress2 ?? ''}</div>
<div>siteCityStateZip: {@html data.site.siteCityStateZip ?? ''}</div>
<div>person: {@html data.site.person ?? ''}</div>
<div>address: {@html data.site.address ?? ''}</div>
<div>address2: {@html data.site.address2 ?? ''}</div>
<div>cityStateZip: {@html data.site.cityStateZip ?? ''}</div>
<div>phone: {@html data.site.phone ?? ''}</div>
<div>email: {@html data.site.email ?? ''}</div>
<div>latitudeStart: {@html data.site.latitudeStart ?? ''}</div>
<div>latitudeEnd: {@html data.site.latitudeEnd ?? ''}</div>
<div>altPerson: {@html data.site.altPerson ?? ''}</div>
<div>altAddress: {@html data.site.altAddress ?? ''}</div>
<div>altAddress2: {@html data.site.altAddress2 ?? ''}</div>
<div>altCityStateZip: {@html data.site.altCityStateZip ?? ''}</div>
<div>altPhone: {@html data.site.altPhone ?? ''}</div>
<div>altEmail: {@html data.site.altEmail ?? ''}</div>
<div>otherParticipants: {@html data.site.otherParticipants ?? ''}</div>
<div>description: {@html data.site.description ?? ''}</div>
<div>s1995: {@html data.site.s1995 ?? ''}</div>
<div>s1996: {@html data.site.s1996 ?? ''}</div>
<div>s1997: {@html data.site.s1997 ?? ''}</div>
<div>s1998: {@html data.site.s1998 ?? ''}</div>
<div>s1999: {@html data.site.s1999 ?? ''}</div>
<div>s2000: {@html data.site.s2000 ?? ''}</div>
<div>s2001: {@html data.site.s2001 ?? ''}</div>
<div>s2002: {@html data.site.s2002 ?? ''}</div>
<div>s2003: {@html data.site.s2003 ?? ''}</div>
<div>s2004: {@html data.site.s2004 ?? ''}</div>
<div>changeDate: {@html data.site.changeDate ?? ''}</div>
<!--
<div>stateCounty: {@html data.site.stateCounty}</div>
<div>stateCountyId: {@html data.site.stateCountyId}</div>
-->
</div>
