"use client";

import Select from "react-select";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const PeriodSelect: React.FC<Props> = ({ onChange, value }) => {
  const options = [
    {
      value: "AM",
      label: "AM",
    },
    {
      value: "PM",
      label: "PM",
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
