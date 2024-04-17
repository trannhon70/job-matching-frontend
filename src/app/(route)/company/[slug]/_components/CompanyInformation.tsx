import { DetailCompanyType } from "@/types/employee/company";
import { useMemo } from "react";

interface Props {
  data: DetailCompanyType;
}

export const CompanyInformation: React.FC<Props> = ({ data }) => {
  const companyInfo = useMemo(
    () => [
      { title: "CEO", content: data?.employer[0]?.name ?? "" },
      {
        title: "Foundation",
        content: data.foundation,
      },
      { title: "Industry", content: data.industry.industryName },
      { title: "Employee", content: data.employee },
    ],
    [data],
  );
  return (
    <div className="overflow-hidden bg-white shadow-md">
      <div className="w-full bg-gradient-to-r from-indigo-900 to-indigo-500 px-6 py-3 text-lg font-semibold text-white">
        Company Introduction
      </div>
      <div className="w-full p-6 text-sm">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {companyInfo.map((i) => (
            <div key={i.title} className="">
              <div className="font-medium">{i.title}</div>
              <div>{i.content}</div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h6 className="font-medium uppercase">About us</h6>
          <div dangerouslySetInnerHTML={{ __html: data.information }} />
          <div dangerouslySetInnerHTML={{ __html: data.history }} />
        </div>
      </div>
    </div>
  );
};
