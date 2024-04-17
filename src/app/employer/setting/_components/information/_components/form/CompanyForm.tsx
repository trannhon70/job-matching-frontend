"use client";

import { CountrySelect, IndustrySelect } from "@/components/selecter";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { FormatErrorResponse } from "@/types";
import { CompanyInformationType } from "@/types/employer/setting";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as z from "zod";

const formSchema = z.object({
  companyName: z.string().refine((data) => data.trim() !== "", {
    message: "Please input required information",
  }),
  email: z.string().email(),
  countryId: z.string(),
  address: z.string().refine((data) => data.trim() !== "", {
    message: "Please input required information",
  }),
  industryId: z.string(),
  employee: z.string(),
  foundation: z.string().refine((data) => data.trim() !== "", {
    message: "Please input required information",
  }),
  webPage: z.string().refine((data) => data.trim() !== "", {
    message: "Please input required information",
  }),
});

interface Props {
  defaultValue: CompanyInformationType;
}

export const CompanyForm: React.FC<Props> = ({ defaultValue }) => {
  const {
    companyName,
    foundation,
    address,
    webPage,
    employee,
    fileLogo,
    email,
  } = defaultValue;
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
      companyName,
      email,
      foundation,
      webPage,
      address,
      employee,
      countryId: `${defaultValue?.country?.id}`,
      industryId: `${defaultValue?.industry?.id}`,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    const keyList = Object.entries(values);
    for (const e of keyList) {
      if (e[1]) formData.append(e[0], e[1] as string | Blob);
    }
    mutation.mutate(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Company <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Company" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Company" type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="countryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Country <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <CountrySelect value={field.value} onChange={field.onChange} />
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
              <FormLabel>
                Address <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full gap-6">
          <FormField
            control={form.control}
            name="industryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Industry <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <IndustrySelect
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
            name="employee"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Employee <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Employee" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="foundation"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Foundation <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Foundation" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="webPage"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Web page <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Web page" />
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
