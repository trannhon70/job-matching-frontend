import { DetailCompanyType } from "@/types/employee/company";
import { MapPin } from "lucide-react";

interface Props {
  data: DetailCompanyType;
}

export const Contact: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-hidden bg-white shadow-md">
      <div className="w-full bg-gradient-to-r from-indigo-900 to-indigo-500 px-6 py-3 text-lg font-semibold text-white">
        Contact information
      </div>
      <div className="w-full p-6 text-sm">
        <div>
          <div className="flex gap-2">
            <MapPin className="min-w-[30px]" />
            <p className="font-medium">{data?.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
