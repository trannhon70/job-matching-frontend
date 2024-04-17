import { isHttpsLink } from "@/utils/zoom";
import { Fragment, SyntheticEvent, useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { messageChatType } from "./video-footer";

type GroupChatType = {
  closeChat: () => void;
  chatClient: any;
  messagesList: messageChatType[];
};

const GroupChat: React.FC<GroupChatType> = ({
  closeChat,
  chatClient,
  messagesList,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const boxChatRef = useRef<HTMLDivElement | null>(null);
  const onSendMessage = async (e: SyntheticEvent) => {
    e.preventDefault();
    const message = inputRef.current?.value;
    if (message === "") return;
    // alert(inputRef.current?.value);
    await chatClient?.sendToAll(message);
    if (inputRef.current) inputRef.current.value = "";
    inputRef.current?.focus();
    setTimeout(() => {
      if (boxChatRef.current)
        boxChatRef.current.scrollTop = boxChatRef.current.scrollHeight;
    });
  };

  return (
    <div className="fixed right-2 top-2 z-40 flex h-[calc(100vh-6rem)] w-[350px] flex-col rounded-lg bg-white p-4">
      {/* close chat */}
      <button
        className="absolute right-4 top-4 text-gray-900"
        onClick={closeChat}
      >
        <IoMdClose size={22} />
      </button>
      <p className="mb-4 mt-8 w-full rounded-lg bg-gray-100 p-3 text-center text-sm text-gray-600">
        Messages can only be seen by people in the call and are deleted when the
        call ends
      </p>
      {/* content chat */}
      <div ref={boxChatRef} className="flex-1 overflow-y-auto">
        {messagesList?.map((item, index) => (
          <Fragment key={item.id}>
            {index > 0 &&
            messagesList[index].userId === messagesList[index - 1].userId ? (
              <ExtraMessage key={item?.id} message={item.message} />
            ) : (
              <Message
                key={item?.id}
                author={item.author}
                message={item.message}
                timestamp={item.timestamp}
              />
            )}
          </Fragment>
        ))}
      </div>
      {/* chat box */}
      <form onSubmit={onSendMessage} className="relative mt-4 w-full">
        <input
          ref={inputRef}
          type="text"
          className="w-full rounded-full bg-gray-200 px-5 py-3 pr-12 text-sm text-gray-700 focus:border-none focus:outline-none"
          placeholder="Send a message"
        />

        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500"
        >
          <AiOutlineSend size={22} />
        </button>
      </form>
    </div>
  );
};

type MessageType = {
  author: string;
  timestamp: string;
  message: string;
};
const Message: React.FC<MessageType> = ({ author, timestamp, message }) => {
  const isValidLink = isHttpsLink(message);
  return (
    <div className="mt-6 flex flex-col first:mt-0">
      <div className="">
        <span className="mr-3 font-medium">{author}</span>
        <span className="text-sm text-gray-400">{timestamp}</span>
      </div>
      {isValidLink ? (
        <a href={message} target="_blank" className="text-blue-600 underline">
          {message}
        </a>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

type ExtraMessage = Pick<MessageType, "message">;

const ExtraMessage: React.FC<ExtraMessage> = ({ message }) => {
  const isValidLink = isHttpsLink(message);
  return (
    <div className="mt-3">
      {isValidLink ? (
        <a href={message} target="_blank" className="text-blue-600 underline">
          {message}
        </a>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default GroupChat;
