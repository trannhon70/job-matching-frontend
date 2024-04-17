"use client";

import { InterviewPage } from "../../_components";

const Page = ({
  params,
}: {
  params: { interviewId: string; roomId: string };
}) => {
  return (
    <InterviewPage roomId={params.roomId} interviewId={+params.interviewId} />
  );
};

export default Page;
