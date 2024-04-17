import avatar from "@/assets/images/default-avatar-employee.png";
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
import { EmployeeQueryKeys } from "@/enums";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import useUserProfile from "@/hooks/employee/useUserProfile";
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
  file: z.instanceof(File, { message: "Avatar file is required" }),
});

interface Props {
  closeModal: () => void;
}

export const UploadAvatarForm: React.FC<Props> = ({ closeModal }) => {
  const { update } = useSession();
  const { data } = useUserProfile();
  const { uploadAvatar } = useEmployeeApi();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const mutation = useMutation({
    mutationFn: (body: FormData) => {
      return uploadAvatar(body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [EmployeeQueryKeys.USER_PROFILE],
      });
      const newLogoEmployee = res?.data?.data ?? "";
      update({ newLogoEmployee });
      closeModal();
    },
    onError: (err) => {
      const error = err as FormatErrorResponse;
      toast.error(error.response.data.message);
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("file", values.file);
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
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <div>
                  {!field.value && (
                    <div className="relative mx-auto mt-8 h-52 w-52 overflow-hidden rounded-full">
                      <Image
                        src={data?.avatarUrl ?? avatar}
                        alt="logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {field.value && (
                    <div className="relative mx-auto mt-8 h-52 w-52 overflow-hidden rounded-full">
                      <Image
                        src={URL.createObjectURL(field.value)}
                        alt="logo"
                        fill
                        className="object-cover"
                      />
                    </div>
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
