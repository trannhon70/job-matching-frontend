"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";

const useIsMobileConversation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const isLobbyConversation = useMemo(() => {
    const lastPath = pathname.split("/").pop();
    return lastPath === "contact";
  }, [pathname]);
  return { isMobile, isLobbyConversation };
};

export default useIsMobileConversation;
