"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/custom-dialog";
import useCheckAuthorization from "@/hooks/employer/useCheckAuthorization";
import { InterviewItemType } from "@/types/employer/interview";
import { Pencil, Plus, X } from "lucide-react";
import { useBoolean } from "usehooks-ts";
import { InterviewRegisterForm } from ".";

interface Props {
  type?: "edit" | "default";
  jobId?: number;
  userId?: number;
  editValues?: InterviewItemType;
}

export const InterviewRegisterModal: React.FC<Props> = ({
  jobId,
  userId,
  type = "default",
  editValues,
}) => {
  const { isMaster } = useCheckAuthorization();
  const {
    value: isOpenModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);
  if (!isMaster) return <></>;
  return (
    <Dialog open={isOpenModal}>
      <Button
        onClick={openModal}
        variant={type === "edit" ? "ghost" : "default"}
      >
        {type === "edit" ? (
          <Pencil size={20} />
        ) : (
          <>
            <Plus className="mr-2" /> Register
          </>
        )}
      </Button>
      <DialogContent>
        <Button
          variant={"ghost"}
          onClick={closeModal}
          className="absolute right-4 top-4 !h-fit rounded-sm !p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
        >
          <X className="h-4 w-4" />
        </Button>
        <DialogHeader>
          <DialogTitle>Interview Register</DialogTitle>
        </DialogHeader>
        <InterviewRegisterForm
          editValues={editValues}
          jobId={jobId}
          userId={userId}
          closeModal={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
};
