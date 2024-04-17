"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { EmployerQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { queryClient } from "@/lib/query-client";
import { FormatErrorResponse } from "@/types";
import { UpdateJobPostingStatusType } from "@/types/employer/setting";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as z from "zod";
const formSchema = z.object({
  status: z.string(),
});

interface Props {
  defaultValues: { status: number };
  jobId: string;
  closeModal: () => void;
}

export const EditStatusForm: React.FC<Props> = ({
  jobId,
  defaultValues,
  closeModal,
}) => {
  const { status } = defaultValues;
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
      closeModal();
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: `${status}`,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      status: +values.status,
      listId: [+jobId],
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="0" />
                    </FormControl>
                    <FormLabel className="font-normal">Close</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="1" />
                    </FormControl>
                    <FormLabel className="font-normal">On Going</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="2" />
                    </FormControl>
                    <FormLabel className="font-normal">Suspended</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={mutation.isLoading} type="submit">
          {mutation.isLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Change
        </Button>
      </form>
    </Form>
  );
};
