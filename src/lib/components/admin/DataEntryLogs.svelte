<script lang="ts">
  import { getContext } from "svelte";
  const logs = getContext("auditLog");
</script>

<table>
  <thead>
    <tr>
      <th>Action</th>
      <th>Entity</th>
      <th>User</th>
      <th>Time</th>
    </tr>
  </thead>
  <tbody>
    {#each logs as log}
      <tr>
        <td>{log.action}</td>
        <td>{log.entity} ({log.entityId})</td>
        <td>{log.userId || "Guest"}</td>
        <td>{new Date(log.createdAt).toLocaleString()}</td>
      </tr>
    {/each}
  </tbody>
</table>
