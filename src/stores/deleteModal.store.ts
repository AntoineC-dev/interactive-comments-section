import type { DeleteModalState } from "../types";
import { writable } from "svelte/store";

const initialValue: DeleteModalState = {
  open: false,
  commentId: null,
};

export const deleteModal = writable<DeleteModalState>(initialValue);

export const showDeleteModal = (commentId: string) => deleteModal.set({ open: true, commentId });
export const closeDeleteModal = () => deleteModal.set({ open: false, commentId: null });
