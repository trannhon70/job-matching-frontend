"use client";

import { ReviewType } from "@/types/employee/company";
import { create } from "zustand";

type UseCompanyInformationType = {
  reviewsList: ReviewType[];
  setReviewsList: (list: ReviewType[]) => void;
  addReview: (item: ReviewType) => void;
};

const useCompanyInformation = create<UseCompanyInformationType>((set) => ({
  reviewsList: [],
  setReviewsList: (list: ReviewType[]) => set({ reviewsList: list }),
  addReview: (item: ReviewType) =>
    set((state) => {
      return {
        reviewsList: [...state.reviewsList, item],
      };
    }),
}));

export default useCompanyInformation;
