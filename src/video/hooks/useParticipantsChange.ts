import { useMount } from "@/hooks/common";
import { ParticipantType, ZoomClient } from "@/lib/zoomVideoSdk";
import { useCallback, useEffect, useRef } from "react";
import { CellLayout } from "../video-types";
export function useParticipantsChange(
  zmClient: ZoomClient,
  fn: (
    participants: ParticipantType[],
    updatedParticipants?: ParticipantType[],
  ) => void,
  layout?: CellLayout[],
) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const callback = useCallback(
    (updatedParticipants?: ParticipantType[]) => {
      const participants = zmClient.getAllUser();
      fnRef.current?.(participants, updatedParticipants);
    },
    [zmClient],
  );
  useEffect(() => {
    zmClient.on("user-added", callback);
    zmClient.on("user-removed", callback);
    zmClient.on("user-updated", callback);
    return () => {
      zmClient.off("user-added", callback);
      zmClient.off("user-removed", callback);
      zmClient.off("user-updated", callback);
    };
  }, [zmClient, callback]);

  useEffect(() => {
    callback();
  }, [layout, callback]);

  useMount(() => {
    callback();
  });
}
