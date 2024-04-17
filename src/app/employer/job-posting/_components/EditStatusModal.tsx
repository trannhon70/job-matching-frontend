"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/custom-dialog";
import useCheckAuthorization from "@/hooks/employer/useCheckAuthorization";
import { Pencil, X } from "lucide-react";
import { useBoolean } from "usehooks-ts";
import { EditStatusForm } from ".";

interface Props {
  defaultValues: { status: number };
  jobId: string;
}

export const EditStatusModal: React.FC<Props> = ({ defaultValues, jobId }) => {
  const { isMaster, isCompany } = useCheckAuthorization();
  const {
    value: isOpenModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);
  if (!isMaster || !isCompany) return <></>;
  return (
    <Dialog open={isOpenModal}>
      <Button variant={"ghost"} onClick={openModal}>
        <Pencil size={15} />
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
          <DialogTitle>Change status</DialogTitle>
        </DialogHeader>
        <EditStatusForm
          jobId={jobId}
          defaultValues={defaultValues}
          closeModal={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
};
