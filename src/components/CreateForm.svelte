<script lang="ts">
  import { createComment } from "../stores/comments.store";
  import { currentUser } from "../stores/auth.store";
  import { clickOutside } from "../helpers";
  import { useToggleState } from "../hooks";

  const defaultText = "Add a comment...";
  let textContent = defaultText;
  const [editing, toggleEditing] = useToggleState(false);

  $: if (!$editing && textContent !== defaultText) {
    textContent = defaultText;
  } else if ($editing && textContent === defaultText) {
    textContent = "";
  }
  $: trimmed = textContent.trim();
  $: isEmpty = trimmed.length === 0;
  $: disabled = isEmpty || textContent === defaultText;

  const onFocus = () => toggleEditing(true);
  const onBlur = () => toggleEditing(false);
  const onEdited = () => {
    if (!isEmpty) createComment({ content: trimmed, user: $currentUser.user });
    toggleEditing(false);
  };
</script>

<div class="card form-card">
  <p
    contenteditable="true"
    spellcheck="false"
    use:clickOutside={{ callback: onBlur, listen: $editing }}
    on:focus={onFocus}
    bind:textContent
    class="editable-wrapper editable form-editable"
  />
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
