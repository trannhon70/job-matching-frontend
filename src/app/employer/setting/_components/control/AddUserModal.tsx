"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/custom-dialog";
import useCheckAuthorization from "@/hooks/employer/useCheckAuthorization";
import { Plus, X } from "lucide-react";
import { useBoolean } from "usehooks-ts";
import { AddUserForm } from ".";

export const AddUserModal = () => {
  const { isCompany } = useCheckAuthorization();
  const {
    value: isOpenModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);
  if (!isCompany) return <></>;
  return (
    <Dialog open={isOpenModal}>
      <Button onClick={openModal}>
        <Plus className="mr-2" /> Add user
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
          <DialogTitle>Add user</DialogTitle>
        </DialogHeader>
        <AddUserForm closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
};
