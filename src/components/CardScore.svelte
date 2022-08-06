<script lang="ts">
  import { updateScore } from "../stores/comments.store";
  import { currentUser } from "../stores/auth.store";

  export let score: number;
  export let id: string;

  const upvote = () => updateScore(id, "up");
  const downvote = () => updateScore(id, "down");

  $: upvoted = $currentUser.upvotes.includes(id);
  $: downvoted = $currentUser.downvotes.includes(id);

  $: upvoteFill = upvoted ? "fill-accent-soft/30" : "fill-accent-soft";
  $: downvoteFill = downvoted ? "fill-accent-soft/30" : "fill-accent-soft";
</script>

<div
  class="rounded-xl bg-neutral-200 flex md:flex-col justify-between items-center overflow-hidden min-w-[6.25rem] md:min-w-max"
>
  <!-- Upvote -->
  <button
    type="button"
    disabled={upvoted}
    aria-label="Upvote comment"
    on:click={upvote}
    class="w-10 h-10 grid place-items-center rounded-xl {upvoteFill} [@media(hover:hover)]:hover:enabled:fill-accent transition-colors"
  >
    <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"
      ><path
        d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
      /></svg
    >
    <!-- <img src={plus} alt="" /> -->
  </button>
  <!-- Score -->
  <span class="text-accent font-medium text-lg">{score}</span>
  <!-- Downvote -->
  <button
    type="button"
    disabled={downvoted}
    aria-label="Downvote comment"
    on:click={downvote}
    class="w-10 h-10 grid place-items-center rounded-xl {downvoteFill} [@media(hover:hover)]:hover:enabled:fill-accent transition-colors"
  >
    <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"
      ><path
        d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
      /></svg
    >
  </button>
</div>
