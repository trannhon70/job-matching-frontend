"use client";

import { SelectKeys } from "@/enums";
import { getCountry } from "@/services/apis/select";
import { useMemo } from "react";
import { useQuery } from "react-query";
import Select from "react-select";

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  isFilter?: boolean;
  hasAllCountryOption?: boolean;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
  hasAllCountryOption = false,
  value,
  isFilter = false,
  onChange,
}) => {
  const { isLoading, data } = useQuery({
    queryKey: [SelectKeys.COUNTRY],
    queryFn: () => {
      return getCountry();
    },
  });

  const options = useMemo(() => {
    let resOptions =
      data?.data?.map((i) => ({
        value: `${i.id}`,
        label: i.countryName,
      })) ?? [];
    if (!hasAllCountryOption)
      resOptions = resOptions.filter((i) => i.value !== "242");
    if (isFilter) {
      resOptions = [{ value: "", label: "All country" }, ...resOptions];
    }
    return resOptions;
  }, [data, isFilter, hasAllCountryOption]);

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
      isLoading={isLoading}
      className="w-full border-gray-300 font-sans text-sm"
      styles={styling}
      placeholder="Select country"
      value={options.find((i) => i.value === value)}
      onChange={onChangeSelect}
      options={options}
    />
  );
};
