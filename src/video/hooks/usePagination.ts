import { useMount } from "@/hooks/common";
import { ZoomClient } from "@/lib/zoomVideoSdk";
import { useCallback, useEffect, useState } from "react";
import { maxViewportVideoCounts } from "../video-layout-helper";
import { Dimension } from "../video-types";
const MAX_NUMBER_PER_PAGE = 9;
export function usePagination(zmClient: ZoomClient, dimension: Dimension) {
  const [page, setPage] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [pageSize, setPageSize] = useState(MAX_NUMBER_PER_PAGE);

  useEffect(() => {
    const size = Math.min(
      MAX_NUMBER_PER_PAGE,
      maxViewportVideoCounts(dimension.width, dimension.height),
    );
    setPageSize(size);
  }, [dimension]);
  const onParticipantsChange = useCallback(() => {
    setTotalSize(
      zmClient.getAllUser().filter((i) => i.displayName !== "ADMIN").length,
    );
  }, [zmClient]);
  useEffect(() => {
    zmClient.on("user-added", onParticipantsChange);
    zmClient.on("user-removed", onParticipantsChange);
    zmClient.on("user-updated", onParticipantsChange);
    return () => {
      zmClient.off("user-added", onParticipantsChange);
      zmClient.off("user-removed", onParticipantsChange);
      zmClient.off("user-updated", onParticipantsChange);
    };
  }, [zmClient, onParticipantsChange]);
  useMount(() => {
    setTotalSize(
      zmClient.getAllUser().filter((i) => i.displayName !== "ADMIN").length,
    );
  });
  return {
    page,
    totalPage: Math.ceil(totalSize / pageSize),
    pageSize,
    totalSize,
    setPage,
  };
}
