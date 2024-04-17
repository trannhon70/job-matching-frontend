"use client";

import avatar from "@/assets/images/default-avatar-employee.png";
import useConversation from "@/hooks/employee/useConversation";
import { cn } from "@/lib/utils";
import { ConversationItemType } from "@/types/employer/chat";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  data: ConversationItemType;
  type: "employee" | "employer";
}

export const ConversationItem: React.FC<Props> = ({ data, type }) => {
  const pathname = usePathname();
  const { messages, conversationId } = useConversation();
  const currentConversationId = pathname.split("/").pop();
  return (
    <Link
      href={
        type === "employee"
          ? `/contact/${data._id}`
          : `/employer/chats/${data._id}`
      }
      className={cn(
        " flex w-full cursor-pointer items-center gap-4 px-3",
        currentConversationId === data._id && "bg-gray-200",
      )}
    >
      <div className="relative h-12 w-12 min-w-[3rem] overflow-hidden rounded-full">
        <Image
          src={
            (type === "employee" ? data?.fileLogo : data?.avatarUrl) ?? avatar
          }
          alt="avatar"
          fill
          className="object-cover"
        />
      </div>

      <div className="w-2/3 flex-1 border-b py-4">
        <div className="items-bottom flex w-full justify-between">
          <p className="text-grey-darkest truncate">
            {type === "employee" ? data.companyName : data.employeeName}
          </p>
        </div>
        <p className="text-grey-dark mt-1 w-full truncate text-sm">
          {conversationId === data._id && messages.length
            ? messages[messages.length - 1].content
            : data?.lastMessage}
        </p>
      </div>
    </Link>
  );
};
