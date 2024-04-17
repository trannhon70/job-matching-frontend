"use client";

import { useSession } from "next-auth/react";
import { AccountForm } from ".";

export const AccountTab = async () => {
  const session = useSession();
  return (
    <div className="mx-auto max-w-lg border p-4">
      <AccountForm defaultValue={session?.data?.user.data.infoUser} />
    </div>
  );
};
