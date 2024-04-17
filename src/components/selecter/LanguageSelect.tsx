"use client";

import { SelectKeys } from "@/enums";
import { getLanguage } from "@/services/apis/select";
import { useMemo } from "react";
import { useQuery } from "react-query";
import Select from "react-select";

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const LanguageSelect: React.FC<LanguageSelectProps> = ({
  onChange,
  value,
}) => {
  const { isLoading, data } = useQuery({
    queryKey: [SelectKeys.LANGUAGE],
    queryFn: () => {
      return getLanguage();
    },
  });

  const options =
    useMemo(
      () =>
        data?.data?.data?.map((i: any) => ({
          value: `${i.id}`,
          label: i.language,
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
      className="border-gray-300 font-sans text-sm"
      styles={styling}
      placeholder="Select language"
      value={options.find((i: any) => i.value === value)}
      onChange={onChangeSelect}
      options={options}
    />
  );
};
