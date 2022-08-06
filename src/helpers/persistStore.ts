import { browser } from "$app/env";
import type { LocalStorageKeys } from "../types";

export const getInitialData = ({ defaultValue, key }: { defaultValue: unknown; key: LocalStorageKeys }) => {
  if (!browser) return defaultValue;
  const json = window.localStorage.getItem(key);
  return json === null ? defaultValue : JSON.parse(json);
};

export const persistData = ({ data, key }: { data: unknown; key: LocalStorageKeys }) => {
  if (!browser) return;
  window.localStorage.setItem(key, JSON.stringify(data));
};
