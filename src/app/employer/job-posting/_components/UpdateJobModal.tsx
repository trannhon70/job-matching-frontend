"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/custom-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import useCheckAuthorization from "@/hooks/employer/useCheckAuthorization";
import { JobPostingType } from "@/types/employer/job-posting";
import { Settings, X } from "lucide-react";
import { useBoolean } from "usehooks-ts";
import { JobPostingForm } from "../new/_components";

interface Props {
  defaultValues: JobPostingType;
}

export const UpdateJobModal: React.FC<Props> = ({ defaultValues }) => {
  const {
    value: isOpenModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);
  const { isMaster, isCompany } = useCheckAuthorization();
  if (!isMaster || !isCompany) return <></>;
  return (
    <Dialog open={isOpenModal}>
      <Button
        variant={"ghost"}
        onClick={openModal}
        className="font-medium text-blue-700 hover:text-blue-700"
      >
        <Settings size={20} />
      </Button>
      <DialogContent className="max-w-3xl">
        <Button
          variant={"ghost"}
          onClick={closeModal}
          className="absolute right-4 top-4 !h-fit rounded-sm !p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
        >
          <X className="h-4 w-4" />
        </Button>
        <DialogHeader>
          <DialogTitle>Update job posting</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <JobPostingForm
            closeModal={closeModal}
            defaultValues={defaultValues}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
