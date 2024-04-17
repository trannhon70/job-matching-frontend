"use client";

import {
  CountrySelect,
  CurrencySelect,
  LanguageSelect,
  PositionSelect,
} from "@/components/selecter";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { EmployerQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { queryClient } from "@/lib/query-client";
import { cn } from "@/lib/utils";
import { FormatErrorResponse } from "@/types";
import { JobPostingType } from "@/types/employer/job-posting";
import { CreateJobPostingType } from "@/types/employer/setting";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as z from "zod";

const formSchema = z.object({
  jobTitle: z.string(),
  summary: z.string(),
  countryId: z.string(),
  languages: z.string(),
  positions: z.string(),
  skillAbilities: z.string(),
  specificDuties: z.string(),
  duty: z.string(),
  jobType: z.string(),
  startDate: z.date(),
  salary: z.string(),
  insurance: z.string(),
  hour: z.string(),
  accommodation: z.string(),
  visa: z.string(),
  vacation: z.string(),
  benefit: z.string(),
  period: z.object({
    from: z.date(),
    to: z.date(),
  }),
  dateRecruitment: z.date(),
  document: z.string(),
  process: z.string(),
  officer: z.string(),
  other: z.string(),
  currency: z.string(),
});

interface Props {
  defaultValues?: JobPostingType;
  closeModal?: () => void;
}

export const JobPostingForm: React.FC<Props> = ({
  defaultValues,
  closeModal,
}) => {
  const {
    jobTitle,
    skillAbilities,
    specificDuties,
    duty,
    hour,
    accommodation,
    summary,
    other,
    officer,
    visa,
    vacation,
    benefit,
    salary,
    document,
    country,
    startDate,
    position,
    process,
    periodStart,
    language,
    periodEnd,
    dateRecruitment,
    insurance,
    id: jobId,
    positionName,
    currency,
    jobType,
  } = defaultValues ?? {};

  const { push } = useRouter();
  const { createJobPosting, updateJobPosting } = useEmployerApi();
  const updateMutation = useMutation({
    mutationFn: (body: CreateJobPostingType) => {
      return updateJobPosting(jobId as number, body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      if (defaultValues && closeModal) {
        closeModal();
        queryClient.invalidateQueries({
          queryKey: [EmployerQueryKeys.JOB_POSTING],
        });
        return;
      }
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  const createMutation = useMutation({
    mutationFn: (body: CreateJobPostingType) => {
      return createJobPosting(body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      push("/employer/job-posting");
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
      ? {
          insurance,
          jobTitle,
          skillAbilities,
          specificDuties,
          duty,
          salary,
          hour,
          accommodation,
          visa,
          vacation,
          benefit,
          document,
          process,
          other,
          officer,
          summary,
          currency,
          jobType,
          languages: `${language.id}`,
          startDate: parseISO(`${startDate}`),
          countryId: `${country.id}`,
          positions: `${positionName ?? position?.id}`,
          period: {
            from: parseISO(`${periodStart}`),
            to: parseISO(`${periodEnd}`),
          },
          dateRecruitment: parseISO(`${dateRecruitment}`),
        }
      : {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedData = {
      ...values,
      countryId: +values.countryId,
      startDate: format(values.startDate, "yyyy-MM-dd"),
      dateRecruitment: format(values.dateRecruitment, "yyyy-MM-dd"),
      periodStart: format(values.period.from, "yyyy-MM-dd"),
      periodEnd: format(values.period.to, "yyyy-MM-dd"),
      languages: +values.languages,
    } as any;
    delete formattedData["positions"];
    delete formattedData["positionName"];
    +values.positions
      ? (formattedData["positions"] = +values.positions)
      : (formattedData["positionName"] = values.positions);

    defaultValues
      ? updateMutation.mutate(formattedData)
      : createMutation.mutate(formattedData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Job title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Summary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-x-6">
          <FormField
            control={form.control}
            name="countryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <CountrySelect
                    hasAllCountryOption
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
            name="languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <LanguageSelect
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="py-4">
          <Separator />
        </div>
        <div>
          <h2 className="mb-6 border-l-8 border-indigo-900 pl-2 text-lg font-bold">
            Detail Information
          </h2>
        </div>

        <FormField
          control={form.control}
          name="jobType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job type</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="positions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <PositionSelect value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skillAbilities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills And Abilities</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Skills And Abilities" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specificDuties"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specific Duties</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Specific Duties" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duty</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Duty" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="py-4">
          <Separator />
        </div>
        <div>
          <h2 className="mb-6 border-l-8 border-indigo-900 pl-2 text-lg font-bold">
            Work Condition
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Starting Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <CurrencySelect
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
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Salary" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="insurance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Insurance</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Insurance" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hour"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hours</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Hours" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accommodation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Accommodation</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Accommodation" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="visa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visa</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Visa" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vacation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vacation</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Vacation" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="benefit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Benefit</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Benefit" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="py-4">
          <Separator />
        </div>

        <div>
          <h2 className="mb-6 border-l-8 border-indigo-900 pl-2 text-lg font-bold">
            Apply
          </h2>
        </div>

        <FormField
          control={form.control}
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Period</FormLabel>
              <FormControl>
                <div className={cn("grid gap-2")}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateRecruitment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date Of Recruitment</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="document"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Documents</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Documents" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="process"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Process</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Process" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="officer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HR Officer</FormLabel>
              <FormControl>
                <Input {...field} placeholder="HR Officer" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="other"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Other</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Other" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className=" flex w-full justify-center gap-4 pt-4">
          <Button variant={"outline"} type="button" asChild>
            <Link href={"/employer/job-posting"}>Back to list</Link>
          </Button>
          <Button
            disabled={updateMutation.isLoading || createMutation.isLoading}
            type="submit"
          >
            {(updateMutation.isLoading || createMutation.isLoading) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
