"use client";

import { EmployeeQueryKeys } from "@/enums";
import { getEmployeeProfileById } from "@/services/apis/job";
import { useMemo } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { UserProfile } from "../../user/_components";
import {
  Certificate,
  Education,
  PersonalInformation,
  Resume,
  Skills,
  WorkExp,
} from "../../user/my-profile/_components";

const EmployeeProfilePage = ({
  params,
}: {
  params: { employeeId: string };
}) => {
  const { isLoading, data, isError } = useQuery({
    queryKey: [EmployeeQueryKeys.EMPLOYEE_PROFILE],
    queryFn: () => {
      return getEmployeeProfileById(params.employeeId);
    },
  });
  const res = useMemo(() => data?.data?.data, [data]);
  if (isError)
    return (
      <div className="min-h-screen">
        <div className="container py-6">Not found</div>
      </div>
    );
  if (isLoading)
    return (
      <div className="min-h-screen">
        <div className="container py-6">
          {isLoading && (
            <div className="flex w-full justify-center pt-20">
              <ThreeCircles
                visible={true}
                height="50"
                width="50"
                color="#4682a9"
                ariaLabel="three-circles-loading"
              />
            </div>
          )}
        </div>
      </div>
    );
  return (
    <div className="min-h-screen">
      <div className="container py-6">
        {isLoading && <>loading</>}
        <div className="grid  grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="col-span-2 flex w-full flex-col gap-4">
            <UserProfile data={res} />
            <Resume data={res} isEditable={false} />
            <PersonalInformation data={res} isEditable={false} />
            <Education isEditable={false} propsData={res?.userSchool ?? []} />
            <Skills isEditable={false} propsData={res?.userTechnical ?? []} />
            <Certificate
              isEditable={false}
              propsData={res?.certificate ?? []}
            />
            <WorkExp isEditable={false} propsData={res?.experience ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfilePage;
