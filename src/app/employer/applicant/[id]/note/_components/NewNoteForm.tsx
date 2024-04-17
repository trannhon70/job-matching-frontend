"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { EmployerQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { queryClient } from "@/lib/query-client";
import { FormatErrorResponse } from "@/types";
import { Note as NoteType } from "@/types/employer/applicant";
import { CreateNoteBody } from "@/types/employer/setting";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { CalendarDays, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import "react-quill/dist/quill.snow.css";
import * as z from "zod";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const formSchema = z.object({
  content: z.string(),
});

interface Props {
  applicantId: string;
  closeModal?: () => void;
  data?: NoteType;
}

export const NewNoteForm: React.FC<Props> = ({
  applicantId,
  closeModal,
  data,
}) => {
  const { createNote, updateNote } = useEmployerApi();
  const createMutation = useMutation({
    mutationFn: (body: CreateNoteBody) => {
      return createNote(body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [`${EmployerQueryKeys.APPLICANT_NOTE}_${applicantId}`],
      });
      if (closeModal) closeModal();
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: CreateNoteBody) => {
      return updateNote(`${data?.id}`, body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [`${EmployerQueryKeys.APPLICANT_NOTE}_${applicantId}`],
      });
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
      ? {
          content: data.content,
        }
      : {},
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const currentTimestamp = new Date();
    const formattedTimestamp = format(
      currentTimestamp,
      "yyyy-MM-dd HH:mm:ss.SSS",
    );
    data
      ? updateMutation.mutate({
          ...values,
          createdAt: formattedTimestamp,
        })
      : createMutation.mutate({
          ...values,
          createdAt: formattedTimestamp,
          applyId: +applicantId,
        });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {data && (
          <div className="flex items-center gap-2 bg-gray-200 p-2">
            <CalendarDays />
            <span>
              {format(parseISO(`${data.createdAt}`), "LLL dd, y HH:mm")}
            </span>
          </div>
        )}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="pb-14 pt-4 md:pb-10">
              <FormControl>
                <ReactQuill
                  className="h-[300px]"
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className=" flex w-full justify-center pt-2">
          <Button
            disabled={createMutation.isLoading || updateMutation.isLoading}
            type="submit"
            className="mx-auto"
          >
            {(createMutation.isLoading || updateMutation.isLoading) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {data ? "Save" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
