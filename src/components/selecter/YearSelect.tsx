"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo } from "react";

interface YearSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

export const YearSelect: React.FC<YearSelectProps> = ({ onChange, value }) => {
  const options = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 10;
    const yearList = [];
    for (let year = 1980; year <= endYear; year++) {
      const yearObject = {
        label: year.toString(),
        value: year.toString(),
      };
      yearList.push(yearObject);
    }
    return yearList;
  }, []);

  const onChangeSelect = (newValue: any) => {
    onChange(newValue);
  };

  return (
    <Select onValueChange={onChangeSelect} value={value}>
      <SelectTrigger>
        <SelectValue placeholder="Select year" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((i) => (
            <SelectItem key={i.value} value={i.value}>
              {i.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
