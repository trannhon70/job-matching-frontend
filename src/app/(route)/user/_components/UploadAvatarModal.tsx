"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/custom-dialog";
import { Camera, X } from "lucide-react";
import { useBoolean } from "usehooks-ts";
import { UploadAvatarForm } from ".";

export const UploadAvatarModal = () => {
  const {
    value: isOpenModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);
  return (
    <Dialog open={isOpenModal}>
      <button
        className="invisible absolute bottom-0 left-0 flex h-1/3 w-full items-center justify-center bg-gray-800 group-hover:visible"
        onClick={openModal}
      >
        <Camera color="#fff" size={40} />
      </button>
      <DialogContent>
        <DialogHeader>
          <Button
            variant={"ghost"}
            onClick={closeModal}
            className="absolute right-4 top-4 !h-fit rounded-sm !p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
          >
            <X className="h-4 w-4" />
          </Button>
          <DialogTitle>Upload avatar</DialogTitle>
        </DialogHeader>
        <UploadAvatarForm closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
};
