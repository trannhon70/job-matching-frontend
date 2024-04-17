"use client";

import { TablePagination } from ".";
import { Filter } from "..";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  data: any;
  isLoading: boolean;
}

export const JobPostingTable: React.FC<Props> = ({ data, isLoading }) => {
  return (
    <div className="mx-auto w-full">
      <Filter />
      <DataTable isLoading={isLoading} columns={columns} data={data} />
      <TablePagination />
    </div>
  );
};
