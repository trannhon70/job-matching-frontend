"use client";

import { create } from "zustand";

type UseListApplySaveType = {
  applyList: number[];
  saveList: number[];
  setApplyList: (value: number[]) => void;
  setSaveList: (value: number[]) => void;
};

const useListApplySave = create<UseListApplySaveType>((set) => ({
  applyList: [],
  saveList: [],
  setApplyList: (value: number[]) => set({ applyList: value }),
  setSaveList: (value: number[]) => set({ saveList: value }),
}));

export default useListApplySave;
