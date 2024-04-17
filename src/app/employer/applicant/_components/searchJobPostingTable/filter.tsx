import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSearchJobPostingState from "@/hooks/employer/useSearchJobPostingState";
import { Search } from "lucide-react";
import { useRef } from "react";

export const Filter = () => {
  const { setFilter, filter } = useSearchJobPostingState();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilter("keyword", inputRef?.current?.value ?? "");
  };
  return (
    <div className="flex w-full justify-end">
      <form
        onSubmit={onSearch}
        className="flex w-full max-w-sm items-center space-x-2"
      >
        <Input
          defaultValue={(filter as any)?.keyword ?? ""}
          ref={inputRef}
          type="text"
          placeholder="Search by job title"
        />
        <Button type="submit">
          <Search size={20} />
        </Button>
      </form>
    </div>
  );
};
