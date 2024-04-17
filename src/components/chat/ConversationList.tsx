"use client";

import useIsMobileConversation from "@/hooks/employee/useIsMobileConversation";
import { cn } from "@/lib/utils";
import { ConversationItemType } from "@/types/employer/chat";
import { ThreeCircles } from "react-loader-spinner";
import { ConversationItem } from ".";

interface Props {
  isLoading: boolean;
  data: ConversationItemType[];
  type: "employee" | "employer";
}

export const ConversationList: React.FC<Props> = ({
  isLoading,
  data,
  type,
}) => {
  const { isMobile } = useIsMobileConversation();
  return (
    <div
      className={cn(
        "flex h-full  flex-col  overflow-y-auto border",
        isMobile ? "w-full" : "w-[300px] min-w-[300px]",
      )}
    >
      {isLoading ? (
        <div className="flex w-full justify-center pt-6">
          <ThreeCircles
            visible={true}
            height="30"
            width="30"
            color="#4682a9"
            ariaLabel="three-circles-loading"
          />
        </div>
      ) : (
        <>
          {data.length === 0 && (
            <div className="mt-10 w-full text-center">
              Awaiting companies to contact.
            </div>
          )}
          {data.map((i) => (
            <ConversationItem type={type} key={i._id} data={i} />
          ))}
        </>
      )}
    </div>
  );
};
