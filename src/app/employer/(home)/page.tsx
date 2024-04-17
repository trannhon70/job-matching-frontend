"use client";

import { Card } from "@/components/ui/card";
import useCheckAuthorization from "@/hooks/employer/useCheckAuthorization";
import { MasterApprovalRequestForm } from "./_components";

const VerifyPage = () => {
  const { isActive } = useCheckAuthorization();
  if (isActive === false)
    return (
      <Card className="mx-auto w-[30rem] p-6">
        <MasterApprovalRequestForm />
      </Card>
    );
  return <></>;
};

export default VerifyPage;
