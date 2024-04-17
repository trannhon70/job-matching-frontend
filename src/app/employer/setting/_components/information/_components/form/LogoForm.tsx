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
import { Label } from "@/components/ui/label";
import { EmployerQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { queryClient } from "@/lib/query-client";
import { FormatErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as z from "zod";

const formSchema = z.object({
  file: z.nullable(z.instanceof(File, { message: "Logo is required" })),
});

interface Props {
  defaultImage: string;
  closeModal: () => void;
}

export const LogoForm: React.FC<Props> = ({ defaultImage, closeModal }) => {
  const { update } = useSession();
  const { uploadAvatar } = useEmployerApi();
  const mutation = useMutation({
    mutationFn: (body: FormData) => {
      return uploadAvatar(body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [EmployerQueryKeys.INFORMATION_EMPLOYER],
      });
      const newLogo = res?.data?.data ?? "";
      update({ newLogoEmployer: newLogo });
      closeModal();
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("file", values.file as string | Blob);
    mutation.mutate(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <div>
                  {defaultImage && !field.value && (
                    <Image
                      className="my-4"
                      src={defaultImage}
                      alt="logo"
                      width={200}
                      height={200}
                    />
                  )}
                  {field.value && (
                    <Image
                      className="my-4"
                      src={URL.createObjectURL(field.value)}
                      alt="logo"
                      width={200}
                      height={200}
                    />
                  )}
                  <Button type="button" className="w-fit">
                    <Label htmlFor="logo" className="flex items-center gap-2">
                      Upload <Upload size={20} />
                    </Label>
                  </Button>

                  <Input
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                    id="logo"
                    type="file"
                    className="hidden"
                  />
                </div>
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
