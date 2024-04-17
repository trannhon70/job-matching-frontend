import IconAdvanced from "./svgs/icon-advanced.svg";
import IconChat from "./svgs/icon-chat.svg";
import IconGroup from "./svgs/icon-group.svg";
import IconHeadset from "./svgs/icon-headset.svg";
import IconMeeting from "./svgs/icon-meeting.svg";
import IconPause from "./svgs/icon-pause.svg";
import IconRemoteControl from "./svgs/icon-remote-control.svg";
import IconResume from "./svgs/icon-resume.svg";
import IconShare from "./svgs/icon-share.svg";
import IconSpotlight from "./svgs/icon-spotlight.svg";
import IconStart from "./svgs/icon-start.svg";
import IconStop from "./svgs/icon-stop.svg";

import IconPhoneOff from "./svgs/icon-phone-off.svg";
import IconPhone from "./svgs/icon-phone.svg";

import Image from "next/image";
import IconAudioOff from "./svgs/icon-audio-off.svg";
import IconAudioOn from "./svgs/icon-audio-on.svg";
import IconControl from "./svgs/icon-control.svg";
import IconLeave from "./svgs/icon-leave.svg";
import IconLiveStream from "./svgs/icon-live-stream.svg";
import IconLive from "./svgs/icon-live.svg";
import IconLt from "./svgs/icon-lt.svg";
import IconMove from "./svgs/icon-move.svg";
import IconNetworkBad from "./svgs/icon-network-bad.svg";
import IconNetworkGood from "./svgs/icon-network-good.svg";
import IconNetworkNormal from "./svgs/icon-network-normal.svg";
import IconRecordingAnimatedHovered from "./svgs/icon-recording-animated-hovered.svg";
import IconRecordingAnimated from "./svgs/icon-recording-animated.svg";
import IconRecording from "./svgs/icon-recording-default.svg";
import IconRecordingHovered from "./svgs/icon-recording-hovered.svg";
import IconRecordingPauseHovered from "./svgs/icon-recording-pause-hovered.svg";
import IconRecordingPause from "./svgs/icon-recording-pause.svg";
import IconRecordingResumeHovered from "./svgs/icon-recording-resume-hovered.svg";
import IconRecordingResume from "./svgs/icon-recording-resume.svg";
import IconRecordingStopHovered from "./svgs/icon-recording-stop-hovered.svg";
import IconRecordingStop from "./svgs/icon-recording-stop.svg";
import IconStopLeave from "./svgs/icon-stop-leave.svg";
import IconSubtitle from "./svgs/icon-subtitles.svg";
import IconSwitch from "./svgs/icon-switch.svg";
const iconComponentMap: { [key: string]: any } = {
  "icon-advanced": IconAdvanced,
  "icon-chat": IconChat,
  "icon-group": IconGroup,
  "icon-headset": IconHeadset,
  "icon-meeting": IconMeeting,
  "icon-pause": IconPause,
  "icon-remote-control": IconRemoteControl,
  "icon-resume": IconResume,
  "icon-share": IconShare,
  "icon-spotlight": IconSpotlight,
  "icon-start": IconStart,
  "icon-stop": IconStop,
  "icon-recording": IconRecording,
  "icon-recording-hover": IconRecordingHovered,
  "icon-recording-stop": IconRecordingStop,
  "icon-recording-stop-hover": IconRecordingStopHovered,
  "icon-recording-resume": IconRecordingResume,
  "icon-recording-resume-hover": IconRecordingResumeHovered,
  "icon-recording-pause": IconRecordingPause,
  "icon-recording-pause-hover": IconRecordingPauseHovered,
  "icon-recording-animated": IconRecordingAnimated,
  "icon-recording-animated-hover": IconRecordingAnimatedHovered,
  "icon-phone": IconPhone,
  "icon-phone-off": IconPhoneOff,
  "icon-lt": IconLt,
  "icon-subtitle": IconSubtitle,
  "icon-leave": IconLeave,
  "icon-stop-leave": IconStopLeave,
  "icon-control": IconControl,
  "icon-switch": IconSwitch,
  "icon-network-good": IconNetworkGood,
  "icon-network-normal": IconNetworkNormal,
  "icon-network-bad": IconNetworkBad,
  "icon-live-stream": IconLiveStream,
  "icon-live": IconLive,
  "icon-move": IconMove,
  "icon-audio-on": IconAudioOn,
  "icon-audio-off": IconAudioOff,
};
interface IconFontProps {
  type: string;
  style?: any;
}
export const IconFont = (props: IconFontProps) => {
  const { type, style } = props;
  const component = iconComponentMap[type];
  return component ? (
    <Image alt="icon" src={component} style={{ ...(style || {}) }} />
  ) : null;
};
