"use client";

import { timezoneOptions } from "@/config";
import { useMemo } from "react";
import Select from "react-select";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const TimeZoneSelect: React.FC<Props> = ({ onChange, value }) => {
  const options = useMemo(() => timezoneOptions, []);

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
      className="border-gray-300 font-sans text-sm"
      styles={styling}
      placeholder="Select timezone"
      value={options.find((i) => i.value === value)}
      onChange={onChangeSelect}
      options={options}
    />
  );
};
