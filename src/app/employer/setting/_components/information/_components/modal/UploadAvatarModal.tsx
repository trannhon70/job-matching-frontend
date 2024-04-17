"use client";

import avatar from "@/assets/images/default-avatar-company.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/custom-dialog";
import { CompanyInformationType } from "@/types/employer/setting";
import { X } from "lucide-react";
import Image from "next/image";
import { useBoolean } from "usehooks-ts";
import { LogoForm } from "../form";

interface Props {
  values: CompanyInformationType;
}

export const UploadAvatarModal: React.FC<Props> = ({ values }) => {
  const {
    value: isOpenModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);
  return (
    <Dialog open={isOpenModal}>
      <Image
        src={values?.fileLogo ?? avatar}
        alt="logo"
        width={200}
        height={200}
      />
      <Button className="my-4" onClick={openModal}>
        Change
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
          <DialogTitle>Upload avatar</DialogTitle>
        </DialogHeader>
        <LogoForm
          closeModal={closeModal}
          defaultImage={values?.fileLogo ?? avatar}
        />
      </DialogContent>
    </Dialog>
  );
};
