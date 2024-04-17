"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JobPostingStatus } from "@/enums/employer";
import { useApplicantState } from "@/hooks/employer/useApplicantState";
import useSearchJobPostingState from "@/hooks/employer/useSearchJobPostingState";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { TablePagination } from ".";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  closeModal: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  closeModal,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const { setSelectedIds, currentPage, selectedIds } = useApplicantState();
  const { filter } = useSearchJobPostingState();

  useEffect(() => {
    const selectedKeys = data.reduce((result, item, index) => {
      const rowItem = item as any;
      if (
        (filter as any).status === JobPostingStatus["On_Going"].toString() &&
        selectedIds.On_Going.includes(rowItem.id)
      )
        return { ...result, [index]: true };
      if (
        (filter as any).status === JobPostingStatus["Suspended"].toString() &&
        selectedIds.Suspended.includes(rowItem.id)
      )
        return { ...result, [index]: true };
      return result;
    }, {});
    setRowSelection(selectedKeys);
  }, [data, selectedIds, filter]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  useEffect(() => {
    setRowSelection({});
  }, [currentPage]);

  const onClickOk = () => {
    const selectedRowsId = table
      .getFilteredSelectedRowModel()
      .rows.map((i) => (i.original as any).id as number);
    if ((filter as any).status === JobPostingStatus["On_Going"].toString())
      setSelectedIds("On_Going", selectedRowsId);
    if ((filter as any).status === JobPostingStatus["Suspended"].toString())
      setSelectedIds("Suspended", selectedRowsId);

    closeModal();
  };

  return (
    <>
      <div className="mb-1 flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex w-full justify-center">
                    <Loader2 className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination />
      <div className="mt-4 flex w-full justify-center">
        <Button onClick={onClickOk}>
          OK ({Object.keys(rowSelection).length})
        </Button>
      </div>
    </>
  );
}
