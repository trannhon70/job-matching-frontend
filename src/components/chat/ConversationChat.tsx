"use client";

import avatar from "@/assets/images/default-avatar-employee.png";
import useConversation from "@/hooks/employee/useConversation";
import { realtime } from "@/lib/firebase";
import { Chat, DetailConversationType } from "@/types/employer/chat";
import { onValue, ref } from "firebase/database";
import { ChevronLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";
import { ChatForm } from ".";
import { ReceiveMessage } from "./ReceiveMessage";
import { SenderMessage } from "./SenderMessage";

interface Props {
  data: DetailConversationType;
  type: "employee" | "employer";
  conversationId: string;
}

export const ConversationChat: React.FC<Props> = ({
  data,
  type,
  conversationId,
}) => {
  const { setConversationId, setMessages, messages, addNewMessage } =
    useConversation();
  const session = useSession();
  const senderId = session.data?.user.data.infoUser.company?.id
    ? `${session.data?.user.data.infoUser.company?.id}`
    : `${session.data?.user.data.infoUser.id}`;

  useEffect(() => {
    const messageRef = ref(realtime, `messages/${conversationId}`);
    onValue(messageRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      const { content } = data;
      if (senderId !== content.senderId) addNewMessage(content);
    });
  }, [conversationId, addNewMessage, senderId]);

  const updateMessagesList = (newMessage: Chat) => {
    addNewMessage(newMessage);
  };
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollToBottomConversation();
  }, [messages]);

  useEffect(() => {
    setConversationId(conversationId);
    setMessages(data?.chat ?? []);
  }, [conversationId, setConversationId, setMessages, data]);

  const scrollToBottomConversation = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "instant",
        block: "end",
      });
    }, 10);
  };
  return (
    <>
      <div className="bg-grey-lighter flex flex-row items-center justify-between px-3 py-2">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Link href={type === "employee" ? "/contact" : "/employer/chats"}>
              <ChevronLeft />
            </Link>
            <div className="relative h-12 w-12 min-w-[3rem] overflow-hidden rounded-full">
              <Image
                src={
                  (type === "employer"
                    ? data?.imageEmployee
                    : data?.fileLogo) ?? avatar
                }
                alt="avatar"
                className="object-cover"
                fill
              />
            </div>
          </div>
          <div className="ml-4">
            <p className="text-grey-darkest">
              {type === "employee" ? data.companyName : data.employeeName}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-500">
        <div className="px-3 py-2">
          {messages.map((i, index) => (
            <Fragment key={i._id}>
              {i.senderId === senderId ? (
                <SenderMessage data={i} />
              ) : (
                <ReceiveMessage data={i} />
              )}
            </Fragment>
          ))}
        </div>
        <div ref={bottomRef}></div>
      </div>
      <ChatForm
        type={type}
        conversationId={data.convesation}
        updateMessagesList={updateMessagesList}
        scrollToBottomConversation={scrollToBottomConversation}
      />
    </>
  );
};
