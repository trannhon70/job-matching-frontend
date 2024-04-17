"use client";

import { UserProfile } from "@/types/employee/user";
import { create } from "zustand";

type UseUserProfileType = {
  data: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
};

const useUserProfile = create<UseUserProfileType>((set) => ({
  data: null,
  setUserProfile: (profile: UserProfile) => set({ data: profile }),
}));

export default useUserProfile;
