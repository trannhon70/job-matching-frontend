/* eslint-disable */
import { useEffect, useRef } from "react";

export function useUnmount(fn: any) {
  const fnRef = useRef<any>(fn);
  fnRef.current = fn;
  useEffect(
    () => () => {
      if (fnRef.current) {
        fnRef.current();
      }
    },
    []
  );
}

export function useMount(fn: any) {
  useEffect(() => {
    fn();
  }, []);
}
