import data from "../data/data.json";
import { v4 as uuid } from "uuid";
import type { Comment, Reply, User } from "../types";

interface JsonUser {
  image: { png: string; webp: string };
  username: string;
}

const splitWord = "images/";
const formatUser = (prev: JsonUser): User => {
  const image = prev.image.png.split(splitWord);
  return { ...prev, image: image.pop() as string };
};

export const formatCurrentUser = (): User => formatUser(data.currentUser);

export const formatComments = (): Comment[] => {
  return data.comments.map((comment) => {
    const user: User = formatUser(comment.user);
    if (comment.replies.length === 0) return { ...comment, id: uuid(), user, replies: [] };
    const replies = comment.replies.map((reply) => {
      const replyUser = formatUser(reply.user);
      return { ...reply, id: uuid(), user: replyUser };
    });
    return { ...comment, id: uuid(), user, replies };
  });
};
