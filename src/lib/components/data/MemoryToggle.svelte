<script lang="ts">
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import { untrack } from 'svelte';
    //TODO: See why temp and wind speed don't default right in site date
    //TODO: Get default from Organization default or User options - if and/or once those exist
    let {
        toggleItem = $bindable(),
        toggleName,
        toggleList,
    }: {
        toggleItem: string;
        toggleName: string;
        toggleList: { [key: string]: string };
    } = $props();

    const keys = Object.keys(toggleList);
    const values = Object.values(toggleList);

    $effect(() => {
        let localItem = localStorage.getItem(toggleName) ?? untrack(() => toggleItem);
        toggleItem = localItem;
    });

    $effect(() => {
        localStorage.setItem(toggleName, toggleItem);
    });
</script>

<div class="scale-75 origin-right">
    <RadioGroup name="toggle-group" active="variant-filled-primary" hover="hover:variant-soft-primary">
        <RadioItem bind:group={toggleItem} name="toggle" value={keys[0]}>{@html values[0]}</RadioItem>
        <RadioItem bind:group={toggleItem} name="toggle" value={keys[1]}>{@html values[1]}</RadioItem>
    </RadioGroup>
</div>
