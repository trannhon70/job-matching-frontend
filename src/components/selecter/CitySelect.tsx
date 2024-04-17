"use client";

import { SelectKeys } from "@/enums";
import { getCity } from "@/services/apis/select";
import { useMemo } from "react";
import { useQuery } from "react-query";
import Select from "react-select";

interface Props {
  value: string;
  onChange: (value: string) => void;
  countryId: string;
}

export const CitySelect: React.FC<Props> = ({ onChange, value, countryId }) => {
  const { isLoading, data } = useQuery({
    queryKey: [SelectKeys.CITY, countryId],
    queryFn: () => {
      return getCity({ countryId });
    },
    enabled: !!countryId,
  });

  const options =
    useMemo(
      () =>
        data?.data?.data?.map((i: any) => ({
          value: `${i.id}`,
          label: i.provinceName,
        })),
      [data],
    ) ?? [];

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
      placeholder="Select city"
      value={
        options.find((i: any) => i.value === value) ?? { value: "", label: "" }
      }
      onChange={onChangeSelect}
      options={options}
    />
  );
};
