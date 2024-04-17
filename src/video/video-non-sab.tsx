/* eslint-disable */

import ZoomMediaContext from "@/contexts/media-context";
import ZoomContext from "@/contexts/zoom-context";
import classnames from "classnames";
import { useContext, useEffect, useRef, useState } from "react";
import Avatar from "./components/avatar";
import Pagination from "./components/pagination";
import RemoteCameraControlPanel from "./components/remote-camera-control";
import ShareView from "./components/share-view";
import VideoFooter from "./components/video-footer";
import AvatarActionContext from "./context/avatar-context";
import { useAvatarAction } from "./hooks/useAvatarAction";
import { useActiveVideo } from "./hooks/useAvtiveVideo";
import { useCanvasDimension } from "./hooks/useCanvasDimension";
import { useGalleryLayout } from "./hooks/useGalleryLayout";
import { useNetworkQuality } from "./hooks/useNetworkQuality";
import { usePagination } from "./hooks/usePagination";

import { SELF_VIDEO_ID } from "./video-constants";
import "./video.scss";

interface SelfViewContainer {
  id: string;
  className: string;
  style?: Record<string, any>;
  isRenderSelfViewWithVideoElement: boolean;
}
function getStyleAttributeNumericalValue(attr: string) {
  const v = /(\d+)/.exec(attr)?.[1];
  return v ? Number(v) : 0;
}
function SelfViewContainer(props: SelfViewContainer) {
  const { isRenderSelfViewWithVideoElement, ...restProps } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { style } = restProps;
  const { mediaStream } = useContext(ZoomMediaContext);
  useEffect(() => {
    if (!isRenderSelfViewWithVideoElement && canvasRef.current && style) {
      const width = getStyleAttributeNumericalValue(style.width);
      const height = getStyleAttributeNumericalValue(style.height);

      try {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      } catch (e) {
        // mediaStream?.updateVideoCanvasDimension(
        //   canvasRef.current,
        //   width,
        //   height
        // );
      }
    }
  }, [isRenderSelfViewWithVideoElement, style, mediaStream]);

  return isRenderSelfViewWithVideoElement ? (
    <video {...restProps} />
  ) : (
    <canvas ref={canvasRef} {...restProps} />
  );
}
const VideoContainer = () => {
  const zmClient = useContext(ZoomContext);
  const {
    mediaStream,
    video: { decode: isVideoDecodeReady },
  } = useContext(ZoomMediaContext);
  const videoRef = useRef<HTMLCanvasElement | null>(null);
  const [isRecieveSharing, setIsRecieveSharing] = useState(false);
  const shareViewRef = useRef<{
    selfShareRef: HTMLCanvasElement | HTMLVideoElement | null;
  }>(null);
  const canvasDimension = useCanvasDimension(mediaStream, videoRef);
  const activeVideo = useActiveVideo(zmClient);
  const { page, pageSize, totalPage, totalSize, setPage } = usePagination(
    zmClient,
    canvasDimension,
  );

  const { visibleParticipants, layout: videoLayout } = useGalleryLayout(
    zmClient,
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
  /**
   * position for self video
   */
  const currentUserIndex = visibleParticipants.findIndex(
    (user) => user.userId === zmClient.getCurrentUserInfo()?.userId,
  );
  let selfVideoLayout = null;
  if (currentUserIndex > -1) {
    const item = videoLayout[currentUserIndex];
    if (item && canvasDimension) {
      selfVideoLayout = {
        ...item,
        y: canvasDimension.height - item.y - item.height,
      };
    }
  }
  const avatarActionState = useAvatarAction(zmClient, visibleParticipants);
  const networkQuality = useNetworkQuality(zmClient);

  useEffect(() => {
    if (!isRecieveSharing) setPage(0);
  }, [isRecieveSharing]);

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

        <SelfViewContainer
          id={SELF_VIDEO_ID}
          className={classnames("self-video-non-sab")}
          isRenderSelfViewWithVideoElement={
            !!mediaStream?.isRenderSelfViewWithVideoElement()
          }
          style={
            selfVideoLayout
              ? {
                  display: "block",
                  width: `${selfVideoLayout.width}px`,
                  height: `${selfVideoLayout.height}px`,
                  top: `${selfVideoLayout.y}px`,
                  left: `${selfVideoLayout.x}px`,
                  pointerEvents: "none",
                }
              : undefined
          }
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
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    top: `${canvasHeight - y - height}px`,
                    left: `${x}px`,
                  }}
                  networkQuality={networkQuality[`${user.userId}`]}
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
    </div>
  );
};

export default VideoContainer;
