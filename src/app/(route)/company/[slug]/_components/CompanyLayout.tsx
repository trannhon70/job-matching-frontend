"use client";

import { DetailCompanyType } from "@/types/employee/company";
import { useMediaQuery } from "usehooks-ts";
import { CompanyInformation, Contact, JobsList, Profile, Review } from ".";

interface Props {
  data: DetailCompanyType;
}

export const CompanyLayout: React.FC<Props> = ({ data }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <div className="min-h-screen bg-cyan-950/10">
      <div className="container py-4">
        <Profile data={data} />
        <div className="mt-6 grid grid-cols-1 gap-6 gap-x-0 lg:grid-cols-3 lg:gap-x-6">
          <div className="col-span-2 flex flex-col gap-6">
            {!isDesktop && <Contact data={data} />}
            <CompanyInformation data={data} />
            <JobsList id={data.id} />
          </div>
          <div className="flex w-full flex-col gap-6">
            {isDesktop && <Contact data={data} />}
            <Review id={data.id} reviewList={data.review} />
          </div>
        </div>
      </div>
    </div>
  );
};
