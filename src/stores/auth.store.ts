import type { UserStore } from "../types";
import { writable } from "svelte/store";
import { formatCurrentUser, getInitialData, persistData } from "../helpers";

const defaultValue: UserStore = {
  user: formatCurrentUser(),
  upvotes: [],
  downvotes: [],
};

export const currentUser = writable<UserStore>(getInitialData({ defaultValue, key: "user" }));
currentUser.subscribe((data) => persistData({ data, key: "user" }));
export const addUpvoteToCurrentUser = (id: string) =>
  currentUser.update((prev) => {
    const index = prev.downvotes.indexOf(id);
    if (index !== -1) {
      const downvotes = [...prev.downvotes];
      downvotes.splice(index, 1);
      return { ...prev, downvotes };
    } else {
      return { ...prev, upvotes: [...prev.upvotes, id] };
    }
  });
export const addDownvoteToCurrentUser = (id: string) =>
  currentUser.update((prev) => {
    const index = prev.upvotes.indexOf(id);
    if (index !== -1) {
      const upvotes = [...prev.upvotes];
      upvotes.splice(index, 1);
      return { ...prev, upvotes };
    } else {
      return { ...prev, downvotes: [...prev.upvotes, id] };
    }
  });
