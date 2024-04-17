"use client";

import Select from "react-select";

interface LevelSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const LevelSelect: React.FC<LevelSelectProps> = ({
  onChange,
  value,
}) => {
  const options = [
    { value: "1", label: "INTERMEDIATE" },
    { value: "2", label: "COLLEGE" },
    { value: "3", label: "UNIVERSITY" },
    { value: "4", label: "POSTGRADUATE" },
    { value: "5", label: "MASTER" },
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
      placeholder="Select level"
      value={options.find((i) => i.value === value)}
      onChange={onChangeSelect}
      options={options}
    />
  );
};
