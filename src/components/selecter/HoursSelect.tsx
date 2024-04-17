"use client";

import Select from "react-select";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const HoursSelect: React.FC<Props> = ({ onChange, value }) => {
  const options = [
    {
      value: "01",
      label: "01",
    },
    {
      value: "02",
      label: "02",
    },
    {
      value: "03",
      label: "03",
    },
    {
      value: "04",
      label: "04",
    },
    {
      value: "05",
      label: "05",
    },
    {
      value: "06",
      label: "06",
    },
    {
      value: "07",
      label: "07",
    },
    {
      value: "08",
      label: "08",
    },
    {
      value: "09",
      label: "09",
    },
    {
      value: "10",
      label: "10",
    },
    {
      value: "11",
      label: "11",
    },
    {
      value: "12",
      label: "12",
    },
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
      className="border-gray-300 font-sans text-sm"
      styles={styling}
      value={options.find((i) => i.value === value)}
      onChange={onChangeSelect}
      options={options}
    />
  );
};
