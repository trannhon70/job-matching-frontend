"use client";

import * as z from "zod";

import { Loader2 } from "lucide-react";

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
import { cn } from "@/lib/utils";
import { sendVerifyCodeApi } from "@/services/apis";
import { FormatErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

const formSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

const extendedFormSchema = formSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Password does not match",
  },
);

export function RegisterForm() {
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const sendCodeMutation = useMutation({
    mutationFn: (data: { email: string }) => {
      return sendVerifyCodeApi(data);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });

  const sendVerifyCode = (email: string) => {
    if (!email) return;
    sendCodeMutation.mutate({ email });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      extendedFormSchema.parse(values);
    } catch (error) {
      const err = JSON.parse(error as string)[0];
      form.setError("confirmPassword", {
        type: "custom",
        message: err?.message,
      });
      return;
    }
    setIsLoading(true);
    const { email, password, code } = values;
    const res = await signIn("sign-up", {
      email,
      password,
      code,
      callbackUrl: "/",
      redirect: false,
    });
    if (res && !res.ok) {
      toast.error(res?.error);
    }
    if (res && res.ok) {
      replace("/");
    }
    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                  <Input placeholder="Verify code" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                  />
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
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} className="mt-4 w-full" type="submit">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign up
          </Button>
        </form>
      </Form>
      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link className="text-blue-600 underline" href="/login">
          Login
        </Link>
      </p>
      <p className="text-center text-xs">
        Membership registration will be carried out according to the approval of
        the approval code sent by email.If you do not agree with the terms and
        conditions and privacy policy, cancel your membership.
      </p>
    </div>
  );
}
