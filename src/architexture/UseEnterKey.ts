import { useEffect, useRef } from "react";

export function useEnterKey(
  active: boolean,
  handler: () => void
) {
  const handlerRef = useRef(handler);

  // keep latest handler without re binding the listener
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!active) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handlerRef.current();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);
}