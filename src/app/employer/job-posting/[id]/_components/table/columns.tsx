"use client";

import { CreateChatButton } from "@/app/employer/applicant/_components";
import { InterviewRegisterModal } from "@/app/employer/interview/_components";
import { Button } from "@/components/ui/button";
import { ApplicantResType } from "@/types/employer/applicant";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<ApplicantResType>[] = [
  {
    accessorKey: "no",
    header: "No.",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    header: "Applicant Name",
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
    header: "E-mail",
    cell: ({ row }) => {
      const record = row.original;
      return <>{record.user.email}</>;
    },
  },
  {
    header: "Phone",
    cell: ({ row }) => {
      const record = row.original;
      return <>{record.user.phone}</>;
    },
  },
  {
    header: "Chat",
    cell: ({ row }) => {
      const record = row.original;
      return <CreateChatButton applicantId={record.id} />;
    },
  },
  {
    header: "Interview",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <InterviewRegisterModal jobId={record.job.id} userId={record.user.id} />
      );
    },
  },
  // {
  //   header: "Refuse",
  //   cell: ({ row }) => {
  //     return <Button>Cancel</Button>;
  //   },
  // },
  {
    header: "Note",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <Button>
          <Link href={`/employer/applicant/${record.id}/note`}>Write</Link>
        </Button>
      );
    },
  },
];
