/* eslint-disable */
import {
  default as ZoomContext,
  default as ZoomMediaContext,
} from "@/contexts/media-context";
import classnames from "classnames";
import { useContext, useRef, useState } from "react";
import Avatar from "./components/avatar";
import Pagination from "./components/pagination";
import RemoteCameraControlPanel from "./components/remote-camera-control";
import ReportBtn from "./components/report-btn";
import ShareView from "./components/share-view";
import VideoFooter from "./components/video-footer";
import AvatarActionContext from "./context/avatar-context";
import { useAvatarAction } from "./hooks/useAvatarAction";
import { useActiveVideo } from "./hooks/useAvtiveVideo";
import { useCanvasDimension } from "./hooks/useCanvasDimension";
import { useGalleryLayout } from "./hooks/useGalleryLayout";
import { useNetworkQuality } from "./hooks/useNetworkQuality";
import { usePagination } from "./hooks/usePagination";

import "./video.scss";
const VideoContainer = () => {
  const zmClient = useContext(ZoomContext);
  const {
    mediaStream,
    video: { decode: isVideoDecodeReady },
  } = useContext(ZoomMediaContext);
  const videoRef = useRef<HTMLCanvasElement | null>(null);
  const shareViewRef = useRef<{
    selfShareRef: HTMLCanvasElement | HTMLVideoElement | null;
  }>(null);
  const [isRecieveSharing, setIsRecieveSharing] = useState(false);
  const canvasDimension = useCanvasDimension(mediaStream, videoRef);
  const activeVideo = useActiveVideo(zmClient as any);
  const { page, pageSize, totalPage, totalSize, setPage } = usePagination(
    zmClient as any,
    canvasDimension,
  );

  const { visibleParticipants, layout: videoLayout } = useGalleryLayout(
    zmClient as any,
    mediaStream,
    isVideoDecodeReady,
    videoRef,
    canvasDimension,
    {
      page,
      pageSize,
      totalPage,
      totalSize,
    },
  );
  const avatarActionState = useAvatarAction(
    zmClient as any,
    visibleParticipants,
  );
  const networkQuality = useNetworkQuality(zmClient as any);
  return (
    <div className="viewport z-50">
      <ShareView
        ref={shareViewRef}
        onRecieveSharingChange={setIsRecieveSharing}
      />
      <div
        className={classnames("video-container", {
          "video-container-in-sharing": isRecieveSharing,
        })}
      >
        <canvas
          className="video-canvas"
          id="video-canvas"
          width="800"
          height="600"
          ref={videoRef}
        />
        <AvatarActionContext.Provider value={avatarActionState}>
          <ul className="avatar-list">
            {visibleParticipants.map((user, index) => {
              if (index > videoLayout.length - 1) {
                return null;
              }
              const dimension = videoLayout[index];
              const { width, height, x, y } = dimension;
              const { height: canvasHeight } = canvasDimension;
              return (
                <Avatar
                  participant={user}
                  key={user.userId}
                  isActive={activeVideo === user.userId}
                  networkQuality={networkQuality[`${user.userId}`]}
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    top: `${canvasHeight - y - height}px`,
                    left: `${x}px`,
                  }}
                />
              );
            })}
          </ul>
          <RemoteCameraControlPanel />
        </AvatarActionContext.Provider>
      </div>
      <VideoFooter
        className="video-operations"
        sharing
        selfShareCanvas={shareViewRef.current?.selfShareRef}
      />

      {totalPage > 1 && (
        <Pagination
          page={page}
          totalPage={totalPage}
          setPage={setPage}
          inSharing={isRecieveSharing}
        />
      )}
      <ReportBtn />
    </div>
  );
};

export default VideoContainer;
