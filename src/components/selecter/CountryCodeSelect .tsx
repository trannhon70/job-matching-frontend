"use client";

import { countryPhoneList } from "@/config";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMemo } from "react";
import Select from "react-select";

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const CountryCodeSelect: React.FC<CountryCodeSelectProps> = ({
  onChange,
  value,
  className,
}) => {
  const options = useMemo(() => countryPhoneList, []);

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
      placeholder="Select country code"
      value={options.find((i) => i.value === value)}
      onChange={onChangeSelect}
      options={options}
      formatOptionLabel={(item) => {
        return (
          <div className="flex gap-4">
            <Image src={item.icon} alt="flag" width={20} height={20} />
            {item.label}
          </div>
        );
      }}
    />
  );
};
