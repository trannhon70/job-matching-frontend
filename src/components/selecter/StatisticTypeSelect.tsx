"use client";

import { cn } from "@/lib/utils";
import Select from "react-select";

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const StatisticTypeSelect: React.FC<Props> = ({
  onChange,
  value,
  className,
}) => {
  const options = [
    { value: "day", label: "Date" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
  ];

  const onChangeSelect = (newValue: any) => {
    onChange(newValue.value);
  };

  const styling = {
    control: (styles: any) => ({
      ...styles,
      fontFamily: "var(--font-sans)",
      borderColor: "hsl(222.2 84% 4.9%)/10",
      borderRadius: "none !important",
    }),
  };

  return (
    <Select
      className={cn("border-gray-300 font-sans text-sm", className)}
      styles={styling}
      placeholder="Select type"
      value={options.find((i) => i.value === value)}
      onChange={onChangeSelect}
      options={options}
    />
  );
};
