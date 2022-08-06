export interface User {
  image: string;
  username: string;
}

export interface UserStore {
  user: User;
  upvotes: string[];
  downvotes: string[];
}

export interface Reply {
  id: string;
  content: string;
  createdAt: string | Date;
  score: number;
  replyingTo: string;
  user: User;
}
export type CardRequiredProps = Omit<Reply, "replyingTo">;

export interface Comment extends CardRequiredProps {
  replies: Reply[];
}

export type UpdateScoreOptions = "up" | "down";

export interface DeleteModalState {
  open: boolean;
  commentId: string | null;
}

export type LocalStorageKeys = "comments" | "user";

export interface CreateReplyProps {
  content: string;
  replyingTo: string;
}
