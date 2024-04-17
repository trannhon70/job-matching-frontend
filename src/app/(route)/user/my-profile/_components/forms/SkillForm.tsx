"use client";

import { SkillSelect } from "@/components/selecter";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Rate } from "@/components/ui/rate";
import { Textarea } from "@/components/ui/textarea";
import { EmployeeQueryKeys } from "@/enums";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import { queryClient } from "@/lib/query-client";
import { FormatErrorResponse } from "@/types";
import { AddSkillBody, UserTechnical } from "@/types/employee/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as z from "zod";
const formSchema = z.object({
  skillName: z.string().refine((data) => data.trim() !== "", {
    message: "Skill must be a non-empty string",
  }),
  rate: z.number(),
  description: z.string(),
});

interface Props {
  editValues: UserTechnical | null;
  actionCloseModal: () => void;
}

export const SkillForm: React.FC<Props> = ({
  editValues,
  actionCloseModal,
}) => {
  const { addSkill, updateSkill } = useEmployeeApi();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: editValues
      ? {
          rate: editValues.rate,
          description: editValues.description,
          skillName: `${editValues?.technical?.id ?? editValues?.skillName}`,
        }
      : {
          rate: 5,
        },
  });

  useEffect(() => {
    form.setValue(
      "skillName",
      `${editValues?.technical?.id ?? editValues?.skillName ?? ""}`,
    );
  }, [form, editValues]);

  const createMutation = useMutation({
    mutationFn: (body: AddSkillBody) => {
      return addSkill(body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [EmployeeQueryKeys.USER_PROFILE_SKILL],
      });
      actionCloseModal();
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: AddSkillBody) => {
      return updateSkill(editValues?.id as number, body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [EmployeeQueryKeys.USER_PROFILE_SKILL],
      });
      actionCloseModal();
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    editValues ? updateMutation.mutate(values) : createMutation.mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="skillName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Name</FormLabel>
              <FormControl>
                <SkillSelect value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rate</FormLabel>
              <FormControl>
                <Rate value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your skill" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" flex w-full justify-center pt-4">
          <Button
            disabled={createMutation.isLoading || updateMutation.isLoading}
            type="submit"
            className="mx-auto"
          >
            {(createMutation.isLoading || updateMutation.isLoading) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
