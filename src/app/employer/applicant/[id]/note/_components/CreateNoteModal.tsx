"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/custom-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";
import { useBoolean } from "usehooks-ts";
import { NewNoteForm } from ".";

interface Props {
  applicantId: string;
}

export const CreateNoteModal: React.FC<Props> = ({ applicantId }) => {
  const {
    value: isOpenModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);
  return (
    <Dialog open={isOpenModal}>
      <Button className="w-fit" onClick={openModal}>
        <Plus className="mr-2" /> New note
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
          <DialogTitle>New note</DialogTitle>
        </DialogHeader>
        <NewNoteForm applicantId={applicantId} closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
};
