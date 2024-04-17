/* eslint-disable */

import ZoomMediaContext from "@/contexts/media-context";
import ZoomContext from "@/contexts/zoom-context";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { useMount, useUnmount } from "@/hooks/common";
import { setActiveZoomMeeting } from "@/services/firebase/zoom";
import { convertTimestampToHourAndMinute } from "@/utils/date";
import { isAndroidOrIOSBrowser } from "@/utils/platform";
import {
  AudioChangeAction,
  DialOutOption,
  DialoutState,
  LiveStreamStatus,
  MobileVideoFacingMode,
  MutedSource,
  RecordingStatus,
  SharePrivilege,
  ShareStatus,
  VideoCapturingState,
} from "@zoom/videosdk";
import { Button, Modal, message } from "antd";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { BsFillChatFill } from "react-icons/bs";
import {
  SELF_VIDEO_ID,
  getPhoneCallStatusDescription,
} from "../video-constants";
import { MediaDevice } from "../video-types";
import GroupChat from "./GroupChat";
import AudioVideoStatisticModal from "./audio-video-statistic";
import CameraButton from "./camera";
import { LeaveButton } from "./leave";
import MicrophoneButton from "./microphone";
import IsoRecordingModal from "./recording-ask-modal";
import { ScreenShareButton } from "./screen-share";
import "./video-footer.scss";
import { VideoMaskModel } from "./video-mask-modal";
interface VideoFooterProps {
  className?: string;
  selfShareCanvas?: HTMLCanvasElement | HTMLVideoElement | null;
  sharing?: boolean;
}

export type messageChatType = {
  id: string;
  author: string;
  userId: number;
  message: string;
  timestamp: string;
};

const isAudioEnable = typeof AudioWorklet === "function";
const VideoFooter = (props: VideoFooterProps) => {
  const { updateInterview } = useEmployerApi();
  const router = useRouter();
  const pathname = usePathname();

  const { className, selfShareCanvas, sharing } = props;
  const [isStartedAudio, setIsStartedAudio] = useState(false);
  const [isStartedVideo, setIsStartedVideo] = useState(false);
  const [audio, setAudio] = useState("");
  const [isSupportPhone, setIsSupportPhone] = useState(false);
  const [phoneCountryList, setPhoneCountryList] = useState<any[]>([]);
  const [phoneCallStatus, setPhoneCallStatus] = useState<DialoutState>();
  const [, setIsStartedLiveTranscription] = useState(false);
  const [, setIsDisableCaptions] = useState(false);
  const [isMirrored, setIsMirrored] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeMicrophone, setActiveMicrophone] = useState("");
  const [activeSpeaker, setActiveSpeaker] = useState("");
  const [activeCamera, setActiveCamera] = useState("");
  const [micList, setMicList] = useState<MediaDevice[]>([]);
  const [speakerList, setSpeakerList] = useState<MediaDevice[]>([]);
  const [cameraList, setCameraList] = useState<MediaDevice[]>([]);
  const [statisticVisible, setStatisticVisible] = useState(false);
  const [selecetedStatisticTab, setSelectedStatisticTab] = useState("audio");
  const [isComputerAudioDisabled, setIsComputerAudioDisabled] = useState(false);
  const [sharePrivilege, setSharePrivileg] = useState(SharePrivilege.Unlocked);
  const [, setCaption] = useState({ text: "", isOver: false });
  const [activePlaybackUrl, setActivePlaybackUrl] = useState("");
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [messagesList, setMessagesList] = useState<messageChatType[]>([]);

  const zmClient = useContext(ZoomContext);
  const { mediaStream } = useContext(ZoomMediaContext);
  // const liveTranscriptionClient = zmClient.getLiveTranscriptionClient();
  const liveStreamClient = zmClient.getLiveStreamClient();
  const recordingClient = zmClient.getRecordingClient();
  const chatClient = zmClient.getChatClient();
  const [, setRecordingStatus] = useState<"" | RecordingStatus>(
    recordingClient?.getCloudRecordingStatus() || "",
  );
  const [recordingIsoStatus, setRecordingIsoStatus] = useState<
    "" | RecordingStatus
  >("");
  // const [liveStreamVisible, setLiveStreamVisible] = useState(false);
  const [, setLiveStreamStatus] = useState(
    liveStreamClient?.getLiveStreamStatus(),
  );
  // Video Mask
  const [videoMaskVisible, setVideoMaskVisible] = useState(false);

  const onCameraClick = useCallback(async () => {
    if (isStartedVideo) {
      await mediaStream?.stopVideo();
      setIsStartedVideo(false);
    } else {
      if (mediaStream?.isRenderSelfViewWithVideoElement()) {
        const videoElement = document.querySelector(
          `#${SELF_VIDEO_ID}`,
        ) as HTMLVideoElement;
        if (videoElement) {
          await mediaStream?.startVideo({ videoElement });
        }
      } else {
        const startVideoOptions = {
          hd: true,
          ptz: mediaStream?.isBrowserSupportPTZ(),
        };
        if (mediaStream?.isSupportVirtualBackground() && isBlur) {
          Object.assign(startVideoOptions, {
            virtualBackground: { imageUrl: "blur" },
          });
        }
        await mediaStream?.startVideo(startVideoOptions);
        if (!mediaStream?.isSupportMultipleVideos()) {
          const canvasElement = document.querySelector(
            `#${SELF_VIDEO_ID}`,
          ) as HTMLCanvasElement;
          mediaStream?.renderVideo(
            canvasElement,
            zmClient.getSessionInfo().userId,
            canvasElement.width,
            canvasElement.height,
            0,
            0,
            3,
          );
        }
      }

      setIsStartedVideo(true);
    }
  }, [mediaStream, isStartedVideo, zmClient, isBlur]);
  const onMicrophoneClick = useCallback(async () => {
    if (isStartedAudio) {
      if (isMuted) {
        await mediaStream?.unmuteAudio();
        setIsMuted(false);
      } else {
        await mediaStream?.muteAudio();
        setIsMuted(true);
      }
    } else {
      // await mediaStream?.startAudio({ speakerOnly: true });
      await mediaStream?.startAudio();
      setIsStartedAudio(true);
    }
  }, [mediaStream, isStartedAudio, isMuted]);
  const onMicrophoneMenuClick = async (key: string) => {
    if (mediaStream) {
      const [type, deviceId] = key.split("|");
      if (type === "microphone") {
        if (deviceId !== activeMicrophone) {
          await mediaStream.switchMicrophone(deviceId);
          setActiveMicrophone(mediaStream.getActiveMicrophone());
        }
      } else if (type === "speaker") {
        if (deviceId !== activeSpeaker) {
          await mediaStream.switchSpeaker(deviceId);
          setActiveSpeaker(mediaStream.getActiveSpeaker());
        }
      } else if (type === "leave audio") {
        if (audio === "computer") {
          await mediaStream.stopAudio();
        } else if (audio === "phone") {
          await mediaStream.hangup();
          setPhoneCallStatus(undefined);
        }
        setIsStartedAudio(false);
      } else if (type === "statistic") {
        setSelectedStatisticTab("audio");
        setStatisticVisible(true);
      }
    }
  };
  const onSwitchCamera = async (key: string) => {
    if (mediaStream) {
      if (activeCamera !== key) {
        await mediaStream.switchCamera(key);
        setActiveCamera(mediaStream.getActiveCamera());
        setActivePlaybackUrl("");
      }
    }
  };
  const onMirrorVideo = async () => {
    await mediaStream?.mirrorVideo(!isMirrored);
    setIsMirrored(!isMirrored);
  };
  const onBlurBackground = async () => {
    const isSupportVirtualBackground =
      mediaStream?.isSupportVirtualBackground();
    if (isSupportVirtualBackground) {
      if (isBlur) {
        await mediaStream?.updateVirtualBackgroundImage(undefined);
      } else {
        await mediaStream?.updateVirtualBackgroundImage("blur");
      }
    } else {
      setVideoMaskVisible(true);
    }

    setIsBlur(!isBlur);
  };
  const onPhoneCall = async (
    code: string,
    phoneNumber: string,
    name: string,
    option: DialOutOption,
  ) => {
    await mediaStream?.inviteByPhone(code, phoneNumber, name, option);
  };
  const onPhoneCallCancel = async (
    code: string,
    phoneNumber: string,
    option: { callMe: boolean },
  ) => {
    if (
      [
        DialoutState.Calling,
        DialoutState.Ringing,
        DialoutState.Accepted,
      ].includes(phoneCallStatus as any)
    ) {
      await mediaStream?.cancelInviteByPhone(code, phoneNumber, option);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 3000);
      });
    }
    return Promise.resolve();
  };
  const onHostAudioMuted = useCallback((payload: any) => {
    const { action, source, type } = payload;
    if (action === AudioChangeAction.Join) {
      setIsStartedAudio(true);
      setAudio(type);
    } else if (action === AudioChangeAction.Leave) {
      setIsStartedAudio(false);
    } else if (action === AudioChangeAction.Muted) {
      setIsMuted(true);
      if (source === MutedSource.PassiveByMuteOne) {
        message.info("Host muted you");
      }
    } else if (action === AudioChangeAction.Unmuted) {
      setIsMuted(false);
      if (source === "passive") {
        message.info("Host unmuted you");
      }
    }
  }, []);
  const onScreenShareClick = useCallback(async () => {
    try {
      if (
        mediaStream?.getShareStatus() === ShareStatus.End &&
        selfShareCanvas
      ) {
        await mediaStream?.startShareScreen(selfShareCanvas, {
          requestReadReceipt: true,
        });
      }
    } catch (error) {
      const err = error as any;
      if (err?.type === "INSUFFICIENT_PRIVILEGES") {
        Modal.warning({
          title: "You do not have permission!",
          onOk() {},
        });
      }
    }
  }, [mediaStream, selfShareCanvas]);

  // const onLiveTranscriptionClick = useCallback(async () => {
  //   if (isDisableCaptions) {
  //     message.info("Captions has been disable by host.");
  //   } else if (isStartedLiveTranscription) {
  //     message.info("Live transcription has started.");
  //   } else if (!isStartedLiveTranscription) {
  //     await liveTranscriptionClient?.startLiveTranscription();
  //     setIsStartedLiveTranscription(true);
  //   }
  // }, [isStartedLiveTranscription, isDisableCaptions, liveTranscriptionClient]);

  // const onDisableCaptions = useCallback(
  //   async (disable: boolean) => {
  //     if (disable && !isDisableCaptions) {
  //       await liveTranscriptionClient?.disableCaptions(disable);
  //       setIsStartedLiveTranscription(false);
  //       setIsDisableCaptions(true);
  //     } else if (!disable && isDisableCaptions) {
  //       await liveTranscriptionClient?.disableCaptions(disable);
  //       setIsDisableCaptions(false);
  //     }
  //   },
  //   [isDisableCaptions, liveTranscriptionClient]
  // );

  const onLeaveClick = useCallback(async () => {
    await zmClient.leave();
    router.replace(`/`);
  }, [zmClient]);

  const onEndClick = useCallback(async () => {
    const splitPathname = pathname.split("/");
    const roomId = splitPathname[splitPathname.length - 2];
    const interviewId = splitPathname[splitPathname.length - 1];
    setActiveZoomMeeting(roomId, false);
    try {
      await updateInterview(+interviewId, {
        status: "true",
        endDate: new Date(),
      });
      await zmClient.leave(true);
      router.replace("/employer/interview?status=previous");
    } catch (error) {
      alert("Occurred error");
      console.log("error", error);
    }
  }, [zmClient]);

  const onPassivelyStopShare = useCallback(({ reason }: any) => {
    console.log("passively stop reason:", reason);
  }, []);
  const onDeviceChange = useCallback(() => {
    if (mediaStream) {
      setMicList(mediaStream.getMicList());
      setSpeakerList(mediaStream.getSpeakerList());
      if (!isAndroidOrIOSBrowser()) {
        setCameraList(mediaStream.getCameraList());
      }
      setActiveMicrophone(mediaStream.getActiveMicrophone());
      setActiveSpeaker(mediaStream.getActiveSpeaker());
      setActiveCamera(mediaStream.getActiveCamera());
    }
  }, [mediaStream]);

  const onRecordingChange = useCallback(() => {
    setRecordingStatus(recordingClient?.getCloudRecordingStatus() || "");
  }, [recordingClient]);

  const onRecordingISOChange = useCallback(
    (payload: any) => {
      if (
        payload?.userId === zmClient.getSessionInfo().userId ||
        payload?.status === RecordingStatus.Ask
      ) {
        setRecordingIsoStatus(payload?.status);
      }
      console.log("recording-iso-change", payload);
    },
    [zmClient],
  );

  const onDialOutChange = useCallback((payload: any) => {
    setPhoneCallStatus(payload.code);
  }, []);

  // const onRecordingClick = async (key: string) => {
  //   switch (key) {
  //     case "Record": {
  //       await recordingClient?.startCloudRecording();
  //       break;
  //     }
  //     case "Resume": {
  //       await recordingClient?.resumeCloudRecording();
  //       break;
  //     }
  //     case "Stop": {
  //       await recordingClient?.stopCloudRecording();
  //       break;
  //     }
  //     case "Pause": {
  //       await recordingClient?.pauseCloudRecording();
  //       break;
  //     }
  //     case "Status": {
  //       break;
  //     }
  //     default: {
  //       await recordingClient?.startCloudRecording();
  //     }
  //   }
  // };
  const onVideoCaptureChange = useCallback((payload: any) => {
    if (payload.state === VideoCapturingState.Started) {
      setIsStartedVideo(true);
    } else {
      setIsStartedVideo(false);
    }
  }, []);
  const onShareAudioChange = useCallback(
    (payload: any) => {
      const { state } = payload;
      if (state === "on") {
        if (!mediaStream?.isSupportMicrophoneAndShareAudioSimultaneously()) {
          setIsComputerAudioDisabled(true);
        }
      } else if (state === "off") {
        setIsComputerAudioDisabled(false);
      }
    },
    [mediaStream],
  );
  const onHostAskToUnmute = useCallback((payload: any) => {
    const { reason } = payload;
    console.log(`Host ask to unmute the audio.`, reason);
  }, []);

  const onCaptionStatusChange = useCallback((payload: any) => {
    const { autoCaption } = payload;
    if (autoCaption) {
      message.info("Auto live transcription enabled!");
    }
  }, []);

  const onCaptionMessage = useCallback((payload: any) => {
    const { text, done } = payload;
    setCaption({
      text,
      isOver: done,
    });
  }, []);

  const onCaptionDisable = useCallback((payload: any) => {
    setIsDisableCaptions(payload);
    if (payload) {
      setIsStartedLiveTranscription(false);
    }
  }, []);

  const onCanSeeMyScreen = useCallback(() => {
    message.info("Users can now see your screen", 1);
  }, []);
  const onSelectVideoPlayback = useCallback(
    async (url: string) => {
      if (activePlaybackUrl !== url) {
        await mediaStream?.switchCamera({ url, loop: true });
        if (isStartedAudio) {
          await mediaStream?.switchMicrophone({ url, loop: true });
        } else {
          await mediaStream?.startAudio({ mediaFile: { url, loop: true } });
        }
        setActivePlaybackUrl(url);
      }
    },
    [isStartedAudio, activePlaybackUrl, mediaStream],
  );

  // const onLiveStreamClick = useCallback(() => {
  //   if (liveStreamStatus === LiveStreamStatus.Ended) {
  //     setLiveStreamVisible(true);
  //   } else if (liveStreamStatus === LiveStreamStatus.InProgress) {
  //     liveStreamClient?.stopLiveStream();
  //   }
  // }, [liveStreamStatus, liveStreamClient]);
  const onLiveStreamStatusChange = useCallback((status: any) => {
    setLiveStreamStatus(status);
    if (status === LiveStreamStatus.Timeout) {
      message.error("Start live streaming timeout");
    }
  }, []);

  const onChatMessage = useCallback((payload: any) => {
    const convertedTimestamp = convertTimestampToHourAndMinute(
      payload?.timestamp,
    );
    const newMessage = {
      id: payload?.id,
      author: payload?.sender?.name,
      userId: payload?.sender?.userId,
      message: payload?.message,
      timestamp: `${convertedTimestamp.hour}:${convertedTimestamp.minute}`,
    };
    setMessagesList((prev) => [...prev, newMessage]);
  }, []);
  useEffect(() => {
    zmClient.on("chat-on-message", onChatMessage);
    zmClient.on("current-audio-change", onHostAudioMuted);
    zmClient.on("passively-stop-share", onPassivelyStopShare);
    zmClient.on("device-change", onDeviceChange);
    zmClient.on("recording-change", onRecordingChange);
    zmClient.on("individual-recording-change", onRecordingISOChange);
    zmClient.on("dialout-state-change", onDialOutChange);
    zmClient.on("video-capturing-change", onVideoCaptureChange);
    zmClient.on("share-audio-change", onShareAudioChange);
    zmClient.on("host-ask-unmute-audio", onHostAskToUnmute);
    zmClient.on("caption-status", onCaptionStatusChange);
    zmClient.on("caption-message", onCaptionMessage);
    zmClient.on("caption-host-disable", onCaptionDisable);
    zmClient.on("share-can-see-screen", onCanSeeMyScreen);
    zmClient.on("live-stream-status", onLiveStreamStatusChange);
    return () => {
      zmClient.off("chat-on-message", onChatMessage);
      zmClient.off("current-audio-change", onHostAudioMuted);
      zmClient.off("passively-stop-share", onPassivelyStopShare);
      zmClient.off("device-change", onDeviceChange);
      zmClient.off("recording-change", onRecordingChange);
      zmClient.off("individual-recording-change", onRecordingISOChange);
      zmClient.off("dialout-state-change", onDialOutChange);
      zmClient.off("video-capturing-change", onVideoCaptureChange);
      zmClient.off("share-audio-change", onShareAudioChange);
      zmClient.off("host-ask-unmute-audio", onHostAskToUnmute);
      zmClient.off("caption-status", onCaptionStatusChange);
      zmClient.off("caption-message", onCaptionMessage);
      zmClient.off("caption-host-disable", onCaptionDisable);
      zmClient.off("share-can-see-screen", onCanSeeMyScreen);
      zmClient.off("live-stream-status", onLiveStreamStatusChange);
    };
  }, [
    zmClient,
    onHostAudioMuted,
    onPassivelyStopShare,
    onDeviceChange,
    onRecordingChange,
    onDialOutChange,
    onVideoCaptureChange,
    onShareAudioChange,
    onHostAskToUnmute,
    onCaptionStatusChange,
    onCaptionMessage,
    onCanSeeMyScreen,
    onRecordingISOChange,
    onCaptionDisable,
    onLiveStreamStatusChange,
  ]);
  useUnmount(() => {
    if (isStartedAudio) {
      mediaStream?.stopAudio();
    }
    if (isStartedVideo) {
      mediaStream?.stopVideo();
    }
    mediaStream?.stopShareScreen();
  });
  useMount(() => {
    if (mediaStream) {
      setIsSupportPhone(!!mediaStream.isSupportPhoneFeature());
      setPhoneCountryList(mediaStream.getSupportCountryInfo() || []);
      setSharePrivileg(mediaStream.getSharePrivilege());
      if (isAndroidOrIOSBrowser()) {
        setCameraList([
          { deviceId: MobileVideoFacingMode.User, label: "Front-facing" },
          { deviceId: MobileVideoFacingMode.Environment, label: "Rear-facing" },
        ]);
      }
    }
  });
  useEffect(() => {
    if (mediaStream && zmClient.getSessionInfo().isInMeeting) {
      mediaStream.subscribeAudioStatisticData();
      mediaStream.subscribeVideoStatisticData();
      mediaStream.subscribeShareStatisticData();
    }
    return () => {
      if (zmClient.getSessionInfo().isInMeeting) {
        mediaStream?.unsubscribeAudioStatisticData();
        mediaStream?.unsubscribeVideoStatisticData();
        mediaStream?.unsubscribeShareStatisticData();
      }
    };
  }, [mediaStream, zmClient]);
  // const recordingButtons: RecordButtonProps[] = getRecordingButtons(
  //   recordingStatus,
  //   zmClient.isHost()
  // );
  return (
    <div
      className={classNames(
        "flex h-20 w-full items-center justify-between bg-gray-800 px-20",
        className,
      )}
    >
      <div></div>
      <div className="flex items-center">
        {isAudioEnable && (
          <MicrophoneButton
            isStartedAudio={isStartedAudio}
            isMuted={isMuted}
            isSupportPhone={isSupportPhone}
            audio={audio}
            phoneCountryList={phoneCountryList}
            onPhoneCallClick={onPhoneCall}
            onPhoneCallCancel={onPhoneCallCancel}
            phoneCallStatus={getPhoneCallStatusDescription(phoneCallStatus)}
            onMicrophoneClick={onMicrophoneClick}
            onMicrophoneMenuClick={onMicrophoneMenuClick}
            microphoneList={micList}
            speakerList={speakerList}
            activeMicrophone={activeMicrophone}
            activeSpeaker={activeSpeaker}
            disabled={isComputerAudioDisabled}
          />
        )}
        <CameraButton
          isStartedVideo={isStartedVideo}
          onCameraClick={onCameraClick}
          onSwitchCamera={onSwitchCamera}
          onMirrorVideo={onMirrorVideo}
          onVideoStatistic={() => {
            setSelectedStatisticTab("video");
            setStatisticVisible(true);
          }}
          onBlurBackground={onBlurBackground}
          onSelectVideoPlayback={onSelectVideoPlayback}
          activePlaybackUrl={activePlaybackUrl}
          cameraList={cameraList}
          activeCamera={activeCamera}
          isMirrored={isMirrored}
          isBlur={isBlur}
        />
        {sharing && (
          <ScreenShareButton
            sharePrivilege={sharePrivilege}
            isHostOrManager={zmClient.isHost()}
            onScreenShareClick={onScreenShareClick}
            onSharePrivilegeClick={async (privilege) => {
              await mediaStream?.setSharePrivilege(privilege);
              setSharePrivileg(privilege);
            }}
          />
        )}
        {/* {recordingButtons.map((button: RecordButtonProps) => {
        return (
          <RecordingButton
            key={button.text}
            onClick={() => {
              onRecordingClick(button.text);
            }}
            {...button}
          />
        );
      })} */}
        {/* {liveTranscriptionClient?.getLiveTranscriptionStatus()
        .isLiveTranscriptionEnabled && (
        <>
          <LiveTranscriptionButton
            isStartedLiveTranscription={isStartedLiveTranscription}
            isDisableCaptions={isDisableCaptions}
            isHost={zmClient.isHost()}
            onDisableCaptions={onDisableCaptions}
            onLiveTranscriptionClick={onLiveTranscriptionClick}
          />
          <TranscriptionSubtitle text={caption.text} />
        </>
      )}
      {liveStreamClient?.isLiveStreamEnabled() && zmClient.isHost() && (
        <>
          <LiveStreamButton
            isLiveStreamOn={liveStreamStatus === LiveStreamStatus.InProgress}
            onLiveStreamClick={onLiveStreamClick}
          />
          <LiveStreamModal
            visible={liveStreamVisible}
            setVisible={setLiveStreamVisible}
            onStartLiveStream={(
              streanUrl: string,
              streamKey: string,
              broadcastUrl: string
            ) => {
              liveStreamClient.startLiveStream(
                streanUrl,
                streamKey,
                broadcastUrl
              );
            }}
          />
        </>
      )} */}
        {/* {liveStreamStatus === LiveStreamStatus.InProgress && (
        <IconFont
          type="icon-live"
          style={{
            position: "fixed",
            top: "45px",
            left: "10px",
            color: "#f00",
          }}
        />
      )} */}
        <LeaveButton
          onLeaveClick={onLeaveClick}
          isHost={zmClient.isHost()}
          onEndClick={onEndClick}
        />

        <AudioVideoStatisticModal
          visible={statisticVisible}
          setVisible={setStatisticVisible}
          defaultTab={selecetedStatisticTab}
          isStartedAudio={isStartedAudio}
          isMuted={isMuted}
          isStartedVideo={isStartedVideo}
        />

        {recordingIsoStatus === RecordingStatus.Ask && (
          <IsoRecordingModal
            onClick={() => {
              recordingClient?.acceptIndividualRecording();
            }}
            onCancel={() => {
              recordingClient?.declineIndividualRecording();
            }}
          />
        )}
        {!mediaStream?.isSupportVirtualBackground() && (
          <VideoMaskModel
            visible={videoMaskVisible}
            setVisible={setVideoMaskVisible}
            isMirrored={isMirrored}
          />
        )}
      </div>
      <div className="">
        {isOpenChat && (
          <GroupChat
            messagesList={messagesList}
            chatClient={chatClient}
            closeChat={() => {
              setIsOpenChat(false);
            }}
          />
        )}
        <Button
          onClick={() => {
            setIsOpenChat((prev) => !prev);
          }}
          type="primary"
          shape="circle"
          icon={<BsFillChatFill size={25} />}
          size="large"
        />
      </div>
    </div>
  );
};
export default VideoFooter;
