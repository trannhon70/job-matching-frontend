"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import useCheckAuthorization from "@/hooks/employer/useCheckAuthorization";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  MessageSquareMore,
  MessagesSquare,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const Sidebar = () => {
  const { isMaster, isActive, hasInitialize } = useCheckAuthorization();
  const pathname = usePathname();
  const menu = useMemo(
    () => [
      {
        title: "Job posting",
        level: "all",
        href: "/employer/job-posting",
        icon: <Briefcase size={20} />,
      },
      {
        title: "Applicant",
        level: "all",
        href: "/employer/applicant",
        icon: <Users size={20} />,
      },
      {
        title: "Interview",
        level: "all",
        href: "/employer/interview",
        icon: <MessagesSquare size={20} />,
      },
      {
        title: "Chats",
        level: "all",
        href: "/employer/chats",
        icon: <MessageSquareMore size={20} />,
      },
      // {
      //   title: "Statistic",
      //   href: "/employer/statistic",
      //   icon: <BarChartBig size={20} />,
      // },
      {
        title: "Setting",
        level: "master",
        href: "/employer/setting",
        icon: <Settings size={20} />,
      },
    ],
    [],
  );
  if (!hasInitialize) return <></>;
  if (!isActive) return <></>;
  return (
    <ScrollArea className="sticky top-0 h-full w-[16rem] min-w-[16rem] border-r bg-opacity-5 p-4">
      <div className="flex flex-col">
        {menu
          .filter((i) => {
            return isMaster ? true : i.level === "all";
          })
          .map((i, index) => (
            <Link
              href={i.href}
              className={cn(
                "flex cursor-pointer items-center gap-6 border-b bg-white p-4 text-base font-medium duration-100 hover:bg-[hsl(var(--primary))]/10",
                pathname.includes(i.href) && "bg-[hsl(var(--primary))]/10",
              )}
              key={i.title}
            >
              {i.icon}
              {i.title}
            </Link>
          ))}
      </div>
    </ScrollArea>
  );
};
