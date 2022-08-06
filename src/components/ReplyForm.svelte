<script lang="ts">
  import { slide } from "svelte/transition";
  import { isReplyingId, setIsReplyingId } from "../stores/comments.store";
  import { createReply } from "../stores/comments.store";
  import { currentUser } from "../stores/auth.store";
  import { clickOutside, focusEditable } from "../helpers";

  export let id: string;
  export let replyingTo: string;

  let editable: HTMLSpanElement | undefined;
  const defaultText = "";
  let textContent = defaultText;
  $: editing = $isReplyingId === id;
  $: if (editing && !!editable) (async () => focusEditable(editable))();
  $: if (!editing) {
    textContent = defaultText;
  }
  $: trimmed = textContent.trim();
  $: isEmpty = trimmed.length === 0;
  $: disabled = isEmpty || textContent === defaultText;

  const onBlur = () => setIsReplyingId(null);
  const onEdited = () => {
    if (!isEmpty) createReply(id, { content: trimmed, replyingTo });
    setIsReplyingId(null);
  };
</script>

{#if editing}
  <div transition:slide={{ duration: 150 }} class="card form-card">
    <div
      use:clickOutside={{ callback: onBlur, listen: editing }}
      on:click={() => editing && !!editable && focusEditable(editable)}
      class="editable-wrapper form-editable"
    >
      {#if !!replyingTo}
        <span class="editable-pre">@{replyingTo}</span>
      {/if}
      <span contenteditable="true" spellcheck="false" bind:this={editable} bind:textContent class="editable" />
    </div>
    <img src={$currentUser.user.image} alt="" class="form-img" />
    <button
      type="button"
      {disabled}
      aria-label="Create new comment"
      on:click|stopPropagation={onEdited}
      class="btn-lg btn-accent form-btn"
    >
      Send
    </button>
  </div>
{/if}
