"use client";

import {
  CitySelect,
  CompanySelect,
  CountrySelect,
  MonthSelect,
  PositionSelect,
  YearSelect,
} from "@/components/selecter";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmployeeQueryKeys } from "@/enums";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import { queryClient } from "@/lib/query-client";
import { FormatErrorResponse } from "@/types";
import { AddExpBody, Experience } from "@/types/employee/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as z from "zod";
const formSchema = z.object({
  companyNames: z.string().refine((data) => data.trim() !== "", {
    message: "Company must be a non-empty string",
  }),
  positionNames: z.string().refine((data) => data.trim() !== "", {
    message: "Position must be a non-empty string",
  }),
  countrys: z.string(),
  provinceNames: z.string(),
  address: z.string(),
  monthStart: z.string(),
  yearStart: z.string(),
  monthEnd: z.string(),
  yearEnd: z.string(),
  description: z.string(),
  isCurrentWorking: z.boolean(),
});

interface Props {
  editValues: Experience | null;
  actionCloseModal: () => void;
}

export const WorkExpForm: React.FC<Props> = ({
  editValues,
  actionCloseModal,
}) => {
  const { addExp, updateExp } = useEmployeeApi();
  const createMutation = useMutation({
    mutationFn: (body: AddExpBody) => {
      return addExp(body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [EmployeeQueryKeys.USER_PROFILE_EXP],
      });
      actionCloseModal();
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: AddExpBody) => {
      return updateExp(editValues?.id as number, body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [EmployeeQueryKeys.USER_PROFILE_EXP],
      });
      actionCloseModal();
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: editValues
      ? {
          address: editValues.address,
          companyNames: `${editValues?.companyName ?? editValues?.company?.id}`,
          countrys: `${editValues.country.id}`,
          description: editValues.description,
          positionNames: `${
            editValues?.position?.id ?? editValues?.positionName
          }`,
          monthEnd: `${editValues.monthEnd}`,
          monthStart: `${editValues.monthStart}`,
          yearEnd: `${editValues.yearEnd}`,
          yearStart: `${editValues.yearStart}`,
          provinceNames: `${editValues.province.id}`,
          isCurrentWorking: false,
        }
      : {
          isCurrentWorking: false,
        },
  });

  const countryId = form.watch("countrys");
  const isCurrentWorking = form.watch("isCurrentWorking");
  useEffect(() => {
    form.setValue("provinceNames", `${editValues?.province?.id ?? ""}`);
  }, [countryId, form, editValues]);
  useEffect(() => {
    form.setValue(
      "companyNames",
      `${editValues?.companyName ?? editValues?.company?.id ?? ""}`,
    );
    form.setValue(
      "positionNames",
      `${editValues?.position?.id ?? editValues?.positionName ?? ""}`,
    );
  }, [form, editValues]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const body = {
      ...values,
      monthStart: +values.monthStart,
      monthEnd: +values.monthEnd,
      yearStart: +values.yearStart,
      yearEnd: +values.yearEnd,
      countrys: +values.countrys,
      provinceNames: +values.provinceNames,
    } as any;
    delete body["isCurrentWorking"];
    editValues ? updateMutation.mutate(body) : createMutation.mutate(body);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="companyNames"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <CompanySelect onChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="positionNames"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <PositionSelect onChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="countrys"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <CountrySelect onChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="provinceNames"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City/Town</FormLabel>
              <FormControl>
                <CitySelect
                  countryId={countryId}
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isCurrentWorking"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex space-x-2 py-4">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="terms1"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I&apos;m working here
                    </label>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid w-full grid-cols-1 items-end gap-4 md:grid-cols-4">
          <FormField
            control={form.control}
            name="monthStart"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start</FormLabel>
                <FormControl>
                  <MonthSelect value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yearStart"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <YearSelect value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isCurrentWorking && (
            <>
              <FormField
                control={form.control}
                name="monthEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End</FormLabel>
                    <FormControl>
                      <MonthSelect
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <YearSelect
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="pb-14 md:pb-10">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea value={field.value} onChange={field.onChange} />
                {/* <ReactQuill
                  className="h-[300px]"
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-center pt-4">
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
