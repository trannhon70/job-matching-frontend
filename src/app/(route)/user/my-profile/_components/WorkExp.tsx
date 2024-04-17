"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/custom-dialog";
import { EmployeeQueryKeys } from "@/enums";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import { Experience } from "@/types/employee/user";
import { Plus, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useBoolean } from "usehooks-ts";
import { WorkExpForm } from "./forms";
import { WorkExpList } from "./list";

interface Props {
  isEditable?: boolean;
  propsData?: any;
}

export const WorkExp: React.FC<Props> = ({ isEditable = true, propsData }) => {
  const { getUserProfileExp } = useEmployeeApi();
  const session = useSession();
  const isAuthenticated = session.data?.user.data.token;
  const { data } = useQuery({
    queryKey: [EmployeeQueryKeys.USER_PROFILE_EXP],
    queryFn: () => {
      return getUserProfileExp();
    },
    enabled: !!isAuthenticated && !!!propsData,
  });

  const res = useMemo(
    () => data?.data?.data?.experience,
    [data],
  ) as Experience[];
  const {
    value: isOpenModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);
  const [selectedItem, setSelectedItem] = useState<Experience | null>(null);
  const actionEdit = (item: Experience) => {
    setSelectedItem(item);
    openModal();
  };

  const actionCloseModal = () => {
    closeModal();
    setSelectedItem(null);
  };
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Work Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <WorkExpList
          isEditable={isEditable}
          data={propsData ?? res}
          actionEdit={actionEdit}
        />
        {isEditable && (
          <Dialog open={isOpenModal}>
            <Button onClick={openModal} className="flex items-center gap-2">
              <span>Add</span> <Plus size={16} />
            </Button>
            <DialogContent className="max-w-3xl">
              <Button
                variant={"ghost"}
                onClick={actionCloseModal}
                className="absolute right-4 top-4 !h-fit rounded-sm !p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
              >
                <X className="h-4 w-4" />
              </Button>
              <DialogHeader>
                <DialogTitle className="mb-4">Work Experience</DialogTitle>
              </DialogHeader>
              <div className="max-h-[80vh] w-full overflow-y-auto">
                <WorkExpForm
                  editValues={selectedItem}
                  actionCloseModal={actionCloseModal}
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};
