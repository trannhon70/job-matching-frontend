import { ControlType, columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  data: ControlType[];
}

export const ControlTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="mx-auto w-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
