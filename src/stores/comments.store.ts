import { writable } from "svelte/store";
import { v4 as uuid } from "uuid";
import { formatComments } from "../helpers/data.helpers";
import { currentUser as storeUser, addDownvoteToCurrentUser, addUpvoteToCurrentUser } from "./auth.store";
import type { Comment, CreateReplyProps, UpdateScoreOptions, User, UserStore } from "../types";
import { getInitialData, persistData, searchItemIndexById } from "../helpers";

let currentUser: UserStore;
storeUser.subscribe((value) => {
  currentUser = value;
});

const defaultValue: Comment[] = formatComments();

export const comments = writable<Comment[]>(getInitialData({ defaultValue, key: "comments" }));
comments.subscribe((data) => persistData({ data, key: "comments" }));

export const isEditingId = writable<string | null>(null);
export const isReplyingId = writable<string | null>(null);

export const setIsEditingId = (id: string | null) => isEditingId.set(id);
export const setIsReplyingId = (id: string | null) => isReplyingId.set(id);

export const updateScore = (id: string, option: UpdateScoreOptions) =>
  comments.update((prev) => {
    const match = searchItemIndexById(id, prev);
    // ---- Not found --- //
    if (!match) return prev;
    // ---- Prevent user from downvoting/upvoting twice ---- //
    const { downvotes, upvotes } = currentUser;
    if ((option === "up" && upvotes.includes(id)) || (option === "down" && downvotes.includes(id))) return prev;
    // --- Proceed to update ---- //
    const comments = [...prev];
    if (match.length === 2) {
      if (option === "down" && comments[match[0]].replies[match[1]].score === 0) return prev;
      option === "up" ? comments[match[0]].replies[match[1]].score++ : comments[match[0]].replies[match[1]].score--;
    } else {
      if (option === "down" && comments[match[0]].score === 0) return prev;
      option === "up" ? comments[match[0]].score++ : comments[match[0]].score--;
    }
    // ---- Update current user ---- //
    option === "up" ? addUpvoteToCurrentUser(id) : addDownvoteToCurrentUser(id);
    return comments;
  });

export const updateContent = (id: string, content: string) =>
  comments.update((prev) => {
    const match = searchItemIndexById(id, prev);
    // ---- Not found --- //
    if (!match) return prev;
    // --- Proceed to update ---- //
    const comments = [...prev];
    if (match.length === 2) {
      comments[match[0]].replies[match[1]].content = content;
    } else {
      comments[match[0]].content = content;
    }
    return comments;
  });

export const deleteItem = (id: string) =>
  comments.update((prev) => {
    const match = searchItemIndexById(id, prev);
    // ---- Not found --- //
    if (!match) return prev;
    // --- Proceed to update ---- //
    const comments = [...prev];
    if (match.length === 2) {
      comments[match[0]].replies.splice(match[1], 1);
    } else {
      comments.splice(match[0], 1);
    }
    return comments;
  });

export const createReply = (id: string, { content, replyingTo }: CreateReplyProps) =>
  comments.update((prev) => {
    const match = searchItemIndexById(id, prev);
    // ---- Not found --- //
    if (!match) return prev;
    // --- Proceed to update ---- //
    const comments = [...prev];
    comments[match[0]].replies.push({
      id: uuid(),
      content,
      createdAt: new Date(),
      replyingTo,
      user: currentUser.user,
      score: 0,
    });
    return comments;
  });

export const createComment = ({ content, user }: { content: string; user: User }) => {
  return comments.update((prev) => [
    ...prev,
    { id: uuid(), content, user, createdAt: new Date(), replies: [], score: 0 },
  ]);
};
