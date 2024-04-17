"use client";

import { EmployerQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { useMemo } from "react";
import { useQuery } from "react-query";
import Select from "react-select";

interface Props {
  value: string;
  disabled?: boolean;
  jobId: number | undefined;
  onChange: (value: string) => void;
}

export const ApplicantSelect: React.FC<Props> = ({
  jobId,
  value,
  disabled = false,
  onChange,
}) => {
  const { getApplicant } = useEmployerApi();
  const { isLoading, data } = useQuery({
    queryKey: [EmployerQueryKeys.APPLICANT, jobId],
    queryFn: () => {
      return getApplicant({ jobId });
    },
    enabled: !!jobId,
  });

  const options = useMemo(() => {
    const resOptions =
      data?.data?.data?.map((i: any) => ({
        value: `${i?.user?.id}`,
        label: `${i?.user?.firstName} ${i?.user?.lastName}`,
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
      placeholder="Select applicant"
      value={
        options.find((i: any) => i.value === value) ?? { value: "", label: "" }
      }
      onChange={onChangeSelect}
      options={options}
    />
  );
};
