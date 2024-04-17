"use client";

import { SelectKeys } from "@/enums";
import { getMajor } from "@/services/apis/select";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";
import { useDebounce } from "usehooks-ts";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const MajorSelect: React.FC<Props> = ({ onChange, value }) => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce<string>(search, 500);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);
  const { isLoading, data } = useQuery({
    queryKey: [SelectKeys.MAJOR],
    queryFn: () => {
      return getMajor();
    },
  });

  const options =
    useMemo(
      () =>
        data?.data?.data?.map((i: any) => ({
          value: `${i.id}`,
          label: i.majorName,
        })),
      [data],
    ) ?? [];

  const onChangeSelect = (newValue: any) => {
    onChange(newValue.value);
  };

  const customFilter = (option: any, searchText: string) => {
    if (
      option.data.label.toLowerCase().includes(searchText.toLowerCase()) ||
      option.data.value.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return true;
    } else {
      setSearch(searchText);
      return false;
    }
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
      filterOption={customFilter}
      isLoading={isLoading}
      className="w-full border-gray-300 font-sans text-sm"
      styles={styling}
      placeholder="Select major"
      value={
        options.find((i: any) => i.value === value) ?? {
          value: value,
          label: value,
        }
      }
      onChange={onChangeSelect}
      options={options}
    />
  );
};
