"use client";

import { cn } from "@/lib/utils";
import Select from "react-select";

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const ApplicantStatusSelect: React.FC<Props> = ({
  onChange,
  value,
  className,
}) => {
  const options = [
    { value: "all", label: "All" },
    { value: "interview", label: "Interview" },
    { value: "hired", label: "Hired" },
    { value: "refuse", label: "Refuse" },
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
      placeholder="Select status"
      value={options.find((i) => i.value === value)}
      onChange={onChangeSelect}
      options={options}
    />
  );
};
