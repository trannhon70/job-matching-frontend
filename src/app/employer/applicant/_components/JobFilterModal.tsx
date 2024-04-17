"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/custom-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { JobPostingStatus } from "@/enums/employer";
import { useApplicantState } from "@/hooks/employer/useApplicantState";
import useSearchJobPostingState from "@/hooks/employer/useSearchJobPostingState";
import { X } from "lucide-react";
import { useState } from "react";
import { useBoolean } from "usehooks-ts";
import { SearchJobPostingTable } from "./searchJobPostingTable";

export const JobFilterModal = () => {
  const { selectedIds } = useApplicantState();
  const [labelStatus, setLabelStatus] = useState("On Going Job");
  const {
    value: isOpenModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);
  const { setFilter } = useSearchJobPostingState();

  return (
    <Dialog open={isOpenModal}>
      <Button
        variant={"secondary"}
        onClick={() => {
          setFilter("status", JobPostingStatus["On_Going"].toString());
          setLabelStatus("On Going Jobs");
          openModal();
        }}
      >
        Ongoing Jobs{" "}
        <Badge className="mx-1">{selectedIds.On_Going.length}</Badge>
      </Button>
      <Button
        variant={"secondary"}
        onClick={() => {
          setFilter("status", JobPostingStatus["Suspended"].toString());
          openModal();
          setLabelStatus("Suspended Jobs");
        }}
      >
        Suspended Jobs
        <Badge className="mx-1">{selectedIds.Suspended.length}</Badge>
      </Button>
      <DialogContent className="max-w-4xl">
        <Button
          variant={"ghost"}
          onClick={closeModal}
          className="absolute right-4 top-4 !h-fit rounded-sm !p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
        >
          <X className="h-4 w-4" />
        </Button>
        <DialogHeader>
          <DialogTitle>Search for {labelStatus}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80vh]">
          <SearchJobPostingTable closeModal={closeModal} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
