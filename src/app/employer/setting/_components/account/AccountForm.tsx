"use client";

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
import { FormatErrorResponse, InfoUser } from "@/types";
import { UpdateMasterType } from "@/types/employer/setting";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as z from "zod";

interface Props {
  defaultValue: InfoUser | undefined;
}

const formSchema = z.object({
  name: z.string(),
  phone: z.string(),
  verifyCode: z.string().length(6),
});

export const AccountForm: React.FC<Props> = ({ defaultValue }) => {
  const { updateMaster } = useEmployerApi();
  const { email, name, phone } = defaultValue ?? {};
  const mutation = useMutation({
    mutationFn: (body: UpdateMasterType) => {
      return updateMaster(body);
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
      name,
      phone,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <FormLabel>Email</FormLabel>
          <Input className="bg-gray-100" readOnly value={email} />
        </div>
        <div>
          <FormLabel>Control</FormLabel>
          <Input className="bg-gray-100" readOnly value="Master" />
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Name" />
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
              <FormLabel>
                Phone number <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Phone number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="verifyCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Verify Code
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input {...field} placeholder="Verify code" />
                  <Button type="button">Send code</Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" flex w-full justify-center pt-4">
          <Button type="submit" className="mx-auto">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
