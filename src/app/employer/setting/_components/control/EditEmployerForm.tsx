"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EmployerQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { queryClient } from "@/lib/query-client";
import { FormatErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as z from "zod";
import { ControlType } from "./table";
const formSchema = z.object({
  level: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

const items = [
  {
    id: 1,
    label: "Master",
  },
  {
    id: 2,
    label: "HR Officer",
  },
  {
    id: 3,
    label: "Interviewer",
  },
] as const;

interface Props {
  editValues: ControlType;
  closeModal: () => void;
}

export const EditEmployerForm: React.FC<Props> = ({
  editValues,
  closeModal,
}) => {
  const { updateInviteEmployer } = useEmployerApi();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: editValues.level.map((i) => i.id),
    },
  });

  const mutation = useMutation({
    mutationFn: (body: { level: number[] }) => {
      return updateInviteEmployer(+editValues.id, body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [EmployerQueryKeys.CONTROL_EMPLOYER],
      });
      closeModal();
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem className="grid grid-cols-2 gap-x-4">
              <div className="flex flex-col bg-gray-200/50 p-4">
                <FormLabel className="mb-2">Level</FormLabel>
                {items.slice(0, 1).map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="level"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <div className="!mt-0 flex h-full flex-col bg-gray-200/50 p-4">
                <FormLabel className="mb-2">Users</FormLabel>
                {items.slice(1, items.length).map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="level"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>

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
