import { useCallback, type MutableRefObject, type Ref, type RefCallback } from "react";

export const useMergeRefs = <T>(
  ...refs: (Ref<T> | undefined)[]
): RefCallback<T> => {
    return useCallback(
        (value: T | null) => {
            for (const ref of refs) {
            if (!ref) continue;

            if (typeof ref === "function") {
                ref(value);
            } else {
                (ref as MutableRefObject<T | null>).current = value;
            }
            }
        },
        [refs]
    ); 
}