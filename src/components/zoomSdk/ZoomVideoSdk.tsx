"use client";

import ZoomContext from "@/contexts/zoom-context";
import { b64DecodeUnicode, generateVideoToken } from "@/utils/zoom";
import ZoomVideo from "@zoom/videosdk";
import dynamic from "next/dynamic";
import ZoomApp from "./ZoomApp";
const zmClient = ZoomVideo.createClient();

const ZoomVideoSdk = ({ devConfig }: any) => {
  let meetingArgs: any = Object.fromEntries(
    new URLSearchParams(location.search),
  );
  // Add enforceGalleryView to turn on the gallery view without SharedAddayBuffer
  if (
    !meetingArgs.sdkKey ||
    !meetingArgs.topic ||
    !meetingArgs.name ||
    !meetingArgs.signature
  ) {
    meetingArgs = { ...devConfig, ...meetingArgs };
    meetingArgs.enforceGalleryView = !window?.crossOriginIsolated;
  }

  if (meetingArgs.web) {
    if (meetingArgs.topic) {
      try {
        meetingArgs.topic = b64DecodeUnicode(meetingArgs.topic);
      } catch (e) {}
    } else {
      meetingArgs.topic = "";
    }

    if (meetingArgs.name) {
      try {
        meetingArgs.name = b64DecodeUnicode(meetingArgs.name);
      } catch (e) {}
    } else {
      meetingArgs.name = "";
    }

    if (meetingArgs.password) {
      try {
        meetingArgs.password = b64DecodeUnicode(meetingArgs.password);
      } catch (e) {}
    } else {
      meetingArgs.password = "";
    }

    if (meetingArgs.sessionKey) {
      try {
        meetingArgs.sessionKey = b64DecodeUnicode(meetingArgs.sessionKey);
      } catch (e) {}
    } else {
      meetingArgs.sessionKey = "";
    }

    if (meetingArgs.userIdentity) {
      try {
        meetingArgs.userIdentity = b64DecodeUnicode(meetingArgs.userIdentity);
      } catch (e) {}
    } else {
      meetingArgs.userIdentity = "";
    }

    if (meetingArgs.role) {
      meetingArgs.role = parseInt(meetingArgs.role, 10);
    } else {
      meetingArgs.role = 1;
    }
  }

  if (!meetingArgs?.cloud_recording_option) {
    meetingArgs.cloud_recording_option = "0";
  }
  if (!meetingArgs?.cloud_recording_election) {
    meetingArgs.cloud_recording_election = "";
  }

  if (meetingArgs?.telemetry_tracking_id) {
    try {
      meetingArgs.telemetry_tracking_id = b64DecodeUnicode(
        meetingArgs.telemetry_tracking_id,
      );
    } catch (e) {}
  } else {
    meetingArgs.telemetry_tracking_id = "";
  }

  if (!meetingArgs.signature && meetingArgs.sdkSecret && meetingArgs.topic) {
    meetingArgs.signature = generateVideoToken(
      meetingArgs.sdkKey,
      meetingArgs.sdkSecret,
      meetingArgs.topic,
      meetingArgs.password,
      meetingArgs.sessionKey,
      meetingArgs.userIdentity,
      parseInt(meetingArgs.role, 10),
      meetingArgs.cloud_recording_option,
      meetingArgs.cloud_recording_election,
      meetingArgs.telemetry_tracking_id,
    );
    console.log("=====================================");
    console.log("meetingArgs", meetingArgs);

    const urlArgs = {
      topic: meetingArgs.topic,
      name: meetingArgs.name,
      password: meetingArgs.password,
      sessionKey: meetingArgs.sessionKey,
      userIdentity: meetingArgs.userIdentity,
      role: meetingArgs.role || 1,
      cloud_recording_option: meetingArgs.cloud_recording_option,
      cloud_recording_election: meetingArgs.cloud_recording_election,
      telemetry_tracking_id: meetingArgs.telemetry_tracking_id,
      web: "1",
    };
    console.log("use url args");
    console.log(
      window.location.origin + "/?" + new URLSearchParams(urlArgs).toString(),
    );
  }

  return (
    <ZoomContext.Provider value={zmClient}>
      <ZoomApp meetingArgs={meetingArgs as any} />
    </ZoomContext.Provider>
  );
};

export default dynamic(() => Promise.resolve(ZoomVideoSdk), {
  ssr: false,
});
