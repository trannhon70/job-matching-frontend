"use client";

import { PaginationType } from "@/components/ui/pagination";
import { create } from "zustand";

type JobPostingStateType = PaginationType & {
  filter: object;
  setFilter: (key: string, value: string) => void;
};

const useSearchJobPostingState = create<JobPostingStateType>((set) => ({
  currentPage: 1,
  totalPage: 1,
  limit: 8,
  filter: {},
  isDisableNext: false,
  isDisablePrevious: false,
  setCurrentPage: (page: number) => {
    return set({ currentPage: page });
  },
  setFilter: (key: string, value: string) =>
    set((state) => ({ filter: { ...state.filter, [key]: value } })),
  setTotalPage: (page: number) => set({ totalPage: page }),
  calculatePage: (totalItems: number) =>
    set((state) => ({
      totalPage: Math.ceil(totalItems / (state.limit ?? 1)),
    })),
  goToNextPage: () =>
    set((state) => {
      const nextPage = state.currentPage + 1;
      const isDisableNext = nextPage > state.totalPage;
      return {
        currentPage: isDisableNext ? state.currentPage : nextPage,
        isDisableNext: state.currentPage + 1 === state.totalPage,
        isDisablePrevious: false,
      };
    }),
  goToPreviousPage: () =>
    set((state) => {
      const previousPage = state.currentPage - 1;
      const isDisablePrevious = previousPage <= 0;
      return {
        currentPage: isDisablePrevious ? state.currentPage : previousPage,
        isDisablePrevious: state.currentPage - 1 === 1,
        isDisableNext: false,
      };
    }),
}));

export default useSearchJobPostingState;
