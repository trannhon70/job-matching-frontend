"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { realtime } from "@/lib/firebase";
import { FormatErrorResponse } from "@/types";
import { Chat } from "@/types/employer/chat";
import { SendMessageType } from "@/types/employer/setting";
import { zodResolver } from "@hookform/resolvers/zod";
import { ref, set } from "firebase/database";
import { SendHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as z from "zod";

const formSchema = z.object({
  content: z.string(),
});

interface Props {
  conversationId: string;
  type: "employee" | "employer";
  updateMessagesList: (newMessage: Chat) => void;
  scrollToBottomConversation: () => void;
}

export const ChatForm: React.FC<Props> = ({
  type,
  conversationId,
  updateMessagesList,
  scrollToBottomConversation,
}) => {
  const { sendMessage } = useEmployerApi();
  const { sendMessageEmployee } = useEmployeeApi();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.content) return;
    form.reset();
    mutation.mutate({ ...values, conversationId });
  }
  const mutation = useMutation({
    mutationFn: (body: SendMessageType) => {
      return type === "employer"
        ? sendMessage(body)
        : sendMessageEmployee(body);
    },
    onSuccess: async (res) => {
      const newMessage = res?.data?.data as Chat;
      updateMessagesList(newMessage);
      set(ref(realtime, `messages/${conversationId}`), {
        content: newMessage,
      });
      scrollToBottomConversation();
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full items-center gap-2 px-4 py-2"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="w-full rounded border px-2 py-2"
                  type="text"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={mutation.isLoading} type="submit" variant={"ghost"}>
          <SendHorizontal />
        </Button>
      </form>
    </Form>
  );
};
