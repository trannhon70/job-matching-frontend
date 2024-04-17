"use client";

import {
  HoursSelect,
  JobsListSelect,
  MinutesSelect,
  PeriodSelect,
  TimeZoneSelect,
} from "@/components/selecter";
import { ApplicantSelect } from "@/components/selecter/ApplicantSelect";
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
import { EmployerQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { queryClient } from "@/lib/query-client";
import { cn } from "@/lib/utils";
import { FormatErrorResponse } from "@/types";
import { InterviewItemType } from "@/types/employer/interview";
import { CreateInterviewBodyType } from "@/types/employer/setting";
import { generateRandomString } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { CalendarIcon, Copy, Loader2, RefreshCcw } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useCopyToClipboard } from "usehooks-ts";
import * as z from "zod";
const formSchema = z.object({
  jobId: z.string(),
  userId: z.string(),
  title: z.string(),
  date: z.date(),
  estimateDate: z.date(),
  estimateHour: z.string(),
  estimateMinute: z.string(),
  estimatePeriodTime: z.string(),
  hour: z.string(),
  minute: z.string(),
  periodTime: z.string(),
  timeZone: z.string(),
  roomId: z.string(),
});

interface Props {
  closeModal: () => void;
  jobId?: number;
  userId?: number;
  editValues?: InterviewItemType;
}

export const InterviewRegisterForm: React.FC<Props> = ({
  jobId,
  userId,
  editValues,
  closeModal,
}) => {
  const { createInterview, updateInterview } = useEmployerApi();
  const [_, copy] = useCopyToClipboard();
  const hasInitialize = useRef<boolean>(false);
  const defaultValuesForm = useMemo(() => {
    if (editValues)
      return {
        hour: editValues.hour,
        minute: editValues.minute,
        title: editValues.title,
        jobId: editValues.job.id.toString(),
        userId: editValues.user.id.toString(),
        roomId: editValues.roomId,
        periodTime: editValues.periodTime,
        timeZone: editValues.timeZone.toString(),
        date: parseISO(editValues.date.toString()),
        estimateDate: parseISO(editValues.estimateDate.toString()),
        estimateHour: editValues.estimateHour,
        estimateMinute: editValues.estimateMinute,
        estimatePeriodTime: editValues.estimatePeriodTime,
      };
    if (jobId && userId)
      return {
        hour: "01",
        minute: "00",
        periodTime: "AM",
        estimateHour: "01",
        estimateMinute: "00",
        estimatePeriodTime: "AM",
        roomId: generateRandomString(6),
        jobId: `${jobId}`,
        userId: `${userId}`,
      };
    return {
      hour: "01",
      minute: "00",
      periodTime: "AM",
      estimateHour: "01",
      estimateMinute: "00",
      estimatePeriodTime: "AM",
      roomId: generateRandomString(6),
    };
  }, [editValues, jobId, userId]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValuesForm,
  });

  const watchJobId = form.watch("jobId");

  useEffect(() => {
    if (hasInitialize.current) {
      form.setValue("userId", "");
    } else {
      hasInitialize.current = true;
    }
  }, [watchJobId, form]);

  const mutation = useMutation({
    mutationFn: (body: CreateInterviewBodyType) => {
      if (editValues) return updateInterview(editValues.id, body);
      return createInterview(body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [EmployerQueryKeys.INTERVIEW],
      });
      closeModal();
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const body = {
      ...values,
      userId: +values.userId,
      jobId: +values.jobId,
      timeZone: +values.timeZone,
      date: format(values.date, "yyyy-MM-dd"),
      estimateDate: format(values.estimateDate, "yyyy-MM-dd"),
    };

    mutation.mutate(body);
  }

  const onClickReRandomRoomId = () => {
    form.setValue("roomId", generateRandomString(6));
  };

  const onClickCopyToClipboard = (value: string) => {
    copy(value);
    toast.success(`Copied successfully room ID: ${value}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="jobId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <JobsListSelect
                disabled={!!jobId}
                value={field.value}
                onChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Applicant</FormLabel>
              <FormControl>
                <ApplicantSelect
                  jobId={+watchJobId}
                  disabled={!!userId}
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full items-end gap-2">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
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

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hour"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <HoursSelect value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="minute"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MinutesSelect
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
            name="periodTime"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PeriodSelect value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full items-end gap-2">
          <FormField
            control={form.control}
            name="estimateDate"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col">
                <FormLabel>Estimate End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
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

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estimateHour"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <HoursSelect value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estimateMinute"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MinutesSelect
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
            name="estimatePeriodTime"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PeriodSelect value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="timeZone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <FormControl>
                <TimeZoneSelect value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roomId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room ID</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input {...field} readOnly placeholder="" />
                  <Button
                    onClick={onClickReRandomRoomId}
                    variant={"outline"}
                    type="button"
                  >
                    <RefreshCcw size={20} />
                  </Button>
                  <Button
                    onClick={() => {
                      onClickCopyToClipboard(field.value);
                    }}
                    variant={"outline"}
                    type="button"
                  >
                    <Copy size={20} />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="py-2 text-xs">
          When you register for an interview, you will be registered in the
          interview room invitation email and interview list by the
          applicant&apos;s email.
        </p>
        <div className=" flex w-full justify-center gap-2 pt-4">
          <Button variant={"outline"} onClick={closeModal}>
            Cancel
          </Button>
          <Button disabled={mutation.isLoading} type="submit">
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
