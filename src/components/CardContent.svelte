<script lang="ts">
  import { isEditingId, setIsEditingId, updateContent } from "../stores/comments.store";
  import { clickOutside, focusEditable } from "../helpers";

  export let id: string;
  export let replyingTo: string | undefined = undefined;
  export let content: string;

  let editable: HTMLSpanElement | undefined;
  let textContent: string = content;

  $: trimmed = textContent.trim();
  $: isEmpty = trimmed.length === 0;

  $: isEditing = $isEditingId === id;
  $: if (isEditing && !!editable) (async () => focusEditable(editable))();
  const onClickOutside = () => {
    textContent = content;
    setIsEditingId(null);
  };

  const onEdited = () => {
    if (trimmed !== content) {
      updateContent(id, trimmed);
    } else if (isEmpty) {
      textContent = content;
    }
    setIsEditingId(null);
  };
</script>

<div class="flex flex-col gap-4">
  {#if isEditing}
    <div
      use:clickOutside={{ callback: onClickOutside, listen: isEditing }}
      on:click={() => isEditing && !!editable && focusEditable(editable)}
      class="editable-wrapper"
    >
      {#if replyingTo}
        <span class="editable-pre">@{replyingTo}</span>
      {/if}
      <span contenteditable="true" spellcheck="false" bind:this={editable} bind:textContent class="editable" />
    </div>
    <button
      on:click|preventDefault|stopPropagation={onEdited}
      type="button"
      disabled={isEmpty}
      aria-label="Save changes"
      class="btn-lg btn-accent self-end">Update</button
    >
  {:else}
    <div>
      {#if replyingTo}
        <span class="text-accent font-medium">@{replyingTo}</span>
      {/if}
      <span>{content}</span>
    </div>
  {/if}
</div>
