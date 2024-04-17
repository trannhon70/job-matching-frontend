"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { JobPostingStatus } from "@/enums/employer";
import { JobPostingType } from "@/types/employer/job-posting";
import { ColumnDef } from "@tanstack/react-table";

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
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <> {JobPostingStatus[row.getValue("status") as number]}</>;
    },
  },
];
