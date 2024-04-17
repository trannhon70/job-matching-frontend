import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/custom-dialog";
import { UserProfile } from "@/types/employee/user";
import { Pencil, X } from "lucide-react";
import { Fragment, useMemo } from "react";
import { useBoolean } from "usehooks-ts";
import { PersonalForm } from "./forms";

interface Props {
  data: UserProfile;
  isEditable?: boolean;
}

export const PersonalInformation: React.FC<Props> = ({
  data,
  isEditable = true,
}) => {
  const {
    value: isOpenModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);
  const detailInformation = useMemo(
    () => [
      {
        title: "First name",
        content: data?.firstName,
      },
      {
        title: "Last name",
        content: data?.lastName,
      },
      {
        title: "Phone number",
        content: data?.phone,
      },
      { title: "Country", content: data?.country?.countryName },
      { title: "City/Town", content: data?.province?.provinceName },
      { title: "Street name", content: data?.streetName },
      {
        title: "Postal code",
        content: data?.postalCode,
      },
    ],
    [data],
  );
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Personal information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-8 grid grid-cols-1 gap-1 gap-x-0 overflow-hidden text-sm md:grid-cols-3 md:gap-x-1 ">
          {detailInformation.map((i) => (
            <Fragment key={i.title}>
              <div className="bg-indigo-50/60 p-2 px-4 font-medium md:text-center">
                {i.title}
              </div>
              <div className="col-span-2 bg-indigo-50/60 p-2 px-4">
                {i.content}
              </div>
            </Fragment>
          ))}
        </div>
        {isEditable && (
          <Dialog open={isOpenModal}>
            <DialogTrigger>
              <Button onClick={openModal} className="flex items-center gap-3">
                <span>Edit</span> <Pencil size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <Button
                variant={"ghost"}
                onClick={closeModal}
                className="absolute right-4 top-4 !h-fit !p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
              >
                <X className="h-4 w-4" />
              </Button>
              <DialogHeader>
                <DialogTitle className="mb-4">Personal information</DialogTitle>
              </DialogHeader>
              <div className="max-h-[80vh] overflow-y-auto">
                <PersonalForm personalData={data} closeModal={closeModal} />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};
