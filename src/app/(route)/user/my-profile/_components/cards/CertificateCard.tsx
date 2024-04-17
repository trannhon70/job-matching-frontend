"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EmployeeQueryKeys } from "@/enums";
import { Certificate } from "@/types/employee/user";
import { EyeIcon, Pencil, ShieldCheck } from "lucide-react";
import { DeleteModal } from ".";

interface CertificateCardProps {
  isEditable?: boolean;
  data: Certificate;
  actionEdit: (item: Certificate) => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  isEditable,
  data,
  actionEdit,
}) => {
  const onClickEdit = () => {
    actionEdit(data);
  };

  return (
    <div className="flex w-full items-start gap-5 py-4">
      <Avatar className="rounded-md">
        <AvatarFallback>
          <ShieldCheck />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 flex-col items-start gap-5 md:flex-row">
        <div className="flex flex-1 flex-col gap-1.5">
          <h3 className="font-medium">{data?.nameFile}</h3>
          <p className="text-sm text-gray-600">
            {data?.monthStartCer}/{data?.yearStartCer}
            {data?.monthEndCer && data?.yearEndCer && (
              <>
                {" "}
                - {data?.monthEndCer}/{data?.yearEndCer}
              </>
            )}
          </p>
        </div>
        {isEditable ? (
          <div>
            <Button variant={"ghost"} onClick={onClickEdit}>
              <Pencil size={20} />
            </Button>
            <DeleteModal
              id={data?.id}
              type="certificate"
              queryKey={EmployeeQueryKeys.USER_PROFILE_CERTIFICATE}
            />
          </div>
        ) : (
          <Button variant={"ghost"} onClick={onClickEdit} asChild>
            <a target="_blank" href={data.file} rel="noopener noreferrer">
              <EyeIcon size={20} />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};
