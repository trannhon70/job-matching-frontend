"use client";

import { QuestionType } from "@/types/employee/user";
import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";

export const columns: ColumnDef<QuestionType>[] = [
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const name = row.getValue("category") as any;
      return <>{name.categoryName}</>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "question",
    header: "Question",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return (
        <>{`${format(parseISO(`${row.getValue("date")}`), "LLL dd, y")}`}</>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      row.getValue("status") ? (
        <span className="text-green-600">Replied</span>
      ) : (
        <span className="text-blue-600">Delivered</span>
      ),
  },
];
