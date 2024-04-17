"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import useCompanyInformation from "@/hooks/employee/useCompanyInformation";
import { FormatErrorResponse } from "@/types";
import { CreateReviewCompanyBodyType } from "@/types/employee/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as z from "zod";
const formSchema = z.object({
  content: z.string().refine((data) => data.trim() !== "", {
    message: "Content must be a non-empty string",
  }),
});

interface Props {
  companyId: number;
}

export const ReviewForm: React.FC<Props> = ({ companyId }) => {
  const { addReview } = useCompanyInformation();
  const { createReviewCompany } = useEmployeeApi();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const mutation = useMutation({
    mutationFn: (body: CreateReviewCompanyBodyType) => {
      return createReviewCompany(body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      const newReview = res.data.data;
      addReview(newReview);
      form.reset();
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      companyId,
      ...values,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} placeholder="Leave your review." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className=" flex w-full justify-end">
          <Button disabled={mutation.isLoading} type="submit">
            {mutation.isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Send
          </Button>
        </div>
      </form>
    </Form>
  );
};
