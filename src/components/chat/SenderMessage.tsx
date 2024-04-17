import { Chat } from "@/types/employer/chat";
import React from "react";

interface Props {
  data: Chat;
}

const SenderMessage = React.forwardRef<HTMLDivElement, Props>(
  ({ data }, ref) => {
    return (
      <div className="mb-2 flex justify-end">
        <div
          className="max-w-[45%] rounded px-3 py-2"
          style={{
            backgroundColor: "#E2F7CB",
          }}
        >
          <p className="mt-1 text-sm">{data.content}</p>
        </div>
      </div>
    );
  },
);

SenderMessage.displayName = "SenderMessage";

export { SenderMessage };
