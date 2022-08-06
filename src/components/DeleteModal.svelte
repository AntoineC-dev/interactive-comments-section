<script lang="ts">
  import { fly } from "svelte/transition";
  import { deleteModal, closeDeleteModal } from "../stores/deleteModal.store";
  import { deleteItem } from "../stores/comments.store";

  const onDelete = () => {
    if ($deleteModal.commentId) {
      deleteItem($deleteModal.commentId);
      closeDeleteModal();
    }
  };
</script>

{#if $deleteModal.open}
  <div
    transition:fly={{ duration: 150 }}
    class="fixed top-0 left-0 w-full h-screen p-4 flex justify-center items-center bg-neutral-400/70"
  >
    <div class="flex flex-col gap-4 px-6 pb-6 pt-8 max-w-[22rem] bg-neutral-100 rounded-lg">
      <p class="text-2xl font-medium text-neutral-500">Delete comment</p>
      <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
      <div class="flex justify-between gap-2">
        <button
          on:click={closeDeleteModal}
          type="button"
          aria-label="Do not delete comment"
          class="btn btn-lg btn-neutral whitespace-nowrap">No, Cancel</button
        >
        <button
          on:click={onDelete}
          type="button"
          aria-label="Proceed to delete comment"
          class="btn btn-lg btn-danger whitespace-nowrap">Yes, Delete</button
        >
      </div>
    </div>
  </div>
{/if}
