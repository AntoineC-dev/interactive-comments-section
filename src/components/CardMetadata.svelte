<script lang="ts">
  import { formatDistanceToNow, isDate } from "date-fns";
  import { currentUser } from "../stores/auth.store";
  import type { User } from "../types";

  export let user: User;
  export let createdAt: string | Date;

  const date = isDate(createdAt) ? formatDistanceToNow(createdAt as Date) : createdAt;
</script>

<div class="flex items-center gap-3 flex-wrap">
  <!-- Avatar -->
  <img src={user.image} alt="" class="w-8" />
  <!-- Username -->
  <span class="font-medium text-neutral-500">{user.username}</span>
  <!-- Badge -->
  {#if user.username === $currentUser.user.username}
    <span
      class="bg-accent px-2 py-[0.125rem] rounded-sm
     text-neutral-100 text-sm leading-tight">you</span
    >
  {/if}
  <!-- Date -->
  <span class="whitespace-nowrap">{date}</span>
</div>
