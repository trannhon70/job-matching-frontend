"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCheckAuthorization from "@/hooks/employer/useCheckAuthorization";
import { useJobPostingState } from "@/hooks/employer/useJobPostingState";
import { Search } from "lucide-react";
import { useRef } from "react";
import { UpdateStatusAction } from ".";

export const Filter = () => {
  const { isMaster, isCompany } = useCheckAuthorization();
  const { setFilter } = useJobPostingState();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilter("keyword", inputRef?.current?.value ?? "");
  };
  return (
    <div className="flex w-full justify-between py-2 pt-4">
      <div className="mb-4 w-full ">
        {isMaster && isCompany && <UpdateStatusAction />}
      </div>
      <form
        onSubmit={onSearch}
        className="flex w-full max-w-sm items-center space-x-2"
      >
        <Input ref={inputRef} type="text" placeholder="Search by job title" />
        <Button type="submit">
          <Search size={20} />
        </Button>
      </form>
    </div>
  );
};
