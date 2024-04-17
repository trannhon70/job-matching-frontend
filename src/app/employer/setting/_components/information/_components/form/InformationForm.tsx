"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { FormatErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import "react-quill/dist/quill.snow.css";
import * as z from "zod";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const formSchema = z.object({
  information: z.string(),
});

interface Props {
  defaultValue: string;
}

export const InformationForm: React.FC<Props> = ({ defaultValue }) => {
  const { updateCompanyInformation } = useEmployerApi();
  const mutation = useMutation({
    mutationFn: (body: FormData) => {
      return updateCompanyInformation(body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      information: defaultValue ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    const keyList = Object.entries(values);
    for (const e of keyList) {
      formData.append(e[0], e[1]);
    }
    mutation.mutate(formData);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="information"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ReactQuill
                  {...field}
                  className="mb-10 h-[500px]"
                  theme="snow"
                />
              </FormControl>
              <FormMessage />
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
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
