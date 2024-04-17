"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { JobPostingStatus } from "@/enums/employer";
import { JobPostingType } from "@/types/employer/job-posting";
import { ColumnDef } from "@tanstack/react-table";
import { BarChartBig } from "lucide-react";
import Link from "next/link";
import { EditStatusModal, UpdateJobModal } from "..";

export const columns: ColumnDef<JobPostingType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "jobTitle",
    header: "Title",
  },
  {
    accessorKey: "apply",
    header: "Apply",
    cell: ({ row }) => <>{(row.getValue("apply") as any)?.length}</>,
  },
  {
    accessorKey: "statistical",
    header: "Save",
    cell: ({ row }) => (
      <>
        {(row.getValue("statistical") as any).reduce(
          (total: number, item: any) => total + (item.save || 0),
          0,
        )}
      </>
    ),
  },
  {
    accessorKey: "interview",
    header: "Interview",
    cell: ({ row }) => <>{(row.getValue("interview") as any)?.length}</>,
  },
  // {
  //   accessorKey: "hired",
  //   header: "Hired",
  // },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { id: jobId } = row.original;
      return (
        <div className="flex items-center">
          {JobPostingStatus[row.getValue("status") as number]}
          <EditStatusModal
            jobId={`${jobId}`}
            defaultValues={{ status: row.getValue("status") as number }}
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      const record = row.original;
      return (
        <>
          <UpdateJobModal defaultValues={record} />
          <Button
            asChild
            variant={"ghost"}
            className="text-orange-600 hover:text-orange-600"
          >
            <Link href={`/employer/job-posting/${record.slug}`}>
              <BarChartBig size={20} />
            </Link>
          </Button>
        </>
      );
    },
  },
];
