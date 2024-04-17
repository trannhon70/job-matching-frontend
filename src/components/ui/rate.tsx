"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface RateProps {
  onChange?: (value: number) => void;
  readonly?: boolean;
  value?: number;
}

export const Rate: React.FC<RateProps> = ({
  onChange,
  readonly = false,
  value = 0,
}) => {
  const [quantitySelected, setQuantitySelected] = React.useState(value);
  const OnChangeRate = (index: number) => {
    if (readonly) {
      return;
    }
    setQuantitySelected(index);
    onChange && onChange(index);
  };

  React.useEffect(() => {
    setQuantitySelected(value);
  }, [value]);

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        readonly ? "cursor-default" : "cursor-pointer",
      )}
    >
      {[...new Array(5)].map((item, index) => (
        <React.Fragment key={item}>
          {index < quantitySelected ? (
            <svg
              key={item}
              onClick={() => {
                OnChangeRate(index + 1);
              }}
              className="h-6 w-6 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ) : (
            <svg
              onClick={() => {
                OnChangeRate(index + 1);
              }}
              className="h-6 w-6 text-gray-300 dark:text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
