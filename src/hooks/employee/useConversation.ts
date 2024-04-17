"use client";

import { Chat } from "@/types/employer/chat";
import { create } from "zustand";

type UseConversationType = {
  conversationId: string;
  messages: Chat[];
  setConversationId: (id: string) => void;
  setMessages: (messagesList: Chat[]) => void;
  addNewMessage: (newMessage: Chat) => void;
};

const useConversation = create<UseConversationType>((set) => ({
  conversationId: "",
  messages: [],
  setConversationId: (id: string) => set({ conversationId: id }),
  setMessages: (messagesList: Chat[]) => set({ messages: messagesList }),
  addNewMessage: (newMessage: Chat) => {
    return set((state) => {
      const isExist = state.messages.find((i) => i._id === newMessage._id);

      return isExist
        ? { messages: [...state.messages] }
        : { messages: [...state.messages, newMessage] };
    });
  },
}));

export default useConversation;
