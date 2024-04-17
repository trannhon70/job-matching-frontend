import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmployerQueryKeys } from "@/enums";
import { JobPostingStatus } from "@/enums/employer";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { useJobPostingState } from "@/hooks/employer/useJobPostingState";
import { queryClient } from "@/lib/query-client";
import { FormatErrorResponse } from "@/types";
import { UpdateJobPostingStatusType } from "@/types/employer/setting";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export const UpdateStatusAction = () => {
  const { selectedIds } = useJobPostingState();
  const { updateJobPostingStatus } = useEmployerApi();
  const mutation = useMutation({
    mutationFn: (body: UpdateJobPostingStatusType) => {
      return updateJobPostingStatus(body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [EmployerQueryKeys.JOB_POSTING],
      });
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  const onAction = (status: number) => {
    if (!selectedIds.length) return;
    mutation.mutate({
      listId: selectedIds,
      status,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button asChild>
          <div>Action</div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => onAction(JobPostingStatus["On_Going"])}
        >
          Open
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onAction(JobPostingStatus["On_Going"])}
        >
          {JobPostingStatus[JobPostingStatus.Close]}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onAction(JobPostingStatus["Suspended"])}
        >
          Suspended
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
