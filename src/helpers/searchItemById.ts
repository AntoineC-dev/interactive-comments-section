import type { Comment } from "../types";

export const searchItemIndexById = (id: string, comments: Comment[]) => {
  let match: number[] | undefined = undefined;
  for (let i = 0; i < comments.length; i++) {
    if (!!match) break;
    const comment = comments[i];
    if (comment.id === id) {
      match = [i];
    } else {
      for (let j = 0; j < comment.replies.length; j++) {
        if (!!match) break;
        const reply = comment.replies[j];
        if (reply.id === id) {
          match = [i, j];
        }
      }
    }
  }
  return match;
};
