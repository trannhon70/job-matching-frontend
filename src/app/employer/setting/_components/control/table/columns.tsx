"use client";

import { Badge } from "@/components/ui/badge";
import { EmployerStatus } from "@/enums/employer";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteEmployerModal, EditEmployerModal, EditStatusModal } from "..";

export type ControlType = {
  id: string;
  email: string;
  status: string;
  level: LevelType[];
  isOne: boolean;
  name: string;
};

type LevelType = {
  id: number;
  levelName: string;
};

export const columns: ColumnDef<ControlType>[] = [
  {
    accessorKey: "no",
    header: "No",
  },
  {
    accessorKey: "email",
    header: "User",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { id: userId, isOne } = row.original;
      return (
        <div className="flex items-center">
          {EmployerStatus[row.getValue("status") as number]}
          {!isOne && (
            <EditStatusModal
              userId={userId}
              defaultValues={{ status: row.getValue("status") as number }}
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ row }) => {
      const isFirstMaster = row.original.isOne;
      return (
        <>
          {(row.getValue("level") as LevelType[])
            .filter((i) => i.levelName === "Master")
            .map((i) => (
              <Badge className="mx-1" key={i.levelName} variant="outline">
                {i.levelName} {isFirstMaster && "(Primary)"}
              </Badge>
            ))}
        </>
      );
    },
  },
  {
    accessorKey: "isOne",
    header: "Position",
    cell: ({ row }) => {
      const record = row.original;

      return (
        <>
          {(record.level as LevelType[])
            .filter((i) => i.levelName !== "Master")
            .map((i) => (
              <Badge className="mx-1" key={i.levelName} variant="outline">
                {i.levelName}
              </Badge>
            ))}
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
          <EditEmployerModal editValues={record} />
          <DeleteEmployerModal employerId={+record.id} />
        </>
      );
    },
  },
];
