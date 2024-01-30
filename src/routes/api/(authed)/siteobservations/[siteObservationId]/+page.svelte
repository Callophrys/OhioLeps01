<script lang="ts">
    export let data;
    console.log(data);
</script>

<div>
    <div>{data.siteObservation.checklist.scientificName}</div>
    <div>Hodges: {data.siteObservation.hodges}</div>
    <div>Id Code: {data.siteObservation.idCode}</div>
    <div>Section 1: {@html data.siteObservation.section1 ?? '&varnothing;'}</div>
    <div>Section 2: {@html data.siteObservation.section2 ?? '&varnothing;'}</div>
    <div>Section 3: {@html data.siteObservation.section3 ?? '&varnothing;'}</div>
    <div>Section 4: {@html data.siteObservation.section4 ?? '&varnothing;'}</div>
    <div>Section 5: {@html data.siteObservation.section5 ?? '&varnothing;'}</div>
    <div>Section 6: {@html data.siteObservation.section6 ?? '&varnothing;'}</div>
    <div>Section 7: {@html data.siteObservation.section7 ?? '&varnothing;'}</div>
    <div>Section 8: {@html data.siteObservation.section8 ?? '&varnothing;'}</div>
    <div>Section 9: {@html data.siteObservation.section9 ?? '&varnothing;'}</div>
    <div>Section 10: {@html data.siteObservation.section10 ?? '&varnothing;'}</div>
    <div>Section 11: {@html data.siteObservation.section11 ?? '&varnothing;'}</div>
    <div>Section 12: {@html data.siteObservation.section12 ?? '&varnothing;'}</div>
    <div>Section 13: {@html data.siteObservation.section13 ?? '&varnothing;'}</div>
    <div>Section 14: {@html data.siteObservation.section14 ?? '&varnothing;'}</div>
    <div>Section 15: {@html data.siteObservation.section15 ?? '&varnothing;'}</div>
    <div>Created At: {data.siteObservation.createdAt}</div>
    <div>Created By: {data.siteObservation.createdBy}</div>
    <div>Updated At: {data.siteObservation.updatedAt ?? ''}</div>
    <div>Updated By: {data.siteObservation.updatedBy ?? ''}</div>
    <div>Confirm At: {data.siteObservation.confirmAt ?? ''}</div>
    <div>Confirm By: {data.siteObservation.confirmBy ?? ''}</div>
</div>
