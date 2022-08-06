import { tick } from "svelte";

export const focusEditable = async (editable: HTMLElement) => {
  // ---- Move cursor to the last character on focus: START ---- //
  const selection = window.getSelection();
  const range = document.createRange();
  selection?.removeAllRanges();
  range.selectNodeContents(editable);
  range.collapse(false);
  selection?.addRange(range);
  await tick();
  editable.focus();

  // ---- Move cursor to the last character on focus: END ---- //
};
