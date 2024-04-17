"use client";

import { useSession } from "next-auth/react";

const useCheckAuthorization = () => {
  const session = useSession();
  const hasInitialize = !!session.data?.user.data;
  const isMaster = !!session.data?.user.data.infoUser.level.find(
    (i) => i.levelName === "Master",
  );
  const isActive = session.data?.user.data.infoUser.isActive;
  const isCompany = session.data?.user.data.infoUser.isCompany;
  const isFirstMaster = session.data?.user.data.infoUser.isOne;
  return { isMaster, isActive, isCompany, hasInitialize, isFirstMaster };
};

export default useCheckAuthorization;
