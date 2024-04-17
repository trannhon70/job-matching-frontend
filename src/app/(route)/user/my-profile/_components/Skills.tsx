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
import { UserTechnical } from "@/types/employee/user";
import { Plus, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useBoolean } from "usehooks-ts";
import { SkillForm } from "./forms";
import { SkillsList } from "./list";

interface Props {
  isEditable?: boolean;
  propsData?: any;
}

export const Skills: React.FC<Props> = ({ isEditable = true, propsData }) => {
  const { getUserProfileSkills } = useEmployeeApi();
  const session = useSession();
  const isAuthenticated = session.data?.user.data.token;
  const { data } = useQuery({
    queryKey: [EmployeeQueryKeys.USER_PROFILE_SKILL],
    queryFn: () => {
      return getUserProfileSkills();
    },
    enabled: !!isAuthenticated && !!!propsData,
  });

  const res = useMemo(
    () => data?.data?.data?.userTechnical,
    [data],
  ) as UserTechnical[];
  const {
    value: isOpenModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);
  const [selectedItem, setSelectedItem] = useState<UserTechnical | null>(null);

  const actionEdit = (item: UserTechnical) => {
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
        <CardTitle className="text-lg">Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <SkillsList
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
                <DialogTitle className="mb-4">Skills</DialogTitle>
              </DialogHeader>
              <div className="max-h-[80vh] overflow-y-auto">
                <SkillForm
                  actionCloseModal={actionCloseModal}
                  editValues={selectedItem}
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};
