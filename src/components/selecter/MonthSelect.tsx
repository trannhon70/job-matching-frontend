"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { monthsArray } from "@/config";
import { useMemo } from "react";

interface MonthSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

export const MonthSelect: React.FC<MonthSelectProps> = ({
  onChange,
  value,
}) => {
  const options = useMemo(() => monthsArray, []);

  const onChangeSelect = (newValue: any) => {
    onChange(newValue);
  };

  return (
    <Select onValueChange={onChangeSelect} value={value}>
      <SelectTrigger>
        <SelectValue placeholder="Select a month" />
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
