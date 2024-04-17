"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoriesList } from "@/config";
import { useMemo } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const CategorySelect: React.FC<Props> = ({ onChange, value }) => {
  const options = useMemo(() => categoriesList, []);

  const onChangeSelect = (newValue: any) => {
    onChange(newValue);
  };

  return (
    <Select onValueChange={onChangeSelect} value={value}>
      <SelectTrigger>
        <SelectValue placeholder="Select category" />
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
