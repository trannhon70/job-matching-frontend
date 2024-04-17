"use client";

import { EmployerQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

import { format, parseISO } from "date-fns";
import { useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { StatisticFilter } from ".";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart",
    },
  },
};

interface Props {
  jobId: number;
}

export type StatisticFilterType = {
  start: Date;
  end: Date;
  type: string;
};

export const StatisticChart: React.FC<Props> = ({ jobId }) => {
  const [filter, setFilter] = useState<StatisticFilterType>({
    end: new Date(),
    start: new Date(),
    type: "month",
  });

  const onSetFilter = (key: string, value: any) => {
    setFilter({ ...filter, [key]: value });
  };

  const { getStatisticDetailJob } = useEmployerApi();
  const { isLoading, data } = useQuery({
    queryKey: [`${EmployerQueryKeys.STATISTIC_JOB_POSTING}_${jobId}`, filter],
    queryFn: () => {
      return getStatisticDetailJob({
        idJob: jobId,
        start: format(filter.start, "yyyy-MM-dd"),
        end: format(filter.end, "yyyy-MM-dd"),
        type: filter.type,
      });
    },
    enabled: !!jobId,
  });

  const chartData = useMemo(() => {
    const res = data?.data?.data ?? [];
    const labels = res.map((i: any) => {
      if (filter.type === "month") {
        return `${i.year}/${i.month}`;
      }
      if (filter.type === "week") {
        return `${format(parseISO(`${i.start}`), "yyyy/MM/dd")} - ${format(
          parseISO(`${i.end}`),
          "yyyy/MM/dd",
        )}`;
      }
      if (filter.type === "day") {
        return `${i.year}/${i.month}/${i.day}`;
      }
      return i.year;
    });
    return {
      labels,
      datasets: [
        {
          label: "Clicks",
          data: res.map((i: any) => i.click),
          backgroundColor: "#FFE382",
        },
        {
          label: "Save",
          data: res.map((i: any) => i.save),
          backgroundColor: "#597E52",
        },
      ],
    };
  }, [data, filter.type]);

  return (
    <>
      {isLoading ? (
        <ThreeCircles
          visible={true}
          height="20"
          width="20"
          color="#4682a9"
          ariaLabel="three-circles-loading"
        />
      ) : (
        <StatisticFilter onSetFilter={onSetFilter} filter={filter} />
      )}

      <Bar className="max-w-2xl" options={options} data={chartData} />
    </>
  );
};
