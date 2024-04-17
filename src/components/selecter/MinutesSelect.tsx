"use client";

import { useMemo } from "react";
import Select from "react-select";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const MinutesSelect: React.FC<Props> = ({ onChange, value }) => {
  const options = useMemo(() => {
    const options = [];

    for (let i = 0; i < 60; i++) {
      const minute = i < 10 ? `0${i}` : `${i}`;

      options.push({
        value: minute,
        label: minute,
      });
    }

    return options;
  }, []);

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
