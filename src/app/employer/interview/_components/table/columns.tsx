"use client";

import { timezoneOptions } from "@/config";
import { InterviewItemType } from "@/types/employer/interview";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteModal, InterviewRegisterModal, JoinInterviewButton } from "..";

export const columns: ColumnDef<InterviewItemType>[] = [
  {
    accessorKey: "no",
    header: "No.",
  },
  {
    header: "Start (Date | Time)",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <>
          {record.date} {record.hour}:{record.minute} {record.periodTime}
        </>
      );
    },
  },
  {
    header: "Estimate End (Date | Time)",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <>
          {record?.estimateDate} {record?.estimateHour}:{record?.estimateMinute}{" "}
          {record?.estimatePeriodTime}
        </>
      );
    },
  },
  {
    header: "End (Date | Time)",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <>
          {record?.endDate} {record?.endHour}:{record?.endMinute}{" "}
          {record?.endPeriodTime}
        </>
      );
    },
  },
  {
    header: "Time zone",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <>
          {timezoneOptions.find((i) => i.value === `${record.timeZone}`)?.label}
        </>
      );
    },
  },
  {
    accessorKey: "roomId",
    header: "Room ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    header: "Job Title",
    cell: ({ row }) => {
      const record = row.original;
      return <>{record.job.jobTitle}</>;
    },
  },
  {
    header: "Applicant",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <>
          {record.user.firstName} {record.user.lastName}
        </>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <>
          <InterviewRegisterModal editValues={record} type="edit" />
          <DeleteModal interviewId={record.id} />
        </>
      );
    },
  },
  {
    header: "Join",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <JoinInterviewButton
          isActive={true}
          roomId={record.roomId}
          id={record.id}
        />
      );
    },
  },
];

export const notHasMasterColumns = columns.filter(
  (i) => i.header !== "Actions",
);

export const previousColumns = columns.filter((i) => {
  return (
    i.header !== "Join" &&
    i.header !== "Actions" &&
    i.header !== "Estimate End (Date | Time)"
  );
});

export const scheduleColumns = columns.filter((i) => {
  return i.header !== "End (Date | Time)";
});
