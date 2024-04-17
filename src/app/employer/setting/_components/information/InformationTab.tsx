"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmployerQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { CompanyInformationType } from "@/types/employer/setting";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { CompanyForm, HistoryForm, InformationForm } from "./_components/form";
import { UploadAvatarModal } from "./_components/modal/UploadAvatarModal";

export const InformationTab = () => {
  const { getCompanyEmployerInformation } = useEmployerApi();
  const session = useSession();
  const isAuthenticated = session.data?.user.data.token;
  const { isLoading, data, isError } = useQuery({
    queryKey: [EmployerQueryKeys.INFORMATION_EMPLOYER, isAuthenticated],
    queryFn: () => {
      return getCompanyEmployerInformation();
    },
    enabled: !!isAuthenticated,
  });

  const res = useMemo(
    () => (data?.data?.data as CompanyInformationType) ?? {},
    [data],
  );

  if (isLoading || !isAuthenticated)
    return (
      <div className="flex w-full justify-center pt-20">
        <ThreeCircles
          visible={true}
          height="30"
          width="30"
          color="#4682a9"
          ariaLabel="three-circles-loading"
        />
      </div>
    );
  if (isError) return <>Not found</>;

  return (
    <div className="grid grid-cols-2 gap-4 border p-4">
      <Card>
        <CardHeader>
          <CardTitle>Company</CardTitle>
          <CardContent className="pt-6">
            <UploadAvatarModal values={res} />
            <CompanyForm defaultValue={res} />
          </CardContent>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Information</CardTitle>
          <CardContent className="pt-6">
            <InformationForm defaultValue={res.information} />
          </CardContent>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>History</CardTitle>
          <CardContent className="pt-6">
            <HistoryForm defaultValue={res.history} />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};
