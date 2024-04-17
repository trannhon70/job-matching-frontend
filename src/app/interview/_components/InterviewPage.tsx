"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ZoomVideoSdk from "@/components/zoomSdk/ZoomVideoSdk";
import { EmployeeQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import {
  isActiveZoomMeeting,
  setActiveZoomMeeting,
} from "@/services/firebase/zoom";
import { FormatErrorResponse } from "@/types";
import { generateZoomJWT } from "@/utils/helper";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";

interface Props {
  interviewId: number;
  roomId: string;
}

export const InterviewPage: React.FC<Props> = ({ interviewId, roomId }) => {
  const { getInterviewRoom } = useEmployerApi();

  const [isActiveZoom, setIsActiveZoom] = useState(false);
  const session = useSession();
  const isAuthenticated = !!session.data?.user.data.infoUser;
  const username = useMemo(() => {
    return session.data?.user.data.infoUser?.name
      ? session.data?.user.data.infoUser?.name
      : `${session.data?.user.data.infoUser?.firstName} ${session.data?.user.data.infoUser?.lastName}`;
  }, [session]);
  const { isLoading, data, isError } = useQuery({
    queryKey: [
      `${EmployeeQueryKeys.INTERVIEW}_${roomId}_${interviewId}`,
      interviewId,
      roomId,
      isAuthenticated,
    ],
    queryFn: () => {
      return getInterviewRoom(interviewId, roomId);
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
    enabled: !!isAuthenticated,
  });
  const devConfig = useMemo(
    () => ({
      sdkKey: process.env.NEXT_PUBLIC_ZOOM_SDK_KEY,
      sdkSecret: process.env.NEXT_PUBLIC_ZOOM_SDK_SECRET,
      webEndpoint: "zoom.us",
      topic: `Interview room ${roomId}`,
      name: `${username}`,
      password: "",
      signature: generateZoomJWT({
        topic: `Interview room ${roomId}`,
        userIdentity: `${username}`,
        password: "",
        roleType: data?.data.data.isInterviewers === 1 ? 1 : 0,
      }),
      sessionKey: "",
      userIdentity: "",
      role: data?.data.data.isInterviewers === 1 ? 1 : 0,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, session.data],
  );

  const onClickActiveZoomMeeting = async () => {
    if (data?.data.data.isInterviewers) {
      setActiveZoomMeeting(roomId, true);
      setIsActiveZoom(true);
    } else {
      const isHostAvailable = await isActiveZoomMeeting(roomId);
      if (!isHostAvailable) {
        toast.error("Waiting interviewer!");
        return;
      }
      setIsActiveZoom(true);
    }
  };

  if (isLoading || !isAuthenticated)
    return (
      <div className="flex w-full justify-center pt-20">
        <ThreeCircles
          visible={true}
          height="50"
          width="50"
          color="#4682a9"
          ariaLabel="three-circles-loading"
        />
      </div>
    );
  if (isError || !isAuthenticated) return <>404</>;
  if (!data) return <>404</>;
  if (!isActiveZoom)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Card className="p-10">
          <Button onClick={onClickActiveZoomMeeting}>Join zoom meeting</Button>
        </Card>
      </div>
    );
  return <ZoomVideoSdk devConfig={devConfig} />;
};
