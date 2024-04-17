import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useQueryString = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const goToRouterQueryString = (
    pathname: string,
    keyQuery: string,
    valueQuery: string,
  ) => {
    return router.push(
      pathname + "?" + createQueryString(keyQuery, valueQuery),
    );
  };
  return { createQueryString, goToRouterQueryString };
};

export default useQueryString;
