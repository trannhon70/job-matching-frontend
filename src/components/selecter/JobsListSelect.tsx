"use client";

import { EmployerQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { useMemo } from "react";
import { useQuery } from "react-query";
import Select from "react-select";

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const JobsListSelect: React.FC<Props> = ({
  onChange,
  value,
  disabled = false,
}) => {
  const { getJobPosting } = useEmployerApi();
  const { isLoading, data } = useQuery({
    queryKey: [EmployerQueryKeys.JOB_POSTING],
    queryFn: () => {
      return getJobPosting();
    },
  });

  const options = useMemo(() => {
    const resOptions =
      data?.data?.data?.map((i: any) => ({
        value: `${i.id}`,
        label: i.jobTitle,
      })) ?? [];
    return resOptions;
  }, [data]);

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
      isDisabled={disabled}
      isLoading={isLoading}
      className="w-full border-gray-300 font-sans text-sm"
      styles={styling}
      placeholder="Select job"
      value={options.find((i: any) => i.value === value)}
      onChange={onChangeSelect}
      options={options}
    />
  );
};
