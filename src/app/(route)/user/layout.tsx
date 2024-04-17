"use client";

import { EmployeeQueryKeys } from "@/enums";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import useUserProfile from "@/hooks/employee/useUserProfile";
import { UserProfile as UserProfileType } from "@/types/employee/user";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useMediaQuery } from "usehooks-ts";
import { UserProfile } from "./_components";
import { ActionBox } from "./my-profile/_components";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { setUserProfile } = useUserProfile();
  const { getUserProfileInformation } = useEmployeeApi();
  const session = useSession();
  const isAuthenticated = session.data?.user.data.token;
  const { isLoading, data, isError } = useQuery({
    queryKey: [EmployeeQueryKeys.USER_PROFILE],
    queryFn: () => {
      return getUserProfileInformation();
    },
    onSuccess: (res) => {
      setUserProfile(res?.data?.data);
    },
    enabled: !!isAuthenticated,
  });

  const res = useMemo(() => data?.data?.data, [data]) as UserProfileType;

  if (isError) return <>Error</>;

  if (isLoading || !isAuthenticated || !res)
    return (
      <div className="min-h-screen">
        <div className="flex w-full justify-center py-20">
          <ThreeCircles
            visible={true}
            height="50"
            width="50"
            color="#4682a9"
            ariaLabel="three-circles-loading"
          />
        </div>
      </div>
    );

  return (
    <div className="min-h-screen">
      <div className="container py-6">
        <div className="grid  grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="col-span-2 flex w-full flex-col gap-4">
            <UserProfile data={res} />
            {!isDesktop && <ActionBox />}
            {children}
          </div>
          <div className="relative flex w-full flex-col gap-4">
            {isDesktop && <ActionBox />}
          </div>
        </div>
      </div>
    </div>
  );
}
