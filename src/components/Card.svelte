<script lang="ts">
  import { slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import type { CardRequiredProps, Reply } from "../types";
  import CardContent from "./CardContent.svelte";
  import CardMetadata from "./CardMetadata.svelte";
  import CardActions from "./CardActions.svelte";
  import CardScore from "./CardScore.svelte";
  import ReplyForm from "./ReplyForm.svelte";

  export let props: CardRequiredProps;
  export let replyingTo: string | undefined = undefined;
  export let replies: Reply[] = [];
</script>

<div>
  <div class="card grid-rows-[auto_1fr_auto] md:grid-rows-[auto_1fr] grid-cols-[auto_1fr_auto] gap-4 md:gap-x-6">
    <!-- Metadata -->
    <div class="col-span-3 md:col-start-2 md:col-span-1">
      <CardMetadata user={props.user} createdAt={props.createdAt} />
    </div>
    <!-- Content -->
    <div class="col-span-3 md:col-span-2">
      <CardContent id={props.id} content={props.content} {replyingTo} />
    </div>
    <!-- Vote -->
    <div class="col-span-1 md:row-span-2 md:row-start-1">
      <CardScore id={props.id} score={props.score} />
    </div>
    <!-- Reply -->
    <div class="col-span-1 col-start-3 md:row-start-1 place-self-center">
      <CardActions id={props.id} user={props.user} />
    </div>
  </div>
  <ReplyForm id={props.id} replyingTo={props.user.username} />
</div>
{#if replies.length !== 0}
  <div class="flex">
    <div class="shrink-0 w-[2px] rounded-xl bg-neutral-300 mr-4 md:mx-8 mt-4 md:mt-6 md:mb-4" />
    <div class="grow">
      {#each replies as { replyingTo, id, ...rest } (id)}
        <div animate:flip={{ duration: 150 }} transition:slide={{ duration: 150 }} class="mt-4 md:mt-6">
          <svelte:self props={{ id, ...rest }} {replyingTo} />
        </div>
      {/each}
    </div>
  </div>
{/if}
