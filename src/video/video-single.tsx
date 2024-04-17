/* eslint-disable */

import ZoomMediaContext from "@/contexts/media-context";
import ZoomContext from "@/contexts/zoom-context";
import { usePrevious } from "@/hooks/common";
import { ParticipantType } from "@/lib/zoomVideoSdk";
import { isShallowEqual } from "@/utils/zoom";
import { VideoQuality } from "@zoom/videosdk";
import classnames from "classnames";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Avatar from "./components/avatar";
import RemoteCameraControlPanel from "./components/remote-camera-control";
import ShareView from "./components/share-view";
import VideoFooter from "./components/video-footer";
import AvatarActionContext from "./context/avatar-context";
import { useAvatarAction } from "./hooks/useAvatarAction";
import { useCanvasDimension } from "./hooks/useCanvasDimension";
import { useNetworkQuality } from "./hooks/useNetworkQuality";
import { useParticipantsChange } from "./hooks/useParticipantsChange";
import { SELF_VIDEO_ID } from "./video-constants";
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
  const [participants, setParticipants] = useState<ParticipantType[]>([]);
  const [activeVideo, setActiveVideo] = useState<number>(
    mediaStream?.getActiveVideoId() ?? 0,
  );
  const previousActiveUser = useRef<ParticipantType>();
  const canvasDimension = useCanvasDimension(mediaStream, videoRef);
  const networkQuality = useNetworkQuality(zmClient);
  const previousCanvasDimension = usePrevious(canvasDimension);

  useParticipantsChange(zmClient, (payload) => {
    setParticipants(payload);
  });
  const onActiveVideoChange = useCallback((payload: any) => {
    const { userId } = payload;
    setActiveVideo(userId);
  }, []);
  useEffect(() => {
    zmClient.on("video-active-change", onActiveVideoChange);
    return () => {
      zmClient.off("video-active-change", onActiveVideoChange);
    };
  }, [zmClient, onActiveVideoChange]);

  const activeUser = useMemo(
    () => participants.find((user) => user.userId === activeVideo),
    [participants, activeVideo],
  );
  const isCurrentUserStartedVideo = zmClient.getCurrentUserInfo()?.bVideoOn;
  useEffect(() => {
    if (mediaStream && videoRef.current && isVideoDecodeReady) {
      if (activeUser?.bVideoOn !== previousActiveUser.current?.bVideoOn) {
        if (activeUser?.bVideoOn) {
          mediaStream.renderVideo(
            videoRef.current,
            activeUser.userId,
            canvasDimension.width,
            canvasDimension.height,
            0,
            0,
            VideoQuality.Video_360P as any,
          );
        } else {
          if (previousActiveUser.current?.bVideoOn) {
            mediaStream.stopRenderVideo(
              videoRef.current,
              previousActiveUser.current?.userId,
            );
          }
        }
      }
      if (activeUser?.bVideoOn && previousActiveUser.current?.bVideoOn) {
        if (activeUser.userId !== previousActiveUser.current.userId) {
          mediaStream.stopRenderVideo(
            videoRef.current,
            previousActiveUser.current?.userId,
          );
          mediaStream.renderVideo(
            videoRef.current,
            activeUser.userId,
            canvasDimension.width,
            canvasDimension.height,
            0,
            0,
            VideoQuality.Video_360P as any,
          );
        } else {
          if (!isShallowEqual(canvasDimension, previousCanvasDimension)) {
            mediaStream.adjustRenderedVideoPosition(
              videoRef.current,
              activeUser.userId,
              canvasDimension.width,
              canvasDimension.height,
              0,
              0,
            );
          }
        }
      }
      previousActiveUser.current = activeUser;
    }
  }, [
    mediaStream,
    activeUser,
    isVideoDecodeReady,
    canvasDimension,
    previousCanvasDimension,
  ]);
  const avatarActionState = useAvatarAction(
    zmClient,
    activeUser ? [activeUser] : [],
  );
  return (
    <div className="viewport z-50">
      <ShareView
        ref={shareViewRef}
        onRecieveSharingChange={setIsRecieveSharing}
      />
      <div
        className={classnames("video-container", "single-video-container", {
          "video-container-in-sharing": isRecieveSharing,
        })}
      >
        {mediaStream?.isRenderSelfViewWithVideoElement() ? (
          <video
            id={SELF_VIDEO_ID}
            className={classnames("self-video", {
              "single-self-video": participants.length === 1,
              "self-video-show": isCurrentUserStartedVideo,
            })}
          />
        ) : (
          <canvas
            id={SELF_VIDEO_ID}
            width="254"
            height="143"
            className={classnames("self-video", {
              "single-self-video": participants.length === 1,
              "self-video-show": isCurrentUserStartedVideo,
            })}
          />
        )}
        <div className="single-video-wrap">
          <canvas
            className="video-canvas"
            id="video-canvas"
            width="800"
            height="600"
            ref={videoRef}
          />

          <AvatarActionContext.Provider value={avatarActionState}>
            {activeUser && (
              <Avatar
                participant={activeUser}
                isActive={false}
                className="single-view-avatar"
                networkQuality={networkQuality[`${activeUser.userId}`]}
              />
            )}
            <RemoteCameraControlPanel />
          </AvatarActionContext.Provider>
        </div>
      </div>
      <VideoFooter
        className="video-operations"
        sharing
        selfShareCanvas={shareViewRef.current?.selfShareRef}
      />
    </div>
  );
};

export default VideoContainer;
