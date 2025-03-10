<script lang="ts">
  import type { Site, Section } from "@prisma/client";
  import type { SvelteComponent } from "svelte";
  import { getContext } from "svelte";
  import { getModalStore } from "@skeletonlabs/skeleton";

  let { parent }: { parent: SvelteComponent } = $props();

  const modalStore = getModalStore();
  const site = $modalStore[0].value as Site;

  let sections = $state(
    site.sections.map((s) => {
      const section = s;
      s.isEditing = false;
      return section;
    }),
  );

  function addChild() {
    sections.push({
      sectionIndex: 0,
      siteId: site.id,
      labelShort: "",
      labelLong: "",
      description: "",
      isEditing: true,
    });
  }

  function removeChildByIndex(index) {
    sections = [...sections.slice(0, index), ...sections.slice(index + 1)];
  }

  function removeChildById(id) {
    sections = sections.filter((s) => s.id !== id);
  }
</script>

{#if $modalStore[0]}
  <div class="p-4 space-y-4">
    <h2 class="text-xl font-bold">Transect Configuration</h2>

    <!-- Parent Name -->
    <div class="flex flex-row space-x-2 pl-4">
      <div>Parent Name:</div>
      <div>{site.siteName}</div>
    </div>

    <!-- Children Section -->
    <div class="border p-4 rounded-md space-y-2">
      <h2 class="text-lg">Transects</h2>
      {#each sections as section, index}
        <div class="flex space-x-2 items-center">
          <input
            type="number"
            bind:value={section.sectionIndex}
            placeholder="Idx"
            class="border p-2 w-16"
          />
          <input
            type="text"
            bind:value={section.labelShort}
            placeholder="T#"
            class="border p-2 w-12"
          />
          <input
            type="text"
            bind:value={section.labelLong}
            placeholder="Transect #"
            class="border p-2 w-20"
          />
          <input
            type="text"
            bind:value={section.description}
            placeholder="Description"
            class="border p-2 min-w-24"
          />
          {#if !section.isEditing}
            <button type="button" class="bg-orange-300 text-white p-2 rounded"
              >Edit</button
            >
          {:else}
            <button type="button" class="bg-green-500 text-white p-2 rounded"
              >Save</button
            >
          {/if}
          {#if section.id !== BigInt(0)}
            <button
              type="button"
              class="bg-red-500 text-white p-2 rounded"
              onclick={removeChildById(section.id)}>Remove</button
            >
          {:else}
            <button
              type="button"
              class="bg-red-500 text-white p-2 rounded"
              onclick={removeChildByIndex(index)}>Remove</button
            >
          {/if}
        </div>
      {/each}

      <button
        type="button"
        class="bg-blue-500 text-white p-2 rounded"
        onclick={addChild}>Add Child</button
      >
    </div>
    <!-- onclick={() => removeChild(section.sectionIndex)} -->

    <footer class={parent.regionFooter}>
      <button class="btn {parent.buttonNeutral}" onclick={parent.onClose}
        >{parent.buttonTextCancel}</button
      >
      <!-- <button class="btn {parent.buttonPositive}" onclick={onFormSubmit} -->
      <!--   >Submit Form</button -->
      <!-- > -->
    </footer>
  </div>
{/if}
