import { IconFont } from "@/components/zoomSdk/icon-font";
import { useHover } from "@/hooks/common";
import { ParticipantType } from "@/lib/zoomVideoSdk";
import { AudioMutedOutlined } from "@ant-design/icons";
import type { NetworkQuality } from "@zoom/videosdk";
import classNames from "classnames";
import { useRef } from "react";
import AvatarMore from "./avatar-more";
import "./avatar.scss";
interface AvatarProps {
  participant: ParticipantType;
  style?: { [key: string]: string };
  isActive: boolean;
  className?: string;
  networkQuality?: NetworkQuality;
}
const networkQualityIcons = ["bad", "bad", "normal", "good", "good", "good"];
const Avatar = (props: AvatarProps) => {
  const { participant, style, isActive, className, networkQuality } = props;
  const { displayName, audio, muted, bVideoOn } = participant;
  const avatarRef = useRef(null);
  const isHover = useHover(avatarRef);

  return (
    <div
      className={classNames("avatar", { "avatar-active": isActive }, className)}
      style={{
        ...style,
        background: bVideoOn ? "transparent" : "rgb(26,26,26)",
      }}
      ref={avatarRef}
    >
      {(bVideoOn || (audio === "computer" && muted)) && (
        <div className="corner-name">
          {audio === "computer" && muted && (
            <AudioMutedOutlined style={{ color: "#f00" }} />
          )}
          {bVideoOn && networkQuality !== undefined && (
            <IconFont
              type={`icon-network-${
                networkQualityIcons[
                  Math.min(
                    networkQuality?.downlink ?? Number.MAX_VALUE,
                    networkQuality?.uplink ?? Number.MAX_VALUE,
                  )
                ]
              }`}
            />
          )}
          {bVideoOn && <span>{displayName}</span>}
        </div>
      )}
      {!bVideoOn && <p className="center-name">{displayName}</p>}
      <AvatarMore userId={participant.userId} isHover={isHover} />
    </div>
  );
};

export default Avatar;
