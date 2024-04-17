"use client";

import { MonthSelect, YearSelect } from "@/components/selecter";
import { Badge } from "@/components/ui/badge";
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
import { Label } from "@/components/ui/label";
import { EmployeeQueryKeys } from "@/enums";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import { queryClient } from "@/lib/query-client";
import { FormatErrorResponse } from "@/types";
import { Certificate as CertificateType } from "@/types/employee/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileImage, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as z from "zod";
const formSchema = z.object({
  nameFile: z.string(),
  hasNoExpirationDate: z.boolean(),
  monthStartCer: z.string(),
  yearStartCer: z.string(),
  monthEndCer: z.string().optional(),
  yearEndCer: z.string().optional(),
  file: z.any(),
  link: z.string().optional(),
});

interface Props {
  editValues: CertificateType | null;
  actionCloseModal: () => void;
}

export const CertificateForm: React.FC<Props> = ({
  editValues,
  actionCloseModal,
}) => {
  const { addCertificate, updateCertificate } = useEmployeeApi();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: editValues
      ? {
          nameFile: editValues.nameFile,
          link: editValues.link,
          monthStartCer: `${editValues.monthStartCer}`,
          monthEndCer: `${editValues.monthEndCer}`,
          yearStartCer: `${editValues.yearStartCer}`,
          yearEndCer: `${editValues.yearEndCer}`,
          hasNoExpirationDate: false,
          file: undefined,
        }
      : {
          hasNoExpirationDate: false,
          file: undefined,
        },
  });

  const createMutation = useMutation({
    mutationFn: (body: FormData) => {
      return addCertificate(body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [EmployeeQueryKeys.USER_PROFILE_CERTIFICATE],
      });
      actionCloseModal();
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: FormData) => {
      return updateCertificate(editValues?.id as number, body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [EmployeeQueryKeys.USER_PROFILE_CERTIFICATE],
      });
      actionCloseModal();
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  const hasNoExpirationDate = form.watch("hasNoExpirationDate");

  function onSubmit(values: z.infer<typeof formSchema>) {
    const body = { ...values } as any;
    if (hasNoExpirationDate) {
      delete body["monthEndCer"];
      delete body["yearEndCer"];
    }
    if (!body.link) delete body["link"];
    delete body["hasNoExpirationDate"];

    const keys = Object.keys(body);
    const formData = new FormData();
    for (const i of keys) {
      formData.append(i, body[i]);
    }
    editValues
      ? updateMutation.mutate(formData)
      : createMutation.mutate(formData);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="nameFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certificate Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Certificate Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hasNoExpirationDate"
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
                      The certificate has no expiration date
                    </label>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid w-full grid-cols-1 items-start gap-4 md:grid-cols-2">
          <div>
            <FormLabel>Start</FormLabel>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
              <FormField
                control={form.control}
                name="monthStartCer"
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
                name="yearStartCer"
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

          {!hasNoExpirationDate && (
            <>
              <div>
                <FormLabel>End</FormLabel>
                <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="monthEndCer"
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
                    name="yearEndCer"
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
            </>
          )}
        </div>
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload</FormLabel>
              <FormControl>
                <div className="flex w-full gap-2">
                  <Button asChild type="button" variant={"outline"}>
                    <Label
                      className="flex w-fit cursor-pointer gap-3"
                      htmlFor="picture"
                    >
                      <FileImage />
                      Upload
                    </Label>
                  </Button>
                  {field.value && <Badge>{field.value.name}</Badge>}
                  {editValues?.file && (
                    <Button asChild variant={"secondary"}>
                      <Link href={editValues?.file}>Current File</Link>
                    </Button>
                  )}
                  <Input
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                    id="picture"
                    type="file"
                    className="hidden"
                    // {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder="Link" {...field} />
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
