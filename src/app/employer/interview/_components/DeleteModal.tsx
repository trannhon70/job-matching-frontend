"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/custom-dialog";
import { EmployerQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import useCheckAuthorization from "@/hooks/employer/useCheckAuthorization";
import { queryClient } from "@/lib/query-client";
import { FormatErrorResponse } from "@/types";
import { Loader2, X, XSquare } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useBoolean } from "usehooks-ts";

interface Props {
  interviewId: number;
}

export const DeleteModal: React.FC<Props> = ({ interviewId }) => {
  const { isMaster } = useCheckAuthorization();
  const { deleteInterview } = useEmployerApi();
  const {
    value: isOpenModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);

  const deleteMutation = useMutation({
    mutationFn: () => {
      return deleteInterview(interviewId);
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

  const onClickYes = () => {
    deleteMutation.mutate();
  };

  if (!isMaster) return <></>;

  return (
    <Dialog open={isOpenModal}>
      <Button variant={"ghost"} onClick={openModal}>
        <XSquare size={20} />
      </Button>
      <DialogContent>
        <DialogHeader>
          <Button
            variant={"ghost"}
            onClick={closeModal}
            className="absolute right-4 top-4 !h-fit rounded-sm !p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
          >
            <X className="h-4 w-4" />
          </Button>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
          <div className="flex w-full justify-end gap-4 pt-4">
            <Button
              disabled={deleteMutation.isLoading}
              variant="ghost"
              onClick={closeModal}
            >
              No
            </Button>
            <Button
              disabled={deleteMutation.isLoading}
              onClick={onClickYes}
              variant={"destructive"}
            >
              {deleteMutation.isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Yes
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
