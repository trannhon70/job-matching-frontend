import { Button } from "@/components/ui/button";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { FormatErrorResponse } from "@/types";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

interface Props {
  id: number;
  roomId: string;
  isActive: boolean;
}
export const JoinInterviewButton: React.FC<Props> = ({
  id,
  roomId,
  isActive,
}) => {
  const { getInterviewRoom } = useEmployerApi();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (id: number) => {
      return getInterviewRoom(id, roomId);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      router.push(`/interview/${roomId}/${id}`);
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  const onClick = () => {
    mutation.mutate(id);
  };

  return (
    <Button onClick={onClick} disabled={mutation.isLoading || !isActive}>
      {mutation.isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        "Join"
      )}
    </Button>
  );
};
