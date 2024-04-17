"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/custom-dialog";
import { UserProfile } from "@/types/employee/user";
import { File, Pencil, X } from "lucide-react";
import { useBoolean } from "usehooks-ts";
import { UploadResumeForm } from "./forms";

interface Props {
  data: UserProfile;
  isEditable?: boolean;
}

export const Resume: React.FC<Props> = ({ data, isEditable = true }) => {
  const {
    value: isOpenModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Resume</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex w-full items-start gap-5 pb-4">
            <div className="flex flex-1 flex-col items-start gap-5 md:flex-row">
              <div className="flex flex-1 flex-col gap-1.5">
                {data?.resume && (
                  <Button className="w-fit" asChild variant={"outline"}>
                    <a
                      target="_blank"
                      className="flex items-center gap-2"
                      href={data?.resume}
                    >
                      <File />
                      Resume File
                    </a>
                  </Button>
                )}
              </div>
              <div>{/* <DeleteModal /> */}</div>
            </div>
          </div>
        </div>
        {isEditable && (
          <Dialog open={isOpenModal}>
            <Button onClick={openModal} className="flex items-center gap-3">
              <span>Edit</span> <Pencil size={16} />
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
                <DialogTitle className="mb-4">Upload resume</DialogTitle>
              </DialogHeader>
              <div className="max-h-[80vh] overflow-y-auto">
                <UploadResumeForm closeModal={closeModal} />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};
