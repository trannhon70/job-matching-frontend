import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { EmployeeQueryKeys } from "@/enums";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import useUserProfile from "@/hooks/employee/useUserProfile";
import { queryClient } from "@/lib/query-client";
import { FormatErrorResponse } from "@/types";
import { UpdateOpenToWorkType } from "@/types/employee/job";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export const ActionBox = () => {
  const { data } = useUserProfile();
  const { updateOpenToWork } = useEmployeeApi();
  const mutation = useMutation({
    mutationFn: (body: UpdateOpenToWorkType) => {
      return updateOpenToWork(body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [EmployeeQueryKeys.USER_PROFILE],
      });
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  const onChange = () => {
    mutation.mutate({
      openToWork: `${!data?.openToWork}`,
    });
  };

  return (
    <Card className="top-20 p-6 shadow-sm lg:sticky">
      <div className="flex items-center gap-4">
        <Switch
          disabled={mutation.isLoading}
          checked={data?.openToWork}
          onCheckedChange={onChange}
        />
        <p className="text-base font-bold text-gray-500">Open to work</p>
      </div>
      <p className="mt-4 text-sm font-light">
        Turning on job search helps your profile stand out more and get more
        attention in NTDs search list.
      </p>
    </Card>
  );
};
