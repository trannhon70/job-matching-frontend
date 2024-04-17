import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import { FormatErrorResponse } from "@/types";
import { ApplyJobBody } from "@/types/employee/job";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

const useApplyJobMutation = () => {
  const { applyJob } = useEmployeeApi();
  const saveMutation = useMutation({
    mutationFn: (body: ApplyJobBody) => {
      return applyJob(body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });
  return saveMutation;
};

export default useApplyJobMutation;
