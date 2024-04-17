import { format } from "date-fns";
import { authAxios } from "./axios";

export const getInterviewRoom = (interviewId: string, roomId: string) => {
  const dataToSend = {
    timestamp: Date.now(),
    timezoneOffset: new Date().getTimezoneOffset(),
  };
  const currentDate = new Date();

  const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm");
  return authAxios.get(
    `job/getRoom/${interviewId}/${roomId}/${formattedDate}`,
    {
      headers: {
        "x-timezone-offset": dataToSend.timezoneOffset,
      },
    },
  );
};
