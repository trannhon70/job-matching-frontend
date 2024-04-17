"use client";

import { PaginationType } from "@/components/ui/pagination";
import { create } from "zustand";

type InterviewStateType = PaginationType & {
  filter: object;
  selectedIds: number[];
  status: boolean;
  setStatus: (status: boolean) => void;
  setFilter: (key: string, value: string) => void;
  setSelectedIds: (ids: number[]) => void;
};

const useInterviewState = create<InterviewStateType>((set) => ({
  currentPage: 1,
  totalPage: 1,
  limit: 10,
  status: false,
  filter: {},
  selectedIds: [],
  isDisableNext: false,
  isDisablePrevious: false,
  setStatus: (status: boolean) => {
    return set({ status });
  },
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

export default useInterviewState;
