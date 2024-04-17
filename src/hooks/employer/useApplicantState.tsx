"use client";

import { PaginationType } from "@/components/ui/pagination";
import { create } from "zustand";

export type ApplicantStatusType = "all" | "interview" | "hired" | "refuse";

type ApplicantStateType = PaginationType & {
  selectedIds: {
    On_Going: number[];
    Suspended: number[];
  };
  filter: object;
  setFilter: (key: string, value: string) => void;
  setSelectedIds: (key: "On_Going" | "Suspended", ids: number[]) => void;
};

export const useApplicantState = create<ApplicantStateType>((set) => ({
  currentPage: 1,
  totalPage: 1,
  limit: 10,
  selectedIds: {
    On_Going: [],
    Suspended: [],
  },
  filter: {},
  isDisableNext: false,
  isDisablePrevious: false,
  setFilter: (key: string, value: string) => set({ filter: { [key]: value } }),
  setSelectedIds: (key: "On_Going" | "Suspended", ids: number[]) => {
    return set((state) => ({
      selectedIds: { ...state.selectedIds, [key]: ids },
    }));
  },
  setCurrentPage: (page: number) => {
    return set({ currentPage: page });
  },
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
