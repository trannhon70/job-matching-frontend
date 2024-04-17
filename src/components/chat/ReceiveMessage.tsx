import { Chat } from "@/types/employer/chat";

interface Props {
  data: Chat;
}

export const ReceiveMessage: React.FC<Props> = ({ data }) => {
  return (
    <div className="mb-2 flex">
      <div
        className="max-w-[45%] rounded px-3 py-2"
        style={{
          backgroundColor: "#F2F2F2",
        }}
      >
        <p className="mt-1 text-sm">{data.content}</p>
      </div>
    </div>
  );
};
