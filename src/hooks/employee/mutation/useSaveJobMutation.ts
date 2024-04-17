import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import { FormatErrorResponse } from "@/types";
import { SaveJobBody } from "@/types/employee/job";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

const useSaveJobMutation = () => {
  const { saveJob } = useEmployeeApi();
  const saveMutation = useMutation({
    mutationFn: (body: SaveJobBody) => {
      return saveJob(body);
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

export default useSaveJobMutation;
