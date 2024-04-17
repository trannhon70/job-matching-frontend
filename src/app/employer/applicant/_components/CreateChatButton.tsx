import { Button } from "@/components/ui/button";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { FormatErrorResponse } from "@/types";
import { Loader2, MessageSquareMore } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

interface Props {
  applicantId: number;
}

export const CreateChatButton: React.FC<Props> = ({ applicantId }) => {
  const router = useRouter();
  const { createConversation } = useEmployerApi();
  const mutation = useMutation({
    mutationFn: (body: { applyId: number }) => {
      return createConversation(body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      const conversationId = res?.data?.data?.convesation ?? "";
      router.push(`/employer/chats/${conversationId}`);
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  const onClickChat = () => {
    mutation.mutate({ applyId: applicantId });
  };
  return (
    <Button
      disabled={mutation.isLoading}
      onClick={onClickChat}
      variant={"ghost"}
    >
      {mutation.isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <MessageSquareMore />
      )}
    </Button>
  );
};
