import { writable } from "svelte/store";

export const useToggleState = (initial?: boolean) => {
  const state = writable<boolean>(initial ?? false);
  const toggle = (next?: boolean) => state.update((prev) => (next === undefined ? !prev : next));

  return [state, toggle] as const;
};
