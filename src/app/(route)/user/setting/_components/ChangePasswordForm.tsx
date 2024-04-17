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
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import { FormatErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as z from "zod";

const formSchema = z.object({
  code: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export const ChangePasswordForm = () => {
  const router = useRouter();
  const { sendCodeResetPassword, resetPassword } = useEmployeeApi();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const sendCodeMutation = useMutation({
    mutationFn: (data: { email: string }) => {
      return sendCodeResetPassword(data);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  const resetMutation = useMutation({
    mutationFn: (data: { password: string; code: string }) => {
      return resetPassword(data);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      router.push("/user/my-profile");
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    resetMutation.mutate({ code: values.code, password: values.password });
  }

  const sendVerifyCode = (email: string) => {
    if (!email) return;
    sendCodeMutation.mutate({ email });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[32rem] space-y-2"
      >
        <h2 className="mb-6 border-l-8 border-indigo-900 pl-2 text-xl font-bold">
          Change password
        </h2>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <Button
                  type="button"
                  disabled={sendCodeMutation.isLoading}
                  onClick={() => {
                    sendVerifyCode(field.value);
                  }}
                >
                  {sendCodeMutation.isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Send code
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verify code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-center">
          <Button
            disabled={resetMutation.isLoading}
            type="submit"
            className="mx-auto"
          >
            {resetMutation.isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
