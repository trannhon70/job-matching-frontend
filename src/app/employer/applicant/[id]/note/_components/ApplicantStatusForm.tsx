"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { FormatErrorResponse } from "@/types";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

const FormSchema = z.object({
  status: z.enum(["0", "1", "2"], {
    required_error: "You need to select a status",
  }),
});

interface Props {
  applicantId: string;
  statusValue: string;
}

export const ApplicantStatusForm: React.FC<Props> = ({
  applicantId,
  statusValue,
}) => {
  const { updateApplicantStatus } = useEmployerApi();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: statusValue as "0" | "1" | "2",
    },
  });

  const mutation = useMutation({
    mutationFn: (body: { status: string }) => {
      return updateApplicantStatus(applicantId, body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="1" />
                    </FormControl>
                    <FormLabel className="font-normal">Interview</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="0" />
                    </FormControl>
                    <FormLabel className="font-normal">Hired</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="2" />
                    </FormControl>
                    <FormLabel className="font-normal">Refuse</FormLabel>
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
          Save Status
        </Button>
      </form>
    </Form>
  );
};
