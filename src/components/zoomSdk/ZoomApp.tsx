import ZoomMediaContext from "@/contexts/media-context";
import zoomContext from "@/contexts/zoom-context";
import { MediaStream } from "@/lib/zoomVideoSdk";
import { setActiveZoomMeeting } from "@/services/firebase/zoom";
import Video from "@/video/video";
import VideoNonSAB from "@/video/video-non-sab";
import VideoSingle from "@/video/video-single";
import ZoomVideo, { ConnectionState, ReconnectReason } from "@zoom/videosdk";
import { produce } from "immer";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { ThreeCircles } from "react-loader-spinner";

interface AppProps {
  meetingArgs: {
    sdkKey: string;
    topic: string;
    signature: string;
    name: string;
    password?: string;
    webEndpoint?: string;
    enforceGalleryView?: string;
    customerJoinId?: string;
    lang?: string;
  };
}

const mediaShape = {
  audio: {
    encode: false,
    decode: false,
  },
  video: {
    encode: false,
    decode: false,
  },
  share: {
    encode: false,
    decode: false,
  },
};

const mediaReducer = produce((draft, action) => {
  switch (action.type) {
    case "audio-encode": {
      draft.audio.encode = action.payload;
      break;
    }
    case "audio-decode": {
      draft.audio.decode = action.payload;
      break;
    }
    case "video-encode": {
      draft.video.encode = action.payload;
      break;
    }
    case "video-decode": {
      draft.video.decode = action.payload;
      break;
    }
    case "share-encode": {
      draft.share.encode = action.payload;
      break;
    }
    case "share-decode": {
      draft.share.decode = action.payload;
      break;
    }
    case "reset-media": {
      Object.assign(draft, { ...mediaShape });
      break;
    }
    default:
      break;
  }
}, mediaShape);

declare global {
  interface Window {
    webEndpoint: string | undefined;
    zmClient: any | undefined;
    mediaStream: any | undefined;
    crossOriginIsolated: boolean;
    ltClient: any | undefined;
  }
}

const ZoomApp = (props: AppProps) => {
  const {
    meetingArgs: {
      sdkKey,
      topic,
      signature,
      name,
      password,
      webEndpoint: webEndpointArg,
      enforceGalleryView,
      customerJoinId,
    },
  } = props;
  const [loading, setIsLoading] = useState(true);
  const [, setLoadingText] = useState("");
  const [isFailover, setIsFailover] = useState<boolean>(false);
  const [, setStatus] = useState<string>("closed");
  const [mediaState, dispatch] = useReducer(mediaReducer, mediaShape);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isSupportGalleryView, setIsSupportGalleryView] =
    useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  const zmClient = useContext(zoomContext);
  let webEndpoint: any;
  if (webEndpointArg) {
    webEndpoint = webEndpointArg;
  } else {
    webEndpoint = window?.webEndpoint ?? "zoom.us";
  }
  const mediaContext = useMemo(
    () => ({ ...mediaState, mediaStream }),
    [mediaState, mediaStream],
  );
  const galleryViewWithoutSAB =
    Number(enforceGalleryView) === 1 && !window.crossOriginIsolated;

  useEffect(() => {
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      // Handle the event logic here
      // You can call API methods or perform necessary actions before unloading the page
      if (zmClient.isHost()) {
        const splitPathname = pathname.split("/");
        const roomId = splitPathname[splitPathname.length - 2];
        setActiveZoomMeeting(roomId, false);
        await zmClient.leave(true);
      } else {
        await zmClient.leave();
      }

      event.preventDefault();
      // Optionally, return a message to display in the confirmation dialog
      event.returnValue = "Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [zmClient]);

  useEffect(() => {
    const init = async () => {
      await zmClient.init("en-US", `${window.location.origin}/lib`, {
        webEndpoint,
        enforceMultipleVideos: galleryViewWithoutSAB,
        enforceVirtualBackground: galleryViewWithoutSAB,
        stayAwake: true,
      });
      try {
        setLoadingText("Joining the session...");
        await zmClient.join(topic, signature, name, password).catch((e) => {
          console.log(e);
        });
        const stream = zmClient.getMediaStream();
        setMediaStream(stream);
        setIsSupportGalleryView(stream.isSupportMultipleVideos());
        setIsLoading(false);
      } catch (e) {
        console.log("e", e);
        setIsLoading(false);
        // message.error(e.reason);
      }
    };
    init();
    return () => {
      ZoomVideo.destroyClient();
    };
  }, [
    sdkKey,
    signature,
    zmClient,
    topic,
    name,
    password,
    webEndpoint,
    galleryViewWithoutSAB,
    customerJoinId,
  ]);
  const onConnectionChange = useCallback(
    (payload: any) => {
      if (payload.state === ConnectionState.Reconnecting) {
        setIsLoading(true);
        setIsFailover(true);
        setStatus("connecting");
        const { reason, subsessionName } = payload;
        if (reason === ReconnectReason.Failover) {
          setLoadingText("Session Disconnected,Try to reconnect");
        } else if (
          reason === ReconnectReason.JoinSubsession ||
          reason === ReconnectReason.MoveToSubsession
        ) {
          setLoadingText(`Joining ${subsessionName}...`);
        } else if (reason === ReconnectReason.BackToMainSession) {
          setLoadingText("Returning to Main Session...");
        }
      } else if (payload.state === ConnectionState.Connected) {
        setStatus("connected");
        if (isFailover) {
          setIsLoading(false);
        }
        window.zmClient = zmClient;
        window.mediaStream = zmClient.getMediaStream();
      } else if (payload.state === ConnectionState.Closed) {
        setStatus("closed");
        dispatch({ type: "reset-media" });
        if (payload.reason === "ended by host") {
          router.replace("/");
        }
      }
    },
    [isFailover, zmClient],
  );
  const onMediaSDKChange = useCallback((payload: any) => {
    const { action, type, result } = payload;
    dispatch({ type: `${type}-${action}`, payload: result === "success" });
  }, []);

  const onDialoutChange = useCallback((payload: any) => {
    console.log("onDialoutChange", payload);
  }, []);

  const onAudioMerged = useCallback((payload: any) => {
    console.log("onAudioMerged", payload);
  }, []);

  // const onLeaveOrJoinSession = useCallback(async () => {
  //   if (status === "closed") {
  //     setIsLoading(true);
  //     await zmClient.join(topic, signature, name, password);
  //     setIsLoading(false);
  //   } else if (status === "connected") {
  //     await zmClient.leave();
  //     //   message.warn("You have left the session.");
  //   }
  // }, [zmClient, status, topic, signature, name, password]);
  useEffect(() => {
    zmClient.on("connection-change", onConnectionChange);
    zmClient.on("media-sdk-change", onMediaSDKChange);
    zmClient.on("dialout-state-change", onDialoutChange);
    zmClient.on("merged-audio", onAudioMerged);
    return () => {
      zmClient.off("connection-change", onConnectionChange);
      zmClient.off("media-sdk-change", onMediaSDKChange);
      zmClient.off("dialout-state-change", onDialoutChange);
      zmClient.off("merged-audio", onAudioMerged);
    };
  }, [
    zmClient,
    onConnectionChange,
    onMediaSDKChange,
    onDialoutChange,
    onAudioMerged,
  ]);

  return (
    <>
      {loading && (
        <div className="flex w-full justify-center pt-20">
          <ThreeCircles
            visible={true}
            height="50"
            width="50"
            color="#4682a9"
            ariaLabel="three-circles-loading"
          />
        </div>
      )}
      {!loading && (
        <ZoomMediaContext.Provider value={mediaContext}>
          {isSupportGalleryView ? (
            <Video />
          ) : galleryViewWithoutSAB ? (
            <VideoNonSAB />
          ) : (
            <VideoSingle />
          )}
        </ZoomMediaContext.Provider>
      )}
    </>
  );
};

export default ZoomApp;
