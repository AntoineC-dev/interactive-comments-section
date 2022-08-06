export interface ClickOutsideProps {
  callback: () => void;
  listen: boolean;
}

export function clickOutside(element: Element, { callback, listen }: ClickOutsideProps) {
  function onClick(event: MouseEvent) {
    if (!element.contains(event.target as Node)) callback();
  }

  if (listen) document.body.addEventListener("click", onClick);

  return {
    update(newProps: ClickOutsideProps) {
      callback = newProps.callback;
      if (newProps.listen === listen) return;
      listen = newProps.listen;
      listen ? document.body.addEventListener("click", onClick) : document.body.removeEventListener("click", onClick);
    },
    destroy() {
      document.body.removeEventListener("click", onClick);
    },
  };
}
