"use client";

import { CitySelect, CountrySelect } from "@/components/selecter";
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
import { EmployeeQueryKeys } from "@/enums";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import { queryClient } from "@/lib/query-client";
import { FormatErrorResponse } from "@/types";
import { UpdateUserInformationBody, UserProfile } from "@/types/employee/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as z from "zod";
const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  countrys: z.string(),
  streetName: z.string(),
  city: z.string(),
  postalCode: z.string(),
});

interface Props {
  personalData: UserProfile;
  closeModal: () => void;
}

export const PersonalForm: React.FC<Props> = ({ personalData, closeModal }) => {
  const { updatePersonalInformation } = useEmployeeApi();
  const hasInitialize = useRef<boolean>(false);

  const updateMutation = useMutation({
    mutationFn: (body: UpdateUserInformationBody) => {
      return updatePersonalInformation(body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [EmployeeQueryKeys.USER_PROFILE],
      });
      closeModal();
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: personalData.firstName,
      lastName: personalData.lastName,
      phone: personalData.phone ?? "",
      countrys: `${personalData?.country?.id ?? ""}`,
      city: `${personalData?.province?.id ?? ""}`,
      streetName: personalData?.streetName ?? "",
      postalCode: `${personalData?.postalCode ?? ""}`,
    },
  });

  const countryId = form.watch("countrys");
  useEffect(() => {
    if (hasInitialize.current) {
      form.setValue("city", "");
    } else {
      hasInitialize.current = true;
    }
  }, [countryId, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const body = {
      ...values,
      countrys: +values.countrys,
      city: +values.city,
      postalCode: +values.postalCode,
    };
    updateMutation.mutate(body as UpdateUserInformationBody);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input placeholder="Phone number" {...field} />
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
          name="streetName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street name</FormLabel>
              <FormControl>
                <Input placeholder="Street name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal code</FormLabel>
              <FormControl>
                <Input placeholder="Postal code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-center">
          <Button
            disabled={updateMutation.isLoading}
            type="submit"
            className="mx-auto"
          >
            {updateMutation.isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
