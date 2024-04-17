"use client";

import { PaginationType } from "@/components/ui/pagination";
import { create } from "zustand";

type JobPostingStateType = PaginationType & {
  filter: object;
  selectedIds: number[];
  setFilter: (key: string, value: string) => void;
  setSelectedIds: (ids: number[]) => void;
};

export const useJobPostingState = create<JobPostingStateType>((set) => ({
  currentPage: 1,
  totalPage: 1,
  limit: 10,
  filter: {},
  selectedIds: [],
  isDisableNext: false,
  isDisablePrevious: false,
  setSelectedIds: (ids: number[]) => {
    return set({ selectedIds: ids });
  },
  setCurrentPage: (page: number) => {
    return set({ currentPage: page });
  },
  setFilter: (key: string, value: string) => set({ filter: { [key]: value } }),
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
