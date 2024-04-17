"use client";

import { signIn } from "next-auth/react";
import * as z from "zod";

import { Loader2 } from "lucide-react";

import googleIcon from "@/assets/icons/google-icon.svg";
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
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function LoginForm() {
  const { push, refresh } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { email, password } = values;
    const res = await signIn("sign-in", {
      email,
      password,
      callbackUrl: "/",
      redirect: false,
    });
    if (res && !res.ok) {
      toast.error(res?.error);
    }
    if (res && res.ok) {
      push("/");
      refresh();
    }
    setIsLoading(false);
  }

  async function loginWithFacebook() {
    setIsLoading(true);
    const res = await signIn("facebook", {
      callbackUrl: "/",
      redirect: false,
    });
    if (res && !res.ok) {
      toast.error(res?.error);
    }
    setIsLoading(false);
  }

  async function loginWithGoogle() {
    setIsLoading(true);
    const res = await signIn("google", {
      callbackUrl: "/",
      redirect: false,
    });
    if (res && !res.ok) {
      toast.error(res?.error);
    }
    setIsLoading(false);
  }

  async function loginWithApple() {
    setIsLoading(true);
    const res = await signIn("apple", {
      callbackUrl: "/",
      redirect: false,
    });
    if (res && !res.ok) {
      toast.error(res?.error);
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
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
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
          <Button disabled={isLoading} className="mt-4 w-full" type="submit">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          onClick={loginWithGoogle}
          disabled={isLoading}
          type="button"
          variant={"outline"}
        >
          <Image
            src={googleIcon}
            width={24}
            height={24}
            alt="google-icon"
            className="mr-4"
          />
          Google
        </Button>
        {/* <Button
          onClick={loginWithFacebook}
          disabled={isLoading}
          type="button"
          variant={"outline"}
        >
          <Image
            src={facebookIcon}
            width={24}
            height={24}
            alt="google-icon"
            className="mr-4"
          />
          Facebook
        </Button>
        <Button
          onClick={loginWithApple}
          disabled={isLoading}
          type="button"
          variant={"outline"}
        >
          <Image
            src={appleIcon}
            width={24}
            height={24}
            alt="google-icon"
            className="mr-4"
          />
          Apple
        </Button> */}
      </div>
      <p className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link className="text-blue-600 underline" href="/register">
          Register
        </Link>
      </p>
    </div>
  );
}
