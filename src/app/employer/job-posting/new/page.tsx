"use client";

import { Card } from "@/components/ui/card";
import useCheckAuthorization from "@/hooks/employer/useCheckAuthorization";
import { JobPostingForm } from "./_components";

const DetailPostingJob = () => {
  const { isMaster, isCompany } = useCheckAuthorization();
  if (!isMaster || !isCompany) return <>Not found</>;
  return (
    <Card className="mx-auto max-w-2xl p-6">
      <JobPostingForm />
    </Card>
  );
};

export default DetailPostingJob;
