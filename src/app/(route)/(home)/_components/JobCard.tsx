import avatar from "@/assets/images/default-avatar-company.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useQueryString from "@/hooks/common/useQueryString";
import useJobList from "@/hooks/employee/useJobList";
import { JobType } from "@/types/employee/job";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: JobType;
}

export const JobCard: React.FC<Props> = ({ data }) => {
  const {
    salary,
    summary,
    company,
    jobTitle,
    position,
    positionName,
    slug,
    currency,
    periodEnd,
    periodStart,
  } = data ?? {};
  const { goToRouterQueryString } = useQueryString();
  const { setCurrentPage } = useJobList();
  return (
    <Card>
      <CardHeader>
        <div className="mb-4 flex items-center gap-6">
          <div className="relative h-12 w-12 min-w-[3rem]">
            <Image
              src={company.fileLogo ?? avatar}
              alt="logo"
              fill
              className="object-cover"
            />
          </div>
          <CardTitle className="truncate text-center text-lg">
            <Link
              href={`/job/${slug}`}
              className="truncate text-center text-lg"
            >
              {jobTitle}
            </Link>
          </CardTitle>
        </div>
        <CardDescription className="truncate">{summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="no-scrollbar flex w-full gap-2 overflow-x-hidden">
          <Badge
            onClick={() => {
              goToRouterQueryString("/job", "salary", `${salary}${currency}`);
              setCurrentPage(1);
            }}
            className="cursor-pointer whitespace-nowrap"
          >
            {salary} {currency}
          </Badge>
          <Badge
            onClick={() => {
              goToRouterQueryString(
                "/job",
                "position",
                `${positionName ?? position.positionName}`,
              );
              setCurrentPage(1);
            }}
            className="cursor-pointer whitespace-nowrap"
          >
            {positionName ?? position.positionName}
          </Badge>
        </div>
        <p className="mt-4 truncate text-base font-medium text-gray-700">
          {format(parseISO(`${periodStart}`), "LLL dd, y")}
          {" - "}
          {format(parseISO(`${periodEnd}`), "LLL dd, y")}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant={"link"} asChild>
          <Link
            href={`/job/${slug}`}
            className="ml-auto text-lg font-medium text-indigo-800"
          >
            More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
