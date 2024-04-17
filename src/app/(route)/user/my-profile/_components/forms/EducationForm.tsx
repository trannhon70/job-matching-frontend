"use client";

import {
  CitySelect,
  CountrySelect,
  LevelSelect,
  MajorSelect,
  MonthSelect,
  SchoolSelect,
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
import { EmployeeQueryKeys } from "@/enums";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import { queryClient } from "@/lib/query-client";
import { FormatErrorResponse } from "@/types";
import { AddEducationBody, UserSchool } from "@/types/employee/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as z from "zod";
const formSchema = z.object({
  levelSchools: z.string(),
  majors: z.string().refine((data) => data.trim() !== "", {
    message: "Majors must be a non-empty string",
  }),
  schoolNames: z.string().refine((data) => data.trim() !== "", {
    message: "School must be a non-empty string",
  }),
  countrys: z.string(),
  city: z.string().refine((data) => data.trim() !== "", {
    message: "City must be a non-empty string",
  }),
  monthStartEdu: z.string(),
  yearStartEdu: z.string(),
  monthEndEdu: z.string().optional(),
  yearEndEdu: z.string().optional(),
  isCurrentLearning: z.boolean(),
});

interface Props {
  editValues: UserSchool | null;
  actionCloseModal: () => void;
}

export const EducationForm: React.FC<Props> = ({
  editValues,
  actionCloseModal,
}) => {
  const { addEducation, updateEducation } = useEmployeeApi();

  const createMutation = useMutation({
    mutationFn: (body: AddEducationBody) => {
      return addEducation(body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [EmployeeQueryKeys.USER_PROFILE_EDUCATION],
      });
      actionCloseModal();
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: AddEducationBody) => {
      return updateEducation(editValues?.id as number, body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [EmployeeQueryKeys.USER_PROFILE_EDUCATION],
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
          levelSchools: `${editValues?.levelSchool.id}`,
          majors: `${editValues?.major?.id ?? editValues?.majorName}`,
          schoolNames: `${editValues?.school?.id ?? editValues?.schoolName}`,
          countrys: `${editValues?.country.id}`,
          city: `${editValues?.province.id}`,
          monthStartEdu: `${editValues?.monthStartEdu}`,
          monthEndEdu: `${editValues?.monthEndEdu}`,
          yearEndEdu: `${editValues?.yearEndEdu}`,
          yearStartEdu: `${editValues?.yearStartEdu}`,
          isCurrentLearning:
            !!editValues.yearEndEdu && !!editValues.monthEndEdu && false,
        }
      : {
          isCurrentLearning: false,
        },
  });

  const countryId = form.watch("countrys");
  useEffect(() => {
    form.setValue("city", `${editValues?.province?.id ?? ""}`);
  }, [countryId, form, editValues]);
  useEffect(() => {
    form.setValue(
      "schoolNames",
      `${editValues?.school?.id ?? editValues?.schoolName ?? ""}`,
    );
    form.setValue(
      "majors",
      `${editValues?.major?.id ?? editValues?.majorName ?? ""}`,
    );
  }, [form, editValues]);

  const isCurrentLearning = form.watch("isCurrentLearning");

  function onSubmit(values: z.infer<typeof formSchema>) {
    const body = {
      majors: values.majors,
      schoolNames: values.schoolNames,
      levelSchools: +values.levelSchools,
      countrys: +values.countrys,
      city: +values.city,
      monthStartEdu: +values.monthStartEdu,
      monthEndEdu: values.monthEndEdu && +values.monthEndEdu,
      yearEndEdu: values.yearEndEdu && +values.yearEndEdu,
      yearStartEdu: +values.yearStartEdu,
    } as any;
    if (isCurrentLearning) {
      delete body["monthEndEdu"];
      delete body["yearEndEdu"];
    }
    editValues ? updateMutation.mutate(body) : createMutation.mutate(body);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="levelSchools"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level of education</FormLabel>
              <FormControl>
                <LevelSelect value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="schoolNames"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School</FormLabel>
              <FormControl>
                <SchoolSelect value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="majors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Major</FormLabel>
              <FormControl>
                <MajorSelect value={field.value} onChange={field.onChange} />
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
                <CountrySelect value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City/Town</FormLabel>
              <FormControl>
                <CitySelect
                  countryId={countryId}
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
          name="isCurrentLearning"
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
                      I&apos;m learning here
                    </label>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid w-full grid-cols-1 items-start gap-4 md:grid-cols-2">
          <div>
            <FormLabel>Start</FormLabel>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="monthStartEdu"
                render={({ field }) => (
                  <FormItem>
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
                name="yearStartEdu"
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
            </div>
          </div>

          {!isCurrentLearning && (
            <div>
              <FormLabel>End</FormLabel>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="monthEndEdu"
                  render={({ field }) => (
                    <FormItem>
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
                  name="yearEndEdu"
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
              </div>
            </div>
          )}
        </div>

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
