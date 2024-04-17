"use client";

import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getInterviewRoom } from "@/services/apis/zoom";
import { isActiveZoomMeeting } from "@/services/firebase/zoom";
import { setCookie } from "@/utils/cookie";
import { generateZoomJWT } from "@/utils/helper";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

const ZoomVideoSdk = dynamic(() => import("@/components/zoomSdk/ZoomVideoSdk"));

const ZoomPage = () => {
  const [isActiveZoom, setIsActiveZoom] = useState(false);
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room-id");
  const interviewId = searchParams.get("interview-id");
  const token = searchParams.get("token");

  const mutation = useMutation({
    mutationFn: () => {
      return getInterviewRoom(interviewId as string, roomId as string);
    },
    onSuccess: () => {
      setIsActiveZoom(true);
    },
  });

  const checkIsActiveZoom = useMutation({
    mutationFn: (roomId: string) => {
      return isActiveZoomMeeting(roomId);
    },
  });

  useEffect(() => {
    token && setCookie("token", token as string);
  }, [token]);

  const devConfig = useMemo(
    () => ({
      sdkKey: process.env.NEXT_PUBLIC_ZOOM_SDK_KEY,
      sdkSecret: process.env.NEXT_PUBLIC_ZOOM_SDK_SECRET,
      webEndpoint: "zoom.us",
      topic: `Interview room ${roomId}`,
      name: `ADMIN`,
      password: "",
      signature: generateZoomJWT({
        topic: `Interview room ${roomId}`,
        userIdentity: `ADMIN`,
        password: "",
        roleType: 0,
      }),
      sessionKey: "",
      userIdentity: "",
      role: 0,
    }),
    [roomId],
  );

  const onClickJoinRoom = async () => {
    checkIsActiveZoom.mutate(roomId as string, {
      onSuccess: (res) => {
        if (res) {
          mutation.mutate();
        } else {
          toast.error("Waiting interviewer!");
        }
      },
    });
  };

  if (!isActiveZoom)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Card className="p-10">
          <Button
            onClick={onClickJoinRoom}
            disabled={mutation.isLoading || checkIsActiveZoom.isLoading}
          >
            Join zoom meeting for ADMIN
            {mutation.isLoading ||
              (checkIsActiveZoom.isLoading && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ))}
          </Button>
        </Card>
      </div>
    );

  return <ZoomVideoSdk devConfig={devConfig} />;
};

export default ZoomPage;
