import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApplicantState } from "@/hooks/employer/useApplicantState";
import { Search } from "lucide-react";
import { useRef } from "react";

export const SearchBox = () => {
  const { setFilter, filter } = useApplicantState();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilter("jobTitle", inputRef?.current?.value ?? "");
  };
  return (
    <div className="flex w-full justify-end">
      <form
        onSubmit={onSearch}
        className="flex w-full max-w-sm items-center space-x-2"
      >
        <Input
          defaultValue={(filter as any)?.jobTitle ?? ""}
          ref={inputRef}
          type="text"
          placeholder="Search Job title"
        />
        <Button type="submit">
          <Search size={20} />
        </Button>
      </form>
    </div>
  );
};
