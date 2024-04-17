"use client";

import { CategorySelect } from "@/components/selecter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmployeeQueryKeys } from "@/enums";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import { queryClient } from "@/lib/query-client";
import { FormatErrorResponse } from "@/types";
import { SendQuestionBody } from "@/types/employee/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as z from "zod";
const formSchema = z.object({
  categoryId: z.string(),
  title: z.string(),
  question: z.string(),
  mail: z.string().email(),
  isAgree: z.boolean().default(false).optional(),
});

interface Props {
  closeModal?: () => void;
}

export const NewQNAForm: React.FC<Props> = ({ closeModal }) => {
  const session = useSession();
  const userId = session.data?.user.data.infoUser.id;
  const { sendQuestion } = useEmployeeApi();
  const mutation = useMutation({
    mutationFn: (body: SendQuestionBody) => {
      return sendQuestion(body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [EmployeeQueryKeys.QNA],
      });
      if (closeModal) closeModal();
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isAgree: false,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.isAgree) {
      toast.error("You have to agree policy to send your inquiry!");
      return;
    }
    const body = { ...values, categoryId: +values.categoryId } as any;
    if (userId) body["userId"] = userId;
    delete body["isAgree"];
    mutation.mutate(body);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Category
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <CategorySelect onChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Title<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Inquiry<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Inquiry" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Mail<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isAgree"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormDescription>
                  I agree to collect and use personal information.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div className=" flex w-full justify-center pt-4">
          <Button
            disabled={mutation.isLoading}
            type="submit"
            className="mx-auto"
          >
            {mutation.isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
