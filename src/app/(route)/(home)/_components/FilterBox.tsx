"use client";

import { CountrySelect } from "@/components/selecter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useQueryString from "@/hooks/common/useQueryString";
import { XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useLocalStorage } from "usehooks-ts";

export interface JobsFilterType {
  keyword: string;
  country: string;
}

export const FilterBox = () => {
  const keywordRef = useRef<HTMLInputElement | null>(null);
  const { goToRouterQueryString } = useQueryString();
  const searchParams = useSearchParams();
  const salaryQuery = searchParams.get("salary");
  const positionQuery = searchParams.get("position");
  const [jobsFilter, setJobsFilter] = useLocalStorage<JobsFilterType>(
    "jobsFilter",
    { keyword: "", country: "" },
  );

  const onChangeCountrySelect = (countryId: string) => {
    setJobsFilter({ ...jobsFilter, country: countryId });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  const onSearch = () => {
    const keyword = keywordRef.current?.value ?? "";
    setJobsFilter({ ...jobsFilter, keyword });
  };

  const deleteHashtagItem = (hashtag: string) => {
    goToRouterQueryString("/job", hashtag, "");
  };

  return (
    <>
      <div className="flex flex-col justify-center gap-4 md:flex-row">
        <CountrySelect
          isFilter
          onChange={onChangeCountrySelect}
          value={jobsFilter.country}
        />
        <form
          onSubmit={onSubmit}
          className="flex w-[500px] min-w-[500px] gap-4"
        >
          <Input
            ref={keywordRef}
            placeholder="Keyword"
            defaultValue={jobsFilter.keyword}
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
      {(salaryQuery || positionQuery) && (
        <div className="mt-4">
          <span className="mr-4 italic text-gray-600">Hashtag</span>
          {salaryQuery && (
            <Badge>
              {salaryQuery}
              <XCircle
                className="ml-2 cursor-pointer"
                onClick={() => {
                  deleteHashtagItem("salary");
                }}
                size={16}
              />
            </Badge>
          )}
          {positionQuery && (
            <Badge className="ml-2">
              {positionQuery}
              <XCircle
                className="ml-2 cursor-pointer"
                onClick={() => {
                  deleteHashtagItem("position");
                }}
                size={16}
              />
            </Badge>
          )}
        </div>
      )}
    </>
  );
};
