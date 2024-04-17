"use client";

import { Badge } from "@/components/ui/badge";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeQueryKeys } from "@/enums";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import { useMemo } from "react";
import { useQuery } from "react-query";

export const CountBox = () => {
  const { getCountJobUserProfile } = useEmployeeApi();
  const { data } = useQuery({
    queryKey: [EmployeeQueryKeys.SUBSCRIPTION_COUNT],
    queryFn: () => {
      return getCountJobUserProfile();
    },
  });

  const res = useMemo(() => data?.data.data ?? {}, [data]);
  return (
    <TabsList>
      <TabsTrigger value="save">
        Save <Badge className="ml-2">{res?.save ?? 0}</Badge>
      </TabsTrigger>
      <TabsTrigger value="apply">
        Apply <Badge className="ml-2">{res?.apply ?? 0}</Badge>
      </TabsTrigger>
      <TabsTrigger value="interview">
        Interview <Badge className="ml-2">{res?.interview ?? 0}</Badge>
      </TabsTrigger>
    </TabsList>
  );
};
