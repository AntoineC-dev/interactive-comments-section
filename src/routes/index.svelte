<script lang="ts">
  import { comments } from "../stores/comments.store";
  import { slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import Card from "../components/Card.svelte";
  import DeleteModal from "../components/DeleteModal.svelte";
  import CreateForm from "../components/CreateForm.svelte";
</script>

<svelte:head>
  <title>Frontend Mentor | Interactive comments section</title>
</svelte:head>

<main class="min-h-screen px-4 sm:px-6 py-4 sm:py-6 max-w-3xl mx-auto">
  {#each $comments as { replies, id, ...rest } (id)}
    <div animate:flip={{ duration: 150 }} transition:slide={{ duration: 150 }} class="mt-4 md:mt-6">
      <Card props={{ id, ...rest }} {replies} />
    </div>
  {/each}
  <CreateForm />
  <DeleteModal />
</main>
