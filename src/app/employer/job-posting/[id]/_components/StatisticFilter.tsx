"use client";

import { StatisticTypeSelect } from "@/components/selecter";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { StatisticFilterType } from ".";

interface Props {
  onSetFilter: (key: string, value: any) => void;
  filter: StatisticFilterType;
}

export const StatisticFilter: React.FC<Props> = ({ filter, onSetFilter }) => {
  const { end, start, type } = filter;
  return (
    <div className="flex gap-4">
      <div>
        <span className="mr-2">Start date:</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !start && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {start ? format(start, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={start}
              onSelect={(e) => {
                onSetFilter("start", e);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <span className="mr-2">End date:</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !end && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {end ? format(end, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={end}
              onSelect={(e) => {
                onSetFilter("end", e);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center">
        <span className="mr-2">Type:</span>
        <StatisticTypeSelect
          value={type}
          onChange={(value) => {
            onSetFilter("type", value);
          }}
          className="w-[200px]"
        />
      </div>
    </div>
  );
};
